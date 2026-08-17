import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore, enableMultiTabIndexedDbPersistence } from "firebase/firestore";

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

if (typeof window !== "undefined") {
  enableMultiTabIndexedDbPersistence(db).catch((err) => {
    console.warn("Firestore persistence failed to enable:", err.code);
  });
}

let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}
