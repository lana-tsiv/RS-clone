import React, {Fragment, useEffect, useState} from 'react';
import styles from './CommentBox.module.scss'
import CommentForm from "@/components/PostCard/CommentBox/CommentForm";
import {useIntl} from "react-intl";
import {collection, getDocs, doc, deleteDoc, addDoc} from "firebase/firestore";
import {db} from "@/firebaseClient/clientApp";
import CommentItem from "@/components/PostCard/CommentBox/CommentItem";


const CommentBox = ({postId}: { postId: string }) => {
    const [array, setArray] = useState<any[]>([]);

    const getData = async () => {
        const data = await getDocs(collection(db, 'comments'));
        return data.docs.map((item) => {
            return {...item.data(), id: item.id}
        });
    };

    const handleSubmit = (comment: string, postId: string) => {
        const timePosted = new Date().toLocaleString();
        const docRef = addDoc(collection(db, "comments"), {
            author: 'Anonymous',
            message: comment,
            time: timePosted,
            postId: postId
        });
        docRef.then(() => {
            getData().then((data) => {
                setArray(data);
            });
        });
    }

    const getReplies = (id: string) => array.filter((item) => item.id === id)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

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
    }

    const intl = useIntl();
    const submitLabel = intl.formatMessage({id: 'commentBox.button', defaultMessage: 'Post'});

    return (
        <Fragment key={postId}>
            <CommentForm
                submitLabel={submitLabel}
                postId={postId}
                handleSubmit={(comment: string, postId: string) => handleSubmit(comment, postId)}
            />
            <h2 className={styles.title}>Comments</h2>
            <div className={styles.commentsContainer}>
                {array.filter((item) => item.postId === postId).map((i, index) => {
                    return (
                        <CommentItem
                            comment={i.message}
                            author={i.author}
                            time={i.time}
                            postId={i.postId}
                            key={i.postId}
                            replies={getReplies(i.id)}
                            id={i.id}
                            deleteComment={deleteComment}
                        />
                    )
                })}
            </div>
        </Fragment>
    );
};

export default CommentBox;