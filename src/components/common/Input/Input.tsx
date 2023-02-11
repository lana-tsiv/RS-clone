import React from 'react';

import style from './Input.module.scss'

interface IInput {
  type?: string;
  name?: string;
  placeholder?: string;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ name, onInput, placeholder, type = "text" }: IInput) => {
  return (
    <div className={style.inputContainer}>
      <label htmlFor={name}>{name}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onInput={onInput}
      />
    </div>
  );
};

export default Input