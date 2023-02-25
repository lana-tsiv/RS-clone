import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { postsCollection } from '../firebaseClient/collections';

const toggleVote = async ({ 
  postId,
  email,
  vote,
  count 
}: any) => {
  const postRef = doc(postsCollection, postId);
  try {
    const docSnap = await getDoc(postRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const voters = data.voters || {};

      if (voters[email]) {
        if (vote===null) {
          delete voters[email];
        } else {
          voters[email] = vote;
        }
      } else {
        voters[email] = vote;
      }
      await updateDoc(postRef, {
        votesUp: count,
        voters,
      });
    } else {
      console.log(`Post with ID ${postId} does not exist`);
    }
  } catch (error) {
    console.log('Error getting post document:', error);
  }
};

export default toggleVote;
