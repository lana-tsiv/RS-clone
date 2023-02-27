import { storage } from "@/firebaseClient/clientApp";

import { getDownloadURL, listAll, ref } from "firebase/storage";

export const getListOfImages = async (path = "postsImages/") => {
  const refImage = ref(storage, path);
  let result = await listAll(refImage);
  let urlPromises = result.items.map((imageRef: any) => getDownloadURL(imageRef));

  return Promise.all(urlPromises);
};

export const getSingleImage = async (path = "postsImages/Capture.PNG") => {
  const myRef = ref(storage, "postsImages/Capture.PNG");
  const url = await getDownloadURL(myRef);
  return url;
};
