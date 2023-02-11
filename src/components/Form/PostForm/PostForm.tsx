import React, { useState } from "react";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";

import style from "./PostForm.module.scss";
import { usePosts } from "../../../hooks/usePosts";
import { storage } from "@/firebaseClient/clientApp";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import ImageInput from '@/components/common/ImageInput';
import { uploadImage } from '@/utils/image';

interface IPostForm {
  field?: [];
}

const PostForm = (props: IPostForm) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState<null | FileList >(null)

  const { handleCreatePost } = usePosts();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleCreatePostClick = () => {
    image? uploadImage(image, handleSendPost): null;
  };

  const handleSendPost = (url: string) => {
    handleCreatePost({
      userId: "7ty4kpyNv35QonTVsZMA",
      title,
      text,
      votesUp: 0,
      votesDown: 0,
      timestamp: Date.now(),
      images: [url],
    });
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    setImage(event.target.files);
  }

  return (
    <div className={style.postFormContainer}>
      <Input
        name='title'
        placeholder='Title'
        onInput={handleTitleChange}
      />
      <TextArea
        name='content'
        placeholder='Content'
        onInput={handleTextChange}
      />
      <ImageInput
        onChange={handleImageChange}
      />
      <Button
        clickHandler={handleCreatePostClick}
        text='Create post'
      />
    </div>
  );
};

export default PostForm;
