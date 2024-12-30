import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFbabP_7y8OOlBHFA9ssP2W7Qe4W0zZ0k",
  authDomain: "forsa-116c3.firebaseapp.com",
  projectId: "forsa-116c3",
  storageBucket: "forsa-116c3.firebasestorage.app",
  messagingSenderId: "950455206096",
  appId: "1:950455206096:web:4b672a914ae64d69a19ed5",
  measurementId: "G-LX6X2PD8XR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
