import { getAuth} from "firebase/auth";
import { initializeApp,getApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:  process.env.NEXT_PUBLIC_APIKEY,
  authDomain:  process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,
  storageBucket:  process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId:process.env.NEXT_PUBLIC_APPID,
  
};

// Initialize Firebase
const app =!getApps().length ? initializeApp(firebaseConfig):getApp();
export const auth = getAuth(app) 
export const db = getFirestore(app)
const STORAGE_FOLDER_PATH = "gs://voting-system-45295.appspot.com";
export const storage = getStorage(app,STORAGE_FOLDER_PATH )