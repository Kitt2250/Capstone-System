import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyCYRvwmlK0Jc-4hNjTf5XgUIPwBtMrFAzc",
  authDomain: "capstone-project-b78de.firebaseapp.com",
  projectId: "capstone-project-b78de",
  storageBucket: "capstone-project-b78de.firebasestorage.app",
  messagingSenderId: "239959269526",
  appId: "1:239959269526:web:fa4b8f970617874a19e2b7",
  measurementId: "G-B41KZRTXBL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);