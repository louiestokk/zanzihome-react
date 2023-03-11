import React, { useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState(null);
  const [active, setActive] = useState(true);
  const [showUser, setShowUser] = useState(false);
  const [saved, setSaved] = useState(false);
  const [email, setemail] = useState("");
  const [psw, setpsw] = useState(0);
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
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
        isAuthenticated,
        email,
        setemail,
        psw,
        setpsw
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
