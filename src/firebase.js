// src/firebase.js
import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyBIGZBZuCUsmSr3J7rGs7uxOlS9ecXmpTg",
    authDomain: "fun-food-friends-3c456.firebaseapp.com",
    databaseURL: "https://fun-food-friends-3c456.firebaseio.com",
    projectId: "fun-food-friends-3c456",
    storageBucket: "fun-food-friends-3c456.appspot.com",
    messagingSenderId: "347566686985"
};
firebase.initializeApp(config);
export default firebase;