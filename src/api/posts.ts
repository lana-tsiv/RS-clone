import { 
	query,
	getDoc,
	getDocs,
	where,
	endAt,
	startAt,
	orderBy,
	addDoc,
	limit
} from 'firebase/firestore';

import { postsCollection } from '@/firebaseClient/collections';

import { IPost } from '@/types/common';
import { GetPostApi } from '@/types/api';
import { OrderOptions } from '@/constants/enums';

export const getAllPosts = ({
	end=10,
	start=0,
	order=OrderOptions.votesUp,
	limitSize=10
} : GetPostApi) => {
	console.log(end, start, order)
	const allPosts = query(
			postsCollection,
			orderBy(order),
			startAt(start),
			endAt(end),
			limit(limitSize)
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

export const updatePost = (props: IPost) => {
	return addDoc(
		postsCollection,
		{...props}
	)
}

