import React, { useState } from "react";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";

import style from "./PostForm.module.scss";
import { usePosts } from "../../../hooks/usePosts";

interface IPostForm {
  field?: [];
}

const PostForm = (props: IPostForm) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const { handleCreatePost } = usePosts();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleCreatePostClick = () => {
    handleCreatePost({
      userId: "7ty4kpyNv35QonTVsZMA",
      title,
      text,
      votesUp: 0,
      votesDown: 0,
      timestamp: Date.now(),
    });
  };

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
      <Button
        clickHandler={handleCreatePostClick}
        text='Create post'
      />
    </div>
  );
};

export default PostForm;
