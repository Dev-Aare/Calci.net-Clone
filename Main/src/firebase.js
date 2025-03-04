import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8YOSITbYKKm-9T3H_hQp2WQM0Ba2rkbA",
  authDomain: "personal-website-a40f7.firebaseapp.com",
  projectId: "personal-website-a40f7",
  storageBucket: "personal-website-a40f7.appspot.com",
  messagingSenderId: "275535493614",
  appId: "1:275535493614:web:42b9e9e8b52c09a07af6ff",
  measurementId: "G-Y59920FTTB",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
