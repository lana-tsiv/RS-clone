import { usePosts } from '@/hooks/usePosts';
import React from "react";
import { useState, useEffect } from "react";

import style from "./Button.module.scss";

interface IButton {
  text: string;
  clickHandler: () => void;
}

const mockPost = {
  images: [0],
  tags: ["tag1", "tag2", "tag3"],
  text: "some text",
  timestamp: 1639251200000,
  userId: "7ty4kpyNv35QonTVsZMA",
  votesDown: 1,
  votesUp: 1,
};

const Button = ({text, clickHandler}: IButton) => {
  return (
    <div className={style.buttonContainer}>
      <button onClick={clickHandler}>{text}</button>
    </div>
  );
};

export default Button;
