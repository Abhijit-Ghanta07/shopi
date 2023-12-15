// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: "location-app-389103.firebaseapp.com",
  databaseURL:
    "https://location-app-389103-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "location-app-389103",
  storageBucket: "location-app-389103.appspot.com",
  messagingSenderId: "919096105011",
  appId: "1:919096105011:web:3f00ca8e4c0bed21f7ab46",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const DB = getFirestore(app);
