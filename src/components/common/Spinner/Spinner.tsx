import React from 'react';

import style from './Spinner.module.scss'

const Spinner = () =>{
	return <div className={style.spinnerWrapper}>
		<div className={style.spinner}></div>
	</div>
}

export default Spinner