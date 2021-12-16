import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { navlinks } from "../utils/data";
import { Link } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { FiUser } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";

const Navbar = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className={`${show ? "nav-menu show-menu" : "nav-menu"}`}>
        <ul>
          <li className="nav-list close-nav-btn" onClick={() => setShow(!show)}>
            <FaWindowClose />
          </li>
          {navlinks.map((link) => {
            return (
              <li
                key={link.id}
                className="nav-list"
                onClick={() => setShow(!show)}
              >
                <Link to={link.url} className="nav-links">
                  {link.text}
                  {link.icon && link.icon}
                </Link>
                <div className="divider"></div>
              </li>
            );
          })}
        </ul>

        <div className="navmenu-info">
          <div className="navbar-con navbar-con-ett">
            <p>Search property</p>
            <div className="nn">
              <BsSearch className="search" />
              <h4>New search</h4>
            </div>
            <div className="nn">
              <BsThreeDotsVertical className="search" />
              <p>All propertys</p>
            </div>
          </div>
          <div className="delare"></div>
          <div className="navbar-con navbar-con-ett">
            <p>Sell property</p>
            <div className="nn">
              <h4>Advertise property </h4>
            </div>

            <h4>Price for advertising </h4>
            <h4>Guide to selling </h4>
          </div>
          <div className="delare"></div>
          <div className="navbar-con navbar-con-ett">
            <div className="nn">
              <h4>Guid to buy </h4>
            </div>

            <h4> Build house </h4>
            <h4>Guide to selling </h4>
            <h4 className="foreginer">Guid for foreginers </h4>
          </div>
        </div>
      </div>
      <div className="nav-container">
        <div className="nav-btn-container">
          <div className="nav-btn" onClick={() => setShow(!show)}>
            <FaBars />
          </div>
          <div className="logo">
            <div className="logo-circle">
              <ImHome className="logo-icon" />
            </div>
            <div className="logo-text">
              <h4>ZanziHom</h4>
              <p>e</p>
            </div>
          </div>
        </div>

        <div className="nav-login-container">
          <FiUser className="login-icon" />
          <h4 className="login-text">Login</h4>
        </div>
      </div>
    </>
  );
};

export default Navbar;
