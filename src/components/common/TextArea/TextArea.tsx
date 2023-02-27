import React from 'react';

import ErrorLabel from '@/components/common/ErrorLabel';

import style from './TextArea.module.scss'

interface ITextArea {
  name?: string;
  placeholder?: string;
  onInput?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  register?: any;
  errorText?: string;
}

const TextArea = ({ 
  name,
  onInput,
  placeholder,
  register,
  errorText
}: ITextArea) => {
  return (
    <div className={style.textAreaContainer}>
      <textarea
        name={name}
        {...register ? register(name) : {}}
        placeholder={placeholder}
        onInput={onInput}
      />
      <ErrorLabel errorText={errorText}/>
    </div>
  );
};

export default TextArea
