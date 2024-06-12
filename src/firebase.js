// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// import { getFirestore } from "firebase/firestore";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAkNln4-nOCKl-ZC2mUI4y-fEGd1NiCzME",
//   authDomain: "goodwilltogive.firebaseapp.com",
//   databaseURL: "https://goodwilltogive-default-rtdb.firebaseio.com",
//   projectId: "goodwilltogive",
//   storageBucket: "goodwilltogive.appspot.com",
//   messagingSenderId: "764435663568",
//   appId: "1:764435663568:web:7711d98b912ca6d32dacd5"
// };


// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const firestore = getFirestore(app);
// firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();
// export const firestore = firebase.firestore();

import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber , createUserWithEmailAndPassword,sendEmailVerification} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyAkNln4-nOCKl-ZC2mUI4y-fEGd1NiCzME",
    authDomain: "goodwilltogive.firebaseapp.com",
    databaseURL: "https://goodwilltogive-default-rtdb.firebaseio.com",
    projectId: "goodwilltogive",
    storageBucket: "goodwilltogive.appspot.com",
    messagingSenderId: "764435663568",
    appId: "1:764435663568:web:7711d98b912ca6d32dacd5"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const messaging = getMessaging(app);
export { auth, RecaptchaVerifier, signInWithPhoneNumber ,firestore, messaging, createUserWithEmailAndPassword,sendEmailVerification};

