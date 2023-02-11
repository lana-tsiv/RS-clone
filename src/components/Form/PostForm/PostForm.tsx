import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import ImageInput from '@/components/common/ImageInput';

import { usePosts } from "@/hooks/usePosts";
import { uploadImage } from '@/utils/image';

import style from "./PostForm.module.scss";
import { validationPost } from './schema';
import Spinner from '../../common/Spinner/Spinner';

interface IPostForm {
  field?: [];
}

const PostForm = (props: IPostForm) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState<null | FileList >(null)

  const { handleCreatePost, isLoadingCreatePost } = usePosts();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value);
  const handleCreatePostClick = (data: any) => {
    console.log(data)
    image? uploadImage(image, handleSendPost): handleSendPost(null);
  }
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => setImage(event.target.files);

  const handleSendPost = (url: string | null) => {
    handleCreatePost({
      userId: "7ty4kpyNv35QonTVsZMA",
      title,
      text,
      votesUp: 0,
      votesDown: 0,
      timestamp: Date.now(),
      images: url ? [url] : [],
    });
  }

  const onSubmitHandler = (data: any) => {
    console.log({ data,errors });
  };

  const {
		formState: { errors },
		handleSubmit,
    register,
	} = useForm<any>({
		mode: 'all',
    resolver: yupResolver( validationPost),
		defaultValues: {
      yupResolver: yupResolver( validationPost),
			text: '',
      title: '',
		},
	});

  useEffect(() => {
    console.log("🚀 ~ file: PostForm.tsx:47 ~ handleCheck ~ a", errors)
  }, [errors])

  return (
    <div className={style.postFormContainer}>
      {isLoadingCreatePost && <Spinner/>}
      <Input
        name='title'
        placeholder='Title'
        onInput={handleTitleChange}
        register={register}
        errorText={errors.title?.message as string}
      />
      <TextArea
        name='text'
        placeholder='Content'
        onInput={handleTextChange}
        register={register}
        errorText={errors.text?.message as string}
      />
      <ImageInput
        onChange={handleImageChange}
      />
      <Button
        clickHandler={handleSubmit(handleCreatePostClick)}
        text='Create post'
      />
    </div>
  );
};

export default PostForm;
