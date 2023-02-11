import React from 'react';
import ErrorLabel from '../ErrorLabel';

import style from './Input.module.scss'

interface IInput {
  type?: string;
  name?: string;
  placeholder?: string;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
  errorText?: string;
}

const Input = ({
  name,
  onInput,
  placeholder,
  type = "text",
  register,
  errorText
}: IInput) => {
  return (
    <div className={style.inputContainer}>
      <label htmlFor={name}>{name}</label>
      <input
        {...register ? register(name) : {}}
        type={type}
        name={name}
        placeholder={placeholder}
        onInput={onInput}
      />
      <ErrorLabel errorText={errorText}/>
    </div>
  );
};

export default Input