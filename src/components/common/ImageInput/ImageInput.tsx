import React, { useState, useRef } from "react";

import style from "./ImageInput.module.scss";
import Button from "@/components/common/Button";

interface IImageInput {
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageInput = ({ name, onChange }: IImageInput) => {
  const elementRef = useRef<HTMLInputElement>(null);
  const handleClear = () => {
    elementRef?.current ? (elementRef.current.value = "") : null;
  };

  return (
    <div className={style.inputContainer}>
      <input
        type='file'
        onChange={onChange}
        ref={elementRef}
        accept='image/png, image/gif, image/jpeg'
      />
      <Button
        text='Clear image input'
        clickHandler={handleClear}
        isSecondary
      />
    </div>
  );
};

export default ImageInput;
