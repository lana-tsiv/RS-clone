import React from 'react';
import styles from './FormButton.module.scss';

interface FormButtonProps {
    text: string,
    disabled: boolean
}

const FormButton = ({text, disabled}: FormButtonProps) => {
    return (
        <div className={styles.btnWrapper}>
            <button className={styles.button} disabled={disabled}>{text}</button>
        </div>
    );
};

export default FormButton;