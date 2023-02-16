import React, {FormEvent, useState} from 'react';
import styles from './CommentForm.module.scss'
import {useIntl} from "react-intl";

interface CommentFormProps {
    submitLabel: string,
    postId: string,
    handleSubmit: (text: string, postId: string) => void,
    hasCancelButton: boolean,
    handleCancel: any,
    initialText: string,
}

const CommentForm = ({
                         submitLabel,
                         postId,
                         handleSubmit,
                         hasCancelButton = false,
                         handleCancel,
                         initialText = ''
                     }: CommentFormProps) => {

    const [text, setText] = useState(initialText);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit(text, postId);
        setText('');
    }

    const isDisabled = text.length < 1;

    const intl = useIntl();
    const placeholder = intl.formatMessage({
        id: 'CommentForm.comment.placeholder',
        defaultMessage: 'Add your comment here'
    })

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <textarea
                className={styles.textarea}
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder={placeholder}
            />
            <button
                className={styles.button}
                disabled={isDisabled}
            >
                {submitLabel}
            </button>
            {hasCancelButton && (
                <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            )}
        </form>
    );
};

export default CommentForm;