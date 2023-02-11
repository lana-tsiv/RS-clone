import React from 'react';

import style from './ErrorLabel.module.scss'

interface IErrorLabel {
  errorText?: string;
}

const ErrorLabel = ({ errorText }: IErrorLabel) =>{
	return errorText ? 
		<span className={style.errorText}>{errorText}</span>
		: null
}

export default ErrorLabel
