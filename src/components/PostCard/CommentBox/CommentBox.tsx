import React from 'react';
import styles from './CommentBox.module.scss'
import CommentForm from "@/components/PostCard/CommentBox/CommentForm";

const CommentBox = ({postId}: {postId: string}) => {
    const addComment = (commentText: string) => {
        console.log(commentText, postId)
    }

    return (
        <CommentForm
            submitLabel='Post'
            handleSubmit={addComment}
        />
    );
};

export default CommentBox;