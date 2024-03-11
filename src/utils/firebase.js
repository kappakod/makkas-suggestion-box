// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDgLvBQ7yJ3_LRyGMZQbb3Fimc2ZqLf3gg",
  authDomain: "suggestion-box-3a08f.firebaseapp.com",
  projectId: "suggestion-box-3a08f",
  storageBucket: "suggestion-box-3a08f.appspot.com",
  messagingSenderId: "614738498415",
  appId: "1:614738498415:web:51c519108b3ad2c67dce9a"
};

const app = initializeApp(firebaseConfig);
console.log(app);
const firestore = getFirestore(app);
const gameCollectionRef = collection(firestore, 'suggestions')

export { gameCollectionRef, getDocs }; // Export Firestore instance
