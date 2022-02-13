import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "food-a14ec.firebaseapp.com",
  databaseURL:
    "https://food-a14ec-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "food-a14ec",
  storageBucket: "food-a14ec.appspot.com",
  messagingSenderId: "940026090369",
  appId: "1:940026090369:web:007a7ba2c8b1091657ce80",
  measurementId: "G-QZFKVCLKMP",
};
export const app = initializeApp(firebaseConfig);
