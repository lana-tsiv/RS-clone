import React, {FormEvent, useState} from 'react';
import styles from './CommentForm.module.scss'

const CommentForm = ({submitLabel, handleSubmit}: { submitLabel: string, handleSubmit: (arg: string) => void}) => {

    const [commentText, setCommentText] = useState('');

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit(commentText);
        setCommentText('');
    }

    const isDisabled = commentText.length < 1;

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <textarea
                className={styles.textarea}
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                placeholder='Add your comment here'
            />
            <button
                className={styles.button}
                disabled={isDisabled}
            >
                {submitLabel}
            </button>
        </form>
    );
};

export default CommentForm;