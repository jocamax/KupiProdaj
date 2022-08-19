// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCgYyVymUmyh-h2d_C5V-BKxu5S_hInFZM",
  authDomain: "startup-projekat-971aa.firebaseapp.com",
  projectId: "startup-projekat-971aa",
  storageBucket: "startup-projekat-971aa.appspot.com",
  messagingSenderId: "129893352867",
  appId: "1:129893352867:web:6b5ac52dd39301ea510616",
  measurementId: "G-68HBWP0F0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
export const storage = getStorage(app)
const analytics = getAnalytics(app);