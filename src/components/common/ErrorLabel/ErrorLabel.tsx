import React from 'react';

import style from './ErrorLabel.module.scss'
import cn from 'classnames';

interface IErrorLabel {
  errorText?: string;
  isFormLabel?: boolean;
}

const ErrorLabel = ({ isFormLabel, errorText }: IErrorLabel) =>{
	const className= cn(style.errorText, {
		[style.formLabel]: isFormLabel,
		[style.inputLabel]: !isFormLabel,
	})
	
	return errorText ? 
		<span className={className}>{errorText}</span>
		: null
}

export default ErrorLabel
