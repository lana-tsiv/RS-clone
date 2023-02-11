import React from 'react';

import style from './TextArea.module.scss'

interface ITextArea {
  name?: string;
  placeholder?: string;
  onInput?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({ name, onInput, placeholder }: ITextArea) => {
  return (
    <div className={style.textAreaContainer}>
      <textarea
        name={name}
        placeholder={placeholder}
        onInput={onInput}
      />
    </div>
  );
};

export default TextArea
