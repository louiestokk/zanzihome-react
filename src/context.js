import React, { useState, useContext, useEffect, useReducer } from "react";
import { objects } from "./utils/data";
import reducer from "./reducers/filter_reducer";

const AppContext = React.createContext();

const initialState = {
  propObjects: objects,
};
const AppProvider = ({ children }) => {
  const [propertys, setPropertys] = useState([]);
  const [active, setActive] = useState(true);
  const [index, setIndex] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);

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
  const newOb = objects.sort((a, b) => b.date - a.date);
  const oldOb = objects.sort((a, b) => a.date - b.date);
  const filterItems = (value) => {
    if (value === "oldest") {
      const oldOb = propertys.sort((a, b) => b.date - a.date);
      setPropertys(oldOb);
    }
    if (value === "oldest") {
      const newOb = propertys.sort((a, b) => a.date - b.date);
      setPropertys(newOb);
    }
    if (value === "lowprice") {
      const lowOb = propertys.sort((a, b) => a.price - b.price);
      setPropertys((oldLow) => lowOb);
    }
  };
  useEffect(() => {
    setPropertys(objects);
  }, [objects]);
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
        filterItems,
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
