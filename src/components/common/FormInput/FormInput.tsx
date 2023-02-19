import React from 'react';
import styles from "./FormInput.module.scss";

interface FormInputProps {
    type: string,
    value: string,
    placeholder: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({type, value, onChange, placeholder}: FormInputProps) => {
    return (
        <input
            className={styles.input}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};

export default FormInput;