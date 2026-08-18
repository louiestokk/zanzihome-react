import React from "react";
import Link from "next/link";
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
        <div style={{height:'30px'}}></div>
          <h2 style={{ borderBottom: "0.1px solid white" }}>Contact</h2>
          <ul className="footer-ul">
            <li>
              <Link href="/contact" className="footer-links">
                Customer service & contact
              </Link>
            </li>
            <li>
              <Link href="/about" className="footer-links">
                About ZanziHome
              </Link>
            </li>
            <li>
              <Link href="/statistics" className="footer-links">
                Real Estate Agencies
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="footer-links">
                List Property
              </Link>
            </li>
              <li>
              <Link href="/boost-listing" className="footer-links">
                Boost Listing 🚀
              </Link>
            </li>
            <li>
              <Link href="/contact" className="footer-links">
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
              <Link href="/contact" className="footer-links">
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
          <h2 style={{ borderBottom: "0.1px solid white" }}>Guides & Info</h2>
          <ul className="footer-ul">
            <li>
              <a href="/buy-property-zanzibar">Buyer's Guide</a>
            </li>
            <li>
              <a href="/invest-in-zanzibar">Invest in Zanzibar</a>
            </li>
            <li>
              <a href="/foreign-property-ownership-zanzibar">Foreign Property Ownership</a>
            </li>
            <li>
              <a href="/residency-by-investment-zanzibar">Zanzibar Residency & Tax</a>
            </li>
            <li>
              <a href="/best-areas-buy-property-zanzibar">Best Areas to Buy Property</a>
            </li>
               <li style={{display:'flex',alingItems:'center',width:'100%'}}>
              <Link href="/zanzibar-knowledge-hub" style={{ fontWeight: "700", color: "#6ee7b7" }}>ZanziHome Knowledge Hub </Link>
              📚
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom-info">
        <div>
          <button type="button" className="footer-info-bottom-btn">
            <Link href="/">All properties</Link>
          </button>
          <button type="button" className="footer-info-bottom-btn">
            <Link href="/boost-listing">Advertise</Link>
          </button>
          <button type="button" className="footer-info-bottom-btn">
            <Link href="/payments">Payments</Link>
          </button>

        </div>
        <div>
          <span> {year}  &copy; 'ZanziHome' Stokk Tech Limited, Zanzibar </span>
       
        </div>
      </div>
    </>
  );
};

export default Footer;
