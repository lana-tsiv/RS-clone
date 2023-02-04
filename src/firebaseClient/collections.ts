import { collection } from 'firebase/firestore';

import { db } from './clientApp';

export const postsCollection = collection(db, 'posts');