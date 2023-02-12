import React from 'react';

import style from './Select.module.scss'

interface ISelect {
  field?: [];
  options: { value: string, label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  title: string;
}

const Select = ({
  onChange,
  options,
  name,
  title
}:ISelect) => {
  return <div className={ style.selectWrapper }>
    <label>{title}</label>
    <select name={name} onChange={onChange} className={style.select}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
}

export default Select