import React, { useState, useContext, useEffect, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import userReducer from "./reducers/user_reducer";
const UserContext = React.createContext();
const initialState = {
  objectId: "",
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [myUser, setMyUser] = useState(null);
  const [active, setActive] = useState(true);
  const [showUser, setShowUser] = useState(false);
  const [saved, setSaved] = useState(false);
  const { loginWithRedirect, logout, user } = useAuth0();
  useEffect(() => {
    setMyUser(user);
  }, [user]);

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
