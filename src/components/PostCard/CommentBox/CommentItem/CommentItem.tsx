import React from 'react';
import styles from './CommentItem.module.scss'
import CommentForm from "@/components/PostCard/CommentBox/CommentForm";

interface commentProps {
    author: string,
    time: string,
    comment: string,
    postId: string,
    replies: string[],
    id: string,
    deleteComment: (id: string) => void,
    activeComment: any,
    setActiveComment: any,
    updateComment: any,
    isEditable?: boolean,
    isDeletable?: boolean,
}

const CommentItem = ({
                         comment,
                         author,
                         time,
                         replies,
                         id,
                         postId,
                         deleteComment,
                         activeComment,
                         setActiveComment,
                         updateComment,
                         isEditable,
                         isDeletable,
                     }: commentProps) => {

    const isEditing = activeComment && activeComment.id === id && activeComment.type === "editing";

    return (
        <div className={styles.commentWrap}>
            <div className={styles.image}></div>
            <div className={styles.infoContainer}>
                <div className={styles.infoWrap}>
                    <p className={styles.author}>{author}</p>
                    <p className={styles.time}>{time}</p>
                </div>
                {!isEditing && <p className={styles.commentText}>{comment}</p>}
                {isEditing && (
                    <CommentForm
                        submitLabel={'Edit'}
                        postId={postId}
                        handleSubmit={(comment: string) => updateComment(comment, postId)}
                        initialText={comment}
                        hasCancelButton={true}
                        handleCancel={() => setActiveComment(null)}
                    />
                )}
                <div className={styles.actionsWrap}>
                    <div className={styles.commentActions}>Reply</div>
                    {isEditable && (
                        <div
                            className={styles.commentActions}
                            onClick={() =>
                                setActiveComment({id: id, type: "editing"})}
                        >
                            Edit
                        </div>
                    )}
                    {isDeletable && (
                        <div
                            className={styles.commentActions}
                            onClick={() => deleteComment(id)}
                        >
                            Delete
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentItem;