// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const FIREBASE_API = import.meta.env.VITE_SPOONACULAR_API_KEY;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API,
  authDomain: "mysteryboxchef.firebaseapp.com",
  projectId: "mysteryboxchef",
  storageBucket: "mysteryboxchef.appspot.com",
  messagingSenderId: "1080595820929",
  appId: "1:1080595820929:web:0a540b8a58eb0fbf9a3880"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const firebaseStorageDb = getStorage(app);

export const googleAuthProvider = new GoogleAuthProvider();

export { auth, db, firebaseStorageDb };