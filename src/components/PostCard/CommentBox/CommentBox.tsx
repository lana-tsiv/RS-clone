import React from 'react';
import styles from './CommentBox.module.scss'
import CommentForm from "@/components/PostCard/CommentBox/CommentForm";
import {useIntl} from "react-intl";

const CommentBox = ({postId}: { postId: string }) => {
    const addComment = (commentText: string) => {
        console.log(commentText, postId)
    }
    const intl = useIntl();
    const submitLabel = intl.formatMessage({id: 'commentBox.button', defaultMessage: 'Post'});

    return (
        <CommentForm
            submitLabel={submitLabel}
            handleSubmit={addComment}
        />
    );
};

export default CommentBox;