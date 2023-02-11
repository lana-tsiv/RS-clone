import { storage } from '@/firebaseClient/clientApp';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const createUniqueFileName = () => Date.now().toString() + "7ty4kpyNv35QonTVsZMA";

export const uploadImage = (fileList: FileList, callback: (v: string) => void) => {
  if (!fileList[0]) return null;

  const file = fileList[0];

  const storageRef = ref(storage, `/files/${createUniqueFileName()}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
	  console.log(percent)
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log(url);
        callback(url);
      });
    }
  );
};
