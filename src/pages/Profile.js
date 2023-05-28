import React, { useState, useEffect } from "react";
import { useUserContext } from "../user_context";
import { BsHeart } from "react-icons/bs";
import { makeStyles } from "@material-ui/core";
import { RiAdvertisementLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  sec1: {
    display: "flex",
    flexDirection: "column"
  },
  img: {
    objectFit: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "220px",
    borderRadius: "5px"
  },
  horis: {
    height: "1px",
    background: "lightgray",
    width: "90%",
    margin: "1.5rem 0"
  },
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginBottom: "1rem",
    "&:hover": {
      border: "1px solid black",
      borderRadius: "5px"
    },
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
  },

  holder: {
    position: "absolute",
    color: "white",
    background: "black",
    padding: "0.5rem"
  }
});
const Profile = () => {
  const classes = useStyles();
  const fireStoreData = useSelector(getFirestoreData);
  const { user, active, setActive } = useUserContext();

  return (
    <div className={classes.root} id="profile">
      <h2 style={{ margin: "0.5rem 0" }}>Welcome {user && user.nickname}</h2>
      <section className={classes.sec1}>
        {user && user.picture ? (
          <img
            src={user.picture}
            alt="user icon"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%"
            }}
          />
        ) : (
          <FaUserCircle />
        )}
        <div style={{ marginTop: "0.5rem" }}>
          <p style={{ fontSize: "0.75rem" }}>
            {user && user.nickname ? user.nickname : "user"}
          </p>
          {"  "}
          <p style={{ fontSize: "0.75rem" }}>
            {user && user.email ? user.email : "email"}
          </p>
        </div>
      </section>
      <div className={classes.horis}></div>
      <h2 style={{ marginBottom: "1rem" }}>My ZanziHome</h2>
      <section className={classes.sec2}>
        {fireStoreData &&
          fireStoreData
            .filter((el) => el.Email === user?.email)
            .map((el, ind) => {
              const { adId, uri } = el;
              console.log(el);
              return (
                <Link to={`/edit/property/user/${adId}`} key={adId}>
                  <div key={adId} className={classes.container}>
                    <div className={classes.holder}>
                      <h4>adId:{adId}</h4>
                    </div>
                    <img src={uri} alt="image" className={classes.img} />
                  </div>
                </Link>
              );
            })}
      </section>
    </div>
  );
};

export default Profile;
