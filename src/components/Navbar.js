import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { navlinks } from "../utils/data";
import { Link } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { FiUser } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";
import { useGlobalContext } from "../context";
import { useUserContext } from "../user_context";
import { MdOutlineLogout } from "react-icons/md";
import AdsComponent from "./AdsComponent";

const Navbar = () => {
  const { show, setShow } = useGlobalContext();
  const { showUser, setShowUser, loginWithRedirect, myUser, logout } =
    useUserContext();
  const refreshPage = () => {
    window.location.href = "/";
  };

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
              <Link
                to="/advertisepropertyzanzibar"
                onClick={() => setShow(!show)}
              >
                Advertise property
              </Link>
            </div>

            <Link
              to="/advertisepropertyzanzibar"
              onClick={() => setShow(!show)}
            >
              Price for advertising{" "}
            </Link>
            <Link to="/guid" onClick={() => setShow(!show)}>
              Guide to sell{" "}
            </Link>
          </div>
          <div className="delare"></div>
          <div className="navbar-con navbar-con-ett">
            <div className="nn">
              <Link to="/guid" onClick={() => setShow(!show)}>
                Guid to buy{" "}
              </Link>
            </div>

            <Link to="/buildhousezanzibar" onClick={() => setShow(!show)}>
              Build house{" "}
            </Link>

            <Link
              className="foreginer"
              style={{ color: "green" }}
              to="/foreginerpropertyzanzibar"
              onClick={() => setShow(!show)}
            >
              Guid for foreginers{" "}
            </Link>
          </div>
        </div>
      </div>
      <div className="nav-container">
        <div className="nav-btn-container">
          <div className="nav-btn" onClick={() => setShow(!show)}>
            <FaBars />
          </div>
          <Link to="/">
            <div className="logo" onClick={refreshPage}>
              <div className="logo-circle">
                <ImHome className="logo-icon" />
              </div>
              <div
                className="logo-text"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h4>ZanziHome</h4>
                <p>e</p>
              </div>
            </div>
          </Link>
        </div>

        {myUser ? (
          <div className="nav-login-container">
            <AdsComponent />
            <div
              className="user-icon-container"
              onClick={() => setShowUser(!showUser)}
            >
              <img src={myUser.picture} className="user-icon" alt="user-icon" />
            </div>
          </div>
        ) : (
          <button className="nav-login-container" onClick={loginWithRedirect}>
            <FiUser className="login-icon" />
            <p className="login-text">Login</p>
          </button>
        )}
      </div>
      {myUser && (
        <div className={showUser ? "show-user-modal user-modal" : "user-modal"}>
          <div className="sums">
            <img src={myUser.picture} alt="user icon" />
            <div>
              <span>Welcome</span>
              <p>{myUser.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowUser(!showUser)}
            className="user-account"
          >
            <Link
              to={`/profile/${myUser.nickname}`}
              className="user-modal-link"
            >
              <FiUser className="fiUser" />
              <span> Account</span>
            </Link>
          </button>

          <button
            className="user-logout"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
