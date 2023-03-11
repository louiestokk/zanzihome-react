import React, { useState, useContext } from "react";

const FormContext = React.createContext();

const FormProvider = ({ children }) => {
  const [company, setCompany] = useState(true);
  const [sell, setSell] = useState(true);
  const [price, setPrice] = useState(undefined);
  const [activeStep, setActiveStep] = useState(0);
  const [adId, setAdId] = useState(Math.floor(Math.random() * 1000000000));

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
        activeStep,
        setActiveStep,
        adId,
        setAdId
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
