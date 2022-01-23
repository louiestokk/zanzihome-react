import React, { useState, useContext, useEffect } from "react";
import { objects } from "./utils/data";
import { useAuth0 } from "@auth0/auth0-react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [myUser, setMyUser] = useState(null);
  const { loginWithRedirect, logout, user } = useAuth0();
  const [propertys, setPropertys] = useState(objects);
  const [active, setActive] = useState(true);
  const [index, setIndex] = useState(0);
  const [savedItemsArray, setSavedItemsArray] = useState([]);
  const [show, setShow] = useState(false);

  //
  const forSale = () => {
    const objectsForSale = objects.filter((el) => el.to === "Buy");
    setPropertys(objectsForSale);
    setActive(!active);
  };
  const forRent = () => {
    const objectsForRent = objects.filter((el) => el.to === "Rent");
    setPropertys(objectsForRent);
    setActive(false);
  };
  const forBusiness = () => {
    const objectsBusiness = objects.filter((el) => el.type === "Business");
    setPropertys(objectsBusiness);
    setActive(null);
  };
  const checkLocal = () => {
    if (localStorage.getItem("adspack")) {
      setSavedItemsArray(localStorage.getItem("adspack"));
    }
  };

  useEffect(() => {
    setMyUser(user);
  }, [user]);
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  useEffect(() => {
    checkLocal();
    localStorage.setItem("adspack", savedItemsArray);
  });

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
