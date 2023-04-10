import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineFacebook } from "react-icons/ai";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <div className="footer">
        <div
          style={{
            padding: "1rem",
            fontFamily: "serif"
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
              <Link to="/advertisepropertyzanzibar" className="footer-links">
                Advertise property
              </Link>
            </li>
            <li>
              <Link to="/contact" className="footer-links">
                Banner Advertising
              </Link>
            </li>
          </ul>
        </div>
        <div
          style={{
            padding: "1rem",
            fontFamily: "serif"
          }}
        >
          <h2 style={{ borderBottom: "0.1px solid white" }}>Follow Us</h2>
          <ul className="footer-ul">
            <li>
              <HiOutlineMail className="insta-fot" />
              <Link to="/contact" className="footer-links">
                ZanziHome newsletter
              </Link>
            </li>
            <li>
              <a
                href="https://www.instagram.com/zanzihome2021/?igshid=YmMyMTA2M2Y%3D"
                className="insta-fot"
                title="zanzihome2021 instagram profile"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <FaInstagram />
              </a>
              Instagram
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=100091371297270&mibextid=LQQJ4d"
                className="insta-fot"
                title="Facebook https://zanzihome.com"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <AiOutlineFacebook style={{ fontSize: "1.2rem" }} />
              </a>
              Facebook
            </li>
          </ul>
        </div>
        <div
          style={{
            padding: "1rem",
            fontFamily: "serif"
          }}
        >
          <h2 style={{ borderBottom: "0.1px solid white" }}>Guides</h2>
          <ul className="footer-ul">
            <li>
              <a href="/buy-property-zanzibar">Buyer's guide</a>
            </li>
            {/* <li>
              <a href="/sell-property-zanzibar">Seller guide</a>
            </li>
            <li>
              <a href="rentout-property-zanzibar">Rentout guide</a>
            </li>
            <li>
              <a href="/rent-property-zanzibar">Rent guide</a>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="footer-bottom-info">
        <div>
          <button type="button" className="footer-info-bottom-btn">
            <Link to="/">All properties</Link>
          </button>
          <button type="button" className="footer-info-bottom-btn">
            <Link to="/advertisepropertyzanzibar">Advertise</Link>
          </button>
          <button type="button" className="footer-info-bottom-btn">
            <Link to="/payments">Payments</Link>
          </button>
          <button type="button" className="footer-info-bottom-btn">
            <Link to="/advertisepropertyzanzibar">Prices</Link>
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
