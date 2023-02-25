import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import ImageInput from "@/components/common/ImageInput";
import Spinner from "@/components/common/Spinner/Spinner";

import { usePosts } from "@/hooks/usePosts";
import { uploadImage } from "@/utils/image";
import { validationPost } from "./schema";

import style from "./PostForm.module.scss";
import { useAppSelector } from "@/store/store";
import { main } from "@/store/selectors";
import { updateCommunity } from "@/api/communities";
import { ICommunity } from "@/types/common";

interface IPostForm {
  field?: [];
  isCommunityPost?: boolean;
  community?: ICommunity;
}

const PostForm = (props: IPostForm) => {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState<null | FileList>(null);
  const { userDisplayName, userEmail } = useAppSelector(main);

  const { handleCreatePost, isLoadingCreatePost } = usePosts();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setImage(event.target.files);
  const handleCreatePostClick = () => {
    if (props.isCommunityPost) {
      image
        ? uploadImage(image, handleSendCommunityPost)
        : handleSendCommunityPost(null);
      reset();

      setTimeout(() => window.location.reload(), 1000);
    } else {
      image ? uploadImage(image, handleSendPost) : handleSendPost(null);
      reset();
    }
  };

  const handleSendCommunityPost = (url: string | null) => {
    const cred =
      userDisplayName && userEmail
        ? {
            displayName: userDisplayName,
            email: userEmail,
          }
        : {};

    updateCommunity(id, {
      displayName: props?.community?.displayName,
      description: props?.community?.description,
      users: props?.community?.users,
      posts: [
        ...props?.community?.posts,
        {
          userId: "7ty4kpyNv35QonTVsZMA",
          title,
          text,
          votesUp: 0,
          votesDown: 0,
          timestamp: Date.now(),
          images: url ? [url] : [],
          ...cred,
        },
      ],
    });
  };

  const handleSendPost = (url: string | null) => {
    const cred =
      userDisplayName && userEmail
        ? {
            displayName: userDisplayName,
            email: userEmail,
          }
        : {};
    handleCreatePost({
      userId: "7ty4kpyNv35QonTVsZMA",
      title,
      text,
      voters:{},
      votesUp: 0,
      votesDown: 0,
      timestamp: Date.now(),
      images: url ? [url] : [],
      ...cred,
    });
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<any>({
    mode: "all",
    resolver: yupResolver(validationPost),
    defaultValues: {
      yupResolver: yupResolver(validationPost),
      text: "",
      title: "",
    },
  });

  return (
    <div className={style.postFormContainer}>
      {isLoadingCreatePost && <Spinner />}
      <Input
        name="title"
        placeholder="Title"
        onInput={handleTitleChange}
        register={register}
        errorText={errors.title?.message as string}
      />
      <TextArea
        name="text"
        placeholder="Content"
        onInput={handleTextChange}
        register={register}
        errorText={errors.text?.message as string}
      />
      <ImageInput onChange={handleImageChange} />
      <Button
        clickHandler={handleSubmit(handleCreatePostClick)}
        text="Create post"
      />
    </div>
  );
};

export default PostForm;
