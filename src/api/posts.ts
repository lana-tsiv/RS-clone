import { 
	query,
	getDoc,
	getDocs,
	where,
	endAt,
	startAt,
	orderBy,
	addDoc,
	limit,
	updateDoc,
	doc
} from 'firebase/firestore';

import { postsCollection } from '@/firebaseClient/collections';
import { postDocument } from '@/firebaseClient/docs';

import { IPost } from '@/types/common';
import { GetPostApi } from '@/types/api';
import { OrderOptions } from '@/constants/enums';

export const getAllPosts = ({
	end=10,
	start=0,
	sortFieldName: order=OrderOptions.votesUp,
	sortDirection: direction = 'desc',
	limitSize
} : GetPostApi) => {
	console.log( order, direction, limitSize)
	const allPosts = query(
			postsCollection,
			orderBy(order, direction),
			limit(limitSize),
		);

	return getDocs(allPosts);
}

export const createPost = (props: IPost) => {
	return addDoc(
		postsCollection,
		{...props}
	)
}

export const deletePost = (props: IPost) => {
	return addDoc(
		postsCollection,
		{...props}
	)
}

export const updatePost = (props: Partial<IPost>) => {
	if(!props?.postId) return
	
	const docRef = postDocument(props?.postId);

	return updateDoc(
		docRef,
		{...props}
	)
}

