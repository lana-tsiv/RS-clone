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
    currentUserId: string,
    handleSubmit: (text: string, postId: string, replyId: string) => void,
    parentId: string | null,
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
                         currentUserId,
                         handleSubmit,
                         parentId = null,
                     }: commentProps) => {

    const isEditing = activeComment && activeComment.id === id && activeComment.type === "editing";
    const isReplying = activeComment
        && activeComment.currentUserId === currentUserId
        && activeComment.id === id && activeComment.type === "replying";

    const replyId = parentId ? parentId : id;
    const canReply = parentId === null;

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
                        handleCancel={() => setActiveComment({id: ''})}
                    />
                )}
                <div className={styles.actionsWrap}>
                    {canReply && (<div
                        className={styles.commentActions}
                        onClick={() => setActiveComment({id: id, type: 'replying', currentUserId: currentUserId})}
                    >
                        Reply
                    </div>)}
                    {isEditable && (
                        <div
                            className={styles.commentActions}
                            onClick={() => setActiveComment({id: id, type: "editing"})}
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
                {isReplying && <CommentForm submitLabel={'Reply'}
                                            postId={postId}
                                            handleSubmit={(text) => handleSubmit(text, postId, replyId)}
                                            hasCancelButton={true}
                                            handleCancel={() => setActiveComment({id: ''})}
                                            initialText={''}
                />}
                {replies.length > 0 && (
                    <div className={styles.replies}>
                        {replies.map((item: any) => {
                            return (
                                <CommentItem
                                    key={item.id}
                                    author={item.author}
                                    time={new Date(item.time).toLocaleString()}
                                    comment={item.message}
                                    postId={item.postId}
                                    replies={[]}
                                    id={item.id}
                                    currentUserId={id}
                                    deleteComment={deleteComment}
                                    activeComment={activeComment}
                                    setActiveComment={setActiveComment}
                                    handleSubmit={handleSubmit}
                                    updateComment={updateComment}
                                    parentId={item.id}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentItem;