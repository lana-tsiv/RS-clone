import React, {Fragment, useEffect, useState} from 'react';
import styles from './CommentBox.module.scss'
import CommentForm from "@/components/PostCard/CommentBox/CommentForm";
import {useIntl} from "react-intl";
import {collection, getDocs, doc, deleteDoc, addDoc, updateDoc} from "firebase/firestore";
import {db} from "@/firebaseClient/clientApp";
import CommentItem from "@/components/PostCard/CommentBox/CommentItem";
import {getAuth} from "firebase/auth";


const CommentBox = ({postId}: { postId: string }) => {
    const auth = getAuth();
    const currentUserId = auth.currentUser?.uid ?? "Anonymous";
    const user = currentUserId === 'Anonymous' ? 'Anonymous' : auth.currentUser?.displayName;

    const [array, setArray] = useState<any[]>([]);
    const [activeComment, setActiveComment] = useState({id: ''});

    const getData = async () => {
        const data = await getDocs(collection(db, 'comments'));
        return data.docs.map((item) => {
            return {...item.data(), id: item.id}
        });
    };

    const handleSubmit = (comment: string, postId: string, parentId: string | null = null) => {
        const now = new Date();
        const timePosted = now.getTime();
        const docRef = addDoc(collection(db, "comments"), {
            author: user,
            message: comment,
            time: timePosted,
            postId: postId,
            userId: currentUserId,
            parentId: parentId
        });
        docRef.then(() => {
            getData().then((data) => {
                setArray(data);
            });
        });
        setActiveComment({id: ''});
    }

    const filteredComments = array.filter((item) => item.postId === postId)
        .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

    const getReplies = (id: string) => {
        return array.filter((item) => item.parentId !== null && item.parentId === id)
            .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
    }

    useEffect(() => {
        getData().then((data) => {
            setArray(data)
        });
    }, [])

    const deleteComment = (id: string) => {
        let dataToDelete = doc(db, 'comments', id);
        deleteDoc(dataToDelete)
            .then(() => {
                const updatedArray = array.filter((item) => item.id !== id);
                setArray(updatedArray);
            })
            .catch((err) => console.log(err.message))
        setActiveComment({id: ''});
    }

    const updateComment = (text: string) => {
        const commentId = activeComment?.id;
        let dataToUpdate = doc(db, 'comments', commentId);
        updateDoc(dataToUpdate, {
            message: text
        })
            .then(() => {
                const updatedArray = array.map((item) => {
                    if (item.id === commentId) {
                        return {
                            ...item,
                            message: text
                        }
                    }
                    return item;
                });
                setArray(updatedArray);
                setActiveComment({id: ''});
            })
            .catch((err) => console.log(err.message))
    }

    const intl = useIntl();
    const submitLabel = intl.formatMessage({id: 'commentBox.button', defaultMessage: 'Post'});

    return (
        <Fragment key={postId}>
            <CommentForm
                submitLabel={submitLabel}
                postId={postId}
                handleSubmit={(comment: string) => handleSubmit(comment, postId)}
                hasCancelButton={false}
                handleCancel={''}
                initialText={''}
            />
            <h2 className={styles.title}>Comments</h2>
            <div className={styles.commentsContainer}>
                {filteredComments.filter(item => item.parentId === null).map((i) => {
                    return (
                        <CommentItem
                            comment={i.message}
                            author={i.author}
                            time={new Date(i.time).toLocaleString()}
                            postId={i.postId}
                            key={i.id}
                            replies={getReplies(i.id)}
                            id={i.id}
                            deleteComment={deleteComment}
                            activeComment={activeComment}
                            setActiveComment={setActiveComment}
                            updateComment={updateComment}
                            isEditable={i.userId === currentUserId && currentUserId !== 'Anonymous'}
                            isDeletable={i.userId === currentUserId && currentUserId !== 'Anonymous'}
                            currentUserId={currentUserId}
                            handleSubmit={handleSubmit}
                            parentId={i.parentId}
                        />
                    )
                })}
            </div>
        </Fragment>
    );
};

export default CommentBox;