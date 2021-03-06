// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

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
export const db = firebase.firestore();
const storage = firebase.storage();

export const auth = firebase.auth();
export const users = db.collection("users");
export const storageRef = storage.ref();

export default firebase;
