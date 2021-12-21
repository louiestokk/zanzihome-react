import React, { useState, useContext, useEffect, useReducer } from "react";
import { objects } from "./utils/data";
import reducer from "./reducers/filter_reducer";
import { useAuth0 } from "@auth0/auth0-react";

const AppContext = React.createContext();
const initialState = {
  propObjects: objects,
};

const AppProvider = ({ children }) => {
  const [myUser, setMyUser] = useState(null);
  const { loginWithRedirect, logout, user } = useAuth0();
  const [propertys, setPropertys] = useState([]);
  const [active, setActive] = useState(true);
  const [index, setIndex] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);
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
  //

  useEffect(() => {
    setPropertys(objects);
  }, [objects]);
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
