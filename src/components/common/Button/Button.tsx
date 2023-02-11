import { usePosts } from '@/hooks/usePosts';
import React from "react";
import { useState, useEffect } from "react";
import cn from "classnames";
import style from "./Button.module.scss";

interface IButton {
  text: string;
  clickHandler: () => void;
  isSecondary?: boolean;
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

const Button = ({text, clickHandler, isSecondary}: IButton) => {
  const btnClass = cn(style.button, {
    [style.secondary]: isSecondary,
    [style.primary]: !isSecondary,
  })

  return (
    <div className={style.buttonContainer}>
      <button className={btnClass} onClick={clickHandler}>{text}</button>
    </div>
  );
};

export default Button;
