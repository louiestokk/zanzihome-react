import React, { useState, useContext, useEffect } from "react";
import { objects } from "./utils/data";
import { Link } from "react-router-dom";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [propertys, setPropertys] = useState(objects);
  const [show, setShow] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [active, setActive] = useState(true);
  const [index, setIndex] = useState(0);

  return (
    <AppContext.Provider
      value={{
        objects,
        setShow,
        show,
        showFilter,
        setShowFilter,
        active,
        setActive,
        propertys,
        setPropertys,
        index,
        setIndex,
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
