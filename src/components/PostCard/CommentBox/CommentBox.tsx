import React, {useEffect, useState} from 'react';
import styles from './CommentBox.module.scss'
import CommentForm from "@/components/PostCard/CommentBox/CommentForm";
import {useIntl} from "react-intl";
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebaseClient/clientApp";
import CommentItem from "@/components/PostCard/CommentBox/CommentItem";


const CommentBox = ({postId}: { postId: string }) => {
    const addComment = (commentText: string) => {
        console.log(commentText, postId)
    }

    const [array, setArray] = useState<any[]>([]);
    const getData = async () => {
        const data = await getDocs(collection(db, 'comments'));
        setArray(data.docs.map((item) => {
            return {...item.data(), id: item.id}
        }));
    }

    useEffect(() => {
        getData()
    }, [])

    const intl = useIntl();
    const submitLabel = intl.formatMessage({id: 'commentBox.button', defaultMessage: 'Post'});

    return (
        <>
            <CommentForm
                submitLabel={submitLabel}
                postId={postId}
            />
            <h2 className={styles.title}>Comments</h2>
            <div className={styles.commentsContainer}>
                {array.filter((item) => item.postId === postId).map((i, index) => {
                    return (
                        <>
                            <CommentItem
                                comment={i.message}
                                author={i.author}
                                time={i.time}
                                postId={i.postId}
                                key={i.postId}
                            />
                        </>
                    )
                })}
            </div>
        </>
    );
};

export default CommentBox;