import React, { useState, useContext, useEffect } from "react";
import { useAuth0, User } from "@auth0/auth0-react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState(null);
  const [icon, setIcon] = useState("");
  const { loginWithRedirect, logout, user } = useAuth0();

  useEffect(() => {
    setMyUser(user);
  }, [user]);

  //
  return (
    <UserContext.Provider
      value={{
        loginWithRedirect,
        logout,
        myUser,
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
