import { collection, getDocs, addDoc, getDoc, doc } from "firebase/firestore";
import { db } from "@/firebaseClient/clientApp";

import { communitiesCollection } from "@/firebaseClient/collections";

import { ICommunity } from "@/types/common";

export const getAllCommunities = async () => {
  const data = await getDocs(collection(db, "communities"));

  return data.docs.map((item) => {
    return { ...item.data(), id: item.id };
  });
};

export const getCommunity = (id: string) => {
  if (!id) return null;
  const docRef = doc(communitiesCollection, id);
  getDoc(docRef);
  return getDoc(docRef);
};

export const createCommunity = (props: ICommunity) => {
  return addDoc(communitiesCollection, { ...props });
};
