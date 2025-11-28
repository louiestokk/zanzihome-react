import React from "react";
import { FaBars } from "react-icons/fa";
import { navlinks } from "../utils/data";
import { Link } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { FiUser } from "react-icons/fi";
import { RiAdvertisementLine } from "react-icons/ri";
import { FaWindowClose } from "react-icons/fa";
import { useGlobalContext } from "../context";
import { useUserContext } from "../user_context";
import { useHistory } from "react-router-dom";
import FoodDelivery from "./FoodDelivery";
const Navbar = ({ logedinUser, loading }) => {
  const history = useHistory();
  const { show, setShow } = useGlobalContext();
  const { showUser, setShowUser, loginWithRedirect, myUser, logout, user } =
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
              </li>
            );
          })}
        </ul>
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
                  alignItems: "center"
                }}
              >
                <h4>ZanziHom</h4>
                <p>e</p>
              </div>
            </div>
          </Link>
        </div>

        {user ? (
          <div className="nav-login-container">
            <div
              className="user-icon-container"
              onClick={() => setShowUser(!showUser)}
            >
              <img src={user.picture} className="user-icon" alt="user-icon" />
            </div>
          </div>
        ) : (
          <button className="nav-login-container" onClick={loginWithRedirect}>
            <FiUser className="login-icon" />
            <p className="login-text" style={{ color: "black" }}>
              {loading ? "proccessing...." : "Login"}
            </p>
          </button>
        )}
      </div>
      {user && (
        <div className={showUser ? "show-user-modal user-modal" : "user-modal"}>
          <div
            className="sums"
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row"
            }}
          >
            <img src={user.picture} alt="user icon" />
            <div>
              <span>Welcome</span>
              <p>{user.nickname}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowUser(!showUser)}
            className="user-account"
          >
            <Link
              to={`/profile/${user.email}`}
              className="user-modal-link"
              onClick={() => setShowUser(false)}
            >
              <FiUser className="fiUser" />
              <span> Account</span>
            </Link>
          </button>
          <Link
            to="/checkout"
            className="user-modal-link"
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => setShowUser(false)}
          >
            <RiAdvertisementLine
              className="fiUser"
              style={{ marginRight: "0.2rem" }}
            />
            <span>Advertise</span>
          </Link>
          <button
            className="user-logout"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            {loading ? "proccessing..." : "Logout"}
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
