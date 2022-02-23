import React, { useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState(null);
  const [active, setActive] = useState(true);
  const [showUser, setShowUser] = useState(false);
  const [saved, setSaved] = useState(false);
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  // sparade bostäder , mina annonser, mitt konto, logga ut
  // knappar för varje och state för varje och om true returnera det man tryckt på annars retunera inget
  // uppdatera nummer av sparade och annonser , ge dem state läge med start 0 och öka för varje
  return (
    <UserContext.Provider
      value={{
        loginWithRedirect,
        logout,
        myUser,
        active,
        setActive,
        showUser,
        setShowUser,
        saved,
        setSaved,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  return useContext(UserContext);
};
export { UserContext, UserProvider };
