import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// const firebaseConfig = {
//   apiKey: process.env.REACT_API_KEY_FIREBASE,
//   authDomain: process.env.REACT_AUTHDOMAIN_FIREBASE,
//   projectId: process.env.REACT_PROJECTID_FIREBASE,
//   storageBucket: process.env.REACT_STORAGEBUCKET_FIREBASE,
//   messagingSenderId: process.env.REACT_MESSAGINGSENDERID_FIREBASE,
//   appId: process.env.REACT_APPID_FIREBASE,
//   measurementId: process.env.REACT_MEASUREMENTID_FIREBASE
// };
const firebaseConfig = {
  apiKey: "AIzaSyC-VNhKXGxYfeVJ_wsKKGKKWG5dRrXkRRo",

  authDomain: "homenet-47307.firebaseapp.com",

  projectId: "homenet-47307",

  storageBucket: "homenet-47307.appspot.com",

  messagingSenderId: "588274312202",

  appId: "1:588274312202:web:51952d08116efd468a2bf3",

  measurementId: "G-V9C8ZJ54DS"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
