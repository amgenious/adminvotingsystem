import { nanoid } from "nanoid";
import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadFile = async (file:any, folder:any) => {
  try {
    const filename = nanoid();
    const storageRef = ref(
      storage,
      `${folder}${filename}.${file.name.split(".").pop()}`
    );
    const res = await uploadBytes(storageRef, file);

    return res.metadata.fullPath;
  } catch (error) {
    throw error;
  }
};

export const getFile = async (path:any) => {
  try {
    const fileRef = ref(storage, path);
    return getDownloadURL(fileRef);
  } catch (error) {
    throw error;
  }
};