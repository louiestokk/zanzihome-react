import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useUserContext } from "../user_context";
function AdsComponent() {
  const { myUser } = useUserContext();

  return (
    <Link to="checkout" className="nav-ad-btn">
      <AiOutlinePlusCircle className="login-icon adsplus" />
      new ad
    </Link>
  );
}

export default AdsComponent;
