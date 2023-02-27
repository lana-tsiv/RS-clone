import { 
	query,
	getDocs,
	where,
	addDoc,
} from 'firebase/firestore';

import { usersCollection } from '@/firebaseClient/collections';

export const getUserByEmail = ({ email } : any) => {
	const allPosts = query(
			usersCollection,
			where('email', '==', email)
		);

	return getDocs(allPosts);
}

export const createUser = (props: any) => {
	return addDoc(
		usersCollection,
		{...props}
	)
}

