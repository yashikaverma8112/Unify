// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyh-Kf6kOArA_URARSG0Nt6HaXy-zLXHY",
  authDomain: "unify-66b6a.firebaseapp.com",
  projectId: "unify-66b6a",
  storageBucket: "unify-66b6a.appspot.com",
  messagingSenderId: "97452104819",
  appId: "1:97452104819:web:5406fdb985a9b1d52c5e06",
  measurementId: "G-12C7644TRP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth();
const provider = new GoogleAuthProvider()
export {auth, provider}