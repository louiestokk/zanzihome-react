import React, { useState, useContext, useEffect, useReducer } from "react";
import reducer from "../src/reducers/form_reducer";
const getLocalstorage = () => {
  let price = localStorage.getItem("adspack");
  if (price) {
    return localStorage.getItem("adspack").split("-")[1];
  } else {
    return [];
  }
};
const initialState = {
  amount: getLocalstorage(),
};
const FormContext = React.createContext();

const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [company, setCompany] = useState(true);
  const [sell, setSell] = useState(true);
  const [price, setPrice] = useState();

  const packageChange = (e) => {
    localStorage.setItem("adspack", e.target.value);
    let number = parseInt(e.target.value.split("-")[1]);
    setPrice(number);
  };
  // handle change can dispatch and use useReducer
  const handleChange = (e) => {
    if (e.currentTarget.name === "Privat") setCompany(!company);
    if (e.currentTarget.name === "Company") setCompany(false);
    if (e.currentTarget.name === "Sell") setSell(!sell);
    if (e.currentTarget.name === "Rent") setSell(false);
  };
  const handlePrice = (price) => {
    dispatch({ type: "SET_PRICE", payload: price });
  };
  return (
    <FormContext.Provider
      value={{
        setCompany,
        company,
        sell,
        setSell,
        handleChange,
        packageChange,
        price,
        setPrice,
        ...state,
        handlePrice,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
export const useFormContext = () => {
  return useContext(FormContext);
};
export { FormContext, FormProvider };
