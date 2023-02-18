import { 
	query,
	getDocs,
	orderBy,
	addDoc,
	limit,
	updateDoc,
	where,
	doc,
	setDoc,
	deleteDoc,
	getDoc,
} from 'firebase/firestore';

import { postsCollection } from '@/firebaseClient/collections';
import { postDocument } from '@/firebaseClient/docs';
import { OrderOptions } from '@/constants/enums';

import { IPost } from '@/types/common';
import { GetPostApi } from '@/types/api';

export const getAllPosts = ({
	sortFieldName: order=OrderOptions.votesUp,
	sortDirection: direction = 'desc',
	searchValue,
	limitSize
} : GetPostApi) => {
	console.log( order, direction, limitSize)
	const allPosts = searchValue && searchValue!=='' ? 
	 query(
			postsCollection,
			orderBy(order, direction),
			where('title', '==', searchValue),
			limit(limitSize),
		) 
	: query(
			postsCollection,
			orderBy(order, direction),
			limit(limitSize),
		) 

	return getDocs(allPosts);
}

export const getPost = (id: string) => {
	if(!id) return null;
	const docRef = doc(postsCollection, id);
	getDoc(docRef)
	return getDoc(docRef);
}

export const createPost = (props: IPost) => {
	const userRef = doc(postsCollection)
	return setDoc(userRef, {...props, postId: userRef.id})
}

export const deletePost = (id: string) => {
	const docRef = doc(postsCollection, id);
	return deleteDoc(docRef)
}

export const updatePost = (props: Partial<IPost>) => {
	if(!props?.postId) return
	
	const docRef = postDocument(props?.postId);

	return updateDoc(
		docRef,
		{...props}
	)
}

