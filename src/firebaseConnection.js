import firebase from 'firebase/compat/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyATzckWERxp4WKn6EAkAVzetVZYNJJjWzI",
  authDomain: "personalwebsite-78b58.firebaseapp.com",
  projectId: "personalwebsite-78b58",
  storageBucket: "personalwebsite-78b58.appspot.com",
  messagingSenderId: "738725610597",
  appId: "1:738725610597:web:3c0410df09c77b7972728c",
  measurementId: "G-5CX7BNBCJ8"
}

firebase.initializeApp(firebaseConfig);
export default getFirestore();