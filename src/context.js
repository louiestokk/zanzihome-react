import React, { useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { objects } from "./utils/data";

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
        loading,
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
