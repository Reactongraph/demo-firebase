// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "@firebase/auth"
import { getFirestore } from '@firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdl1SO0fM3ye5F7ouuMvGa1YYnHmxrI4k",
  authDomain: "fir-chat-f21c6.firebaseapp.com",
  projectId: "fir-chat-f21c6",
  storageBucket: "fir-chat-f21c6.appspot.com",
  messagingSenderId: "321954063485",
  appId: "1:321954063485:web:22a939608b211175b7bd14",
  measurementId: "G-51NQ45C64N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
export const db= getFirestore(app)