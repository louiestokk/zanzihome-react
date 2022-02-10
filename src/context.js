import React, { useState, useContext, useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getDatabase, ref, onValue } from "firebase/database";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [myUser, setMyUser] = useState(null);
  const { loginWithRedirect, logout, user } = useAuth0();
  const [propertys, setPropertys] = useState([]);
  const [active, setActive] = useState(true);
  const [index, setIndex] = useState(0);
  const [savedItemsArray, setSavedItemsArray] = useState([]);
  const [show, setShow] = useState(false);

  //firebase
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

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const database = getDatabase();
  const fetchDataFirebase = () => {
    const db = getDatabase();
    const starCountRef = ref(db, "objects");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setPropertys(data);
    });
  };

  useEffect(() => {
    fetchDataFirebase();
  }, []);
  // filters
  const forSale = () => {
    const objectsForSale = propertys.filter((el) => el.to === "Buy");
    setPropertys(objectsForSale);
    setActive(!active);
  };
  const forRent = () => {
    const objectsForRent = propertys.filter((el) => el.to === "Rent");
    setPropertys(objectsForRent);
    setActive(false);
  };
  const forBusiness = () => {
    const objectsBusiness = propertys.filter((el) => el.type === "Business");
    setPropertys(objectsBusiness);
    setActive(null);
  };

  useEffect(() => {
    setMyUser(user);
  }, [user]);
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  //
  return (
    <AppContext.Provider
      value={{
        active,
        setActive,
        index,
        setIndex,
        propertys,
        setPropertys,
        forSale,
        forRent,
        forBusiness,
        show,
        setShow,
        loginWithRedirect,
        logout,
        myUser,
        handleChange,
        savedItemsArray,
        setSavedItemsArray,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
