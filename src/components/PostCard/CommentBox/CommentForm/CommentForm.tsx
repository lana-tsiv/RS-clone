import React, {FormEvent, useState, useEffect} from 'react';
import styles from './CommentForm.module.scss'
import {useIntl} from "react-intl";
import {collection, addDoc} from "firebase/firestore";
import {db} from "@/firebaseClient/clientApp";

const handleSubmit = (comment: string, postId: string) => {
    const timePosted = new Date().toLocaleString();
    const docRef = addDoc(collection(db, "comments"), {
        author: 'Anonymous',
        message: comment,
        time: timePosted,
        postId: postId
    });
}

const CommentForm = ({submitLabel, postId}: { submitLabel: string, postId: string}) => {

    const [commentText, setCommentText] = useState('');

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit(commentText, postId);
        setCommentText('');
    }

    const isDisabled = commentText.length < 1;
    const intl = useIntl();
    const placeholder = intl.formatMessage({id: 'CommentForm.comment.placeholder', defaultMessage: 'Add your comment here'})

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <textarea
                className={styles.textarea}
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                placeholder={placeholder}
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