import React from "react";
import { useUserContext } from "../user_context";
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useUserContext();
  return isAuthenticated &&
    user?.email === process.env.REACT_ADMIN_EMAIL_LOGIN ? (
    children
  ) : (
    <h4>sorry no page found!</h4>
  );
};

export default PrivateRoute;
