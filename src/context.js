import React, { useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { objects } from "./utils/data";
import {
  getDatabase,
  ref,
  onValue,
  set,
  child,
  push,
  update,
} from "firebase/database";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [myUser, setMyUser] = useState(null);
  const { loginWithRedirect, logout, user } = useAuth0();
  const [propertys, setPropertys] = useState(objects);
  const [active, setActive] = useState(true);
  const [index, setIndex] = useState(0);
  const [savedItemsArray, setSavedItemsArray] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  //firebase

  const writeNewObject = (
    adId,
    name,
    email,
    phone,
    category,
    area,
    adress,
    zip,
    title,
    info,
    price
  ) => {
    const db = getDatabase();
    const postData = {
      adId,
      name,
      email,
      phone,
      category,
      area,
      adress,
      zip,
      title,
      info,
      price,
    };
    const newPostKey = push(child(ref(db), "objects")).key;
    const updates = {};
    updates["objects" + newPostKey] = postData;

    return update(ref(db), updates);
  };

  const fetchDataFirebase = () => {
    setLoading(true);
    const db = getDatabase();
    const starCountRef = ref(db, "objects");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setPropertys(data);
      setLoading(false);
    });
  };

  // useEffect(() => {
  //   fetchDataFirebase();
  // }, []);

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
        savedItemsArray,
        setSavedItemsArray,
        writeNewObject,
        loading,
        fetchDataFirebase,
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
