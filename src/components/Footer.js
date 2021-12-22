import React from "react";
import { Link } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <div className="footer">
        <div
          style={{
            padding: "1rem",
            fontFamily: "serif",
          }}
        >
          <h2 style={{ borderBottom: "0.1px solid white" }}>Contact</h2>
          <ul className="footer-ul">
            <li>
              <Link to="/contact" className="footer-links">
                Customer service & contact
              </Link>
            </li>
            <li>
              <Link to="/about" className="footer-links">
                About ZanziHome
              </Link>
            </li>
            <li>
              <Link to="/advertiseproperty" className="footer-links">
                Advertise property
              </Link>
            </li>
            <li>
              <Link to="/advertiseproperty" className="footer-links">
                Banner Advertising
              </Link>
            </li>
          </ul>
        </div>
        <div
          style={{
            padding: "1rem",
            fontFamily: "serif",
          }}
        >
          <h2 style={{ borderBottom: "0.1px solid white" }}>Follow Us</h2>
          <ul className="footer-ul">
            <li>
              <HiOutlineMail className="insta-fot" />
              <Link to="/newsletter" className="footer-links">
                ZanziHome newsletter
              </Link>
            </li>
            <li>
              <a href="" className="insta-fot">
                <FaInstagram />
              </a>
              Instagram
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom-info">
        <div>
          <button type="button" className="footer-info-bottom-btn">
            <Link to="/">All properties</Link>
          </button>
          <button type="button" className="footer-info-bottom-btn">
            <Link to="/">Advertise</Link>
          </button>
          <button type="button" className="footer-info-bottom-btn">
            <Link to="/">Payments</Link>
          </button>
          <button type="button" className="footer-info-bottom-btn">
            <Link to="/">Prices</Link>
          </button>
        </div>
        <div>
          <span>Stokk Tech Limited &copy;</span>
          <span> {year} ZanziHome</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
