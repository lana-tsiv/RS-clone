import React from 'react';
import styles from './CommentItem.module.scss'

interface commentProps {
    author: string,
    time: string,
    comment: string,
    postId: string,
}

const CommentItem = ({ comment, author, time}: commentProps) => {
    return (
        <div className={styles.commentWrap}>
            <div className={styles.image}></div>
            <div className={styles.infoContainer}>
                <div className={styles.infoWrap}>
                    <p className={styles.author}>{author}</p>
                    <p className={styles.time}>{time}</p>
                </div>
                <p className={styles.commentText}>{comment}</p>
            </div>
        </div>
    );
};

export default CommentItem;