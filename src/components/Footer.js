import React from "react";
import { HiOutlineMail } from "react-icons/hi";

const Footer = () => {
  return (
    <div className="footer">
      <div className="form-container">
        <div className="footer-mail">
          <HiOutlineMail />
        </div>
        <h2>Subscribe to our newsletter</h2>
        <form className="form">
          <input type="text" placeholder="email" />
          <button type="submit" className="sub-btn">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Footer;
