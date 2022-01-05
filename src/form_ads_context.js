import React, { useState, useContext, useEffect } from "react";

const FormContext = React.createContext();

const FormProvider = ({ children }) => {
  const [company, setCompany] = useState(true);
  const [sell, setSell] = useState(true);

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
