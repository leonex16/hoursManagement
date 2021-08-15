import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDGfASiU2jXFJ4boAwCiNupsFUmkEfsbCM",
  authDomain: "hour-management-e6747.firebaseapp.com",
  projectId: "hour-management-e6747",
  storageBucket: "hour-management-e6747.appspot.com",
  messagingSenderId: "761707441154",
  appId: "1:761707441154:web:0203745d9536d89a344b1b",
  measurementId: "G-E670GG057S"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.firestore();