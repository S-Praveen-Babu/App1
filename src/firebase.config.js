import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvsXjHm-4pWFY8PI1JKfE_LMqfM5FF8l8",
  authDomain: "house-marketplace-71fbb.firebaseapp.com",
  projectId: "house-marketplace-71fbb",
  storageBucket: "house-marketplace-71fbb.appspot.com",
  messagingSenderId: "318081177126",
  appId: "1:318081177126:web:f616dbca008934fe5cf8e7",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
