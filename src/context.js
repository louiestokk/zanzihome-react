import React, { useState, useContext, useEffect } from "react";
import { objects } from "./utils/data";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [propertys, setPropertys] = useState(objects);
  const [show, setShow] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [active, setActive] = useState(true);

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
