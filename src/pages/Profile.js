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
    justifyContent: "center"
  },
  sec1: {
    display: "flex",
    flexDirection: "column"
  },
  img: {
    objectFit: "cover",
    backgroundPosition: "center",
    width: "200px",
    height: "200px",
    borderRadius: "5px"
  },
  horis: {
    height: "1px",
    background: "lightgray",
    width: "90%",
    margin: "1.5rem 0"
  }
});
const Profile = () => {
  const classes = useStyles();
  const fireStoreData = useSelector(getFirestoreData);
  const { user, active, setActive } = useUserContext();
  const email = "gerrardzanzibar@gmail.com";
  console.log(fireStoreData);
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
          {user && user.nickname ? user.nickname : "user"}
          {"  "}
          {user && user.email ? user.email : "email"}
        </div>
      </section>
      <div className={classes.horis}></div>
      <h2 style={{ marginBottom: "1rem" }}>My ZanziHome</h2>
      <section className={classes.sec2}>
        {fireStoreData &&
          fireStoreData
            .filter((el) => el.Email === email)
            .map((el, ind) => {
              const {
                Name,
                Email,
                Phone,
                Sell,
                Area,
                Adress,
                Rent,
                top3,
                rocket3,
                rocket10,
                top10,
                category,
                Zip,
                Title,
                Text,
                Price,
                adId,
                About,
                Size,
                Rooms,
                uri
              } = el;
              return (
                <div key={adId} className={classes.container}>
                  <h4>adId:{adId}</h4>
                  <img src={uri} alt="image" className={classes.img} />
                </div>
              );
            })}
      </section>
    </div>
  );
};

export default Profile;
