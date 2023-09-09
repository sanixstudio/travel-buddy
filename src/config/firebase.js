// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "travel-tracker-96a8d.firebaseapp.com",
  projectId: "travel-tracker-96a8d",
  storageBucket: "travel-tracker-96a8d.appspot.com",
  messagingSenderId: "12242804067",
  appId: "1:12242804067:web:99e598f1a5c0bc724ac756",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseApp);
export const fireStore = getFirestore(firebaseApp);
