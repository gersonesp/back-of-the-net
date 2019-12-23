// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHtNhgziH9Ani0WX8eOJpMKLdu-AlM1bU",
  authDomain: "back-of-the-net.firebaseapp.com",
  databaseURL: "https://back-of-the-net.firebaseio.com",
  projectId: "back-of-the-net",
  storageBucket: "back-of-the-net.appspot.com",
  messagingSenderId: "18061193514",
  appId: "1:18061193514:web:7ec5e66f09b15d2ee42e53"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const predictions = db.collection("users").doc("predictions");

export default firebase;
