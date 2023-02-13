import React from 'react';
import styles from './CommentItem.module.scss'

interface commentProps {
    author: string,
    time: string,
    comment: string,
    postId: string,
    replies: string[],
    id: string,
    deleteComment: (id: string) => void
}

const CommentItem = ({comment, author, time, replies, id, postId, deleteComment}: commentProps) => {
    return (
        <div className={styles.commentWrap}>
            <div className={styles.image}></div>
            <div className={styles.infoContainer}>
                <div className={styles.infoWrap}>
                    <p className={styles.author}>{author}</p>
                    <p className={styles.time}>{time}</p>
                </div>
                <p className={styles.commentText}>{comment}</p>
                <div className={styles.actionsWrap}>
                    <div className={styles.commentActions}>Reply</div>
                    <div className={styles.commentActions}>Edit</div>
                    <div
                        className={styles.commentActions}
                        onClick={() => deleteComment(id)}
                    >
                        Delete
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentItem;