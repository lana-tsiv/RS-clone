import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { postsCollection } from '../firebaseClient/collections';

const toggleVote = async ({ postId, email, vote }: any) => {
  const postRef = doc(postsCollection, postId);
  try {
    const docSnap = await getDoc(postRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      let votesUp = data.votesUp || 0;
      const voters = data.voters || {};
  console.log(postId, email, vote, voters);

      if (voters[email]) {
        if (voters[email] === vote || vote ===null) {
          delete voters[email];
          votesUp += vote !== 'up' ? 1 : -1;
		  console.log('!!!!!', votesUp)
        } else {
          votesUp += vote === 'up' ? 2 : -2;
          voters[email] = vote;
        }
      } else {
        votesUp += vote === 'up' ? 1 : -1;
        voters[email] = vote;
      }
		console.log('REs', votesUp)
      await updateDoc(postRef, {
        votesUp,
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
