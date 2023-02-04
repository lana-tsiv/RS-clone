import { collection, doc } from 'firebase/firestore';

import { db } from './clientApp';

export const postDocument = (id: string) => doc(db, 'posts', id);
