import React, { useState, useRef, useEffect } from "react";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import SendImages from "./SendImages";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { useSelector } from "react-redux";
import { db } from "../firebase";
const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "80%"
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    height: "2rem",
    marginBottom: "0.3rem"
  }
});
const EditObject = () => {
  const firestoreData = useSelector(getFirestoreData);
  const form = useRef();
  const classes = useStyles();
  const { adId } = useParams();

  const handleAdsFormChange = async (e) => {
    try {
      const q = query(
        collection(db, "newAd"),
        where("adId", "==", Number(adId))
      );
      const querySnapshot = await getDocs(q);
      let docId = "";
      querySnapshot.forEach((doc) => (docId = doc.id));
      const object = doc(db, "newAd", docId);
      await updateDoc(object, { [e.target.name]: e.target.value });
      console.log("updated");
    } catch (error) {
      console.log(error);
    }
  };
  const currentObject = firestoreData?.filter((el) => el.adId === Number(adId));

  return (
    <div className={classes.root}>
      <section style={{ marginBottom: "1rem" }}>
        <h4 style={{ marginBottom: "0.5rem" }}>Add more images</h4>
        {/* <SendImages adsFormData={adsFormData} setadsFormData={setadsFormData} /> */}
      </section>
      <form className={classes.form} ref={form}>
        <h4>Edit ad: {adId}</h4>
        <input
          placeholder={currentObject[0].Name}
          name="Name"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <input
          placeholder={currentObject[0].Email}
          name="Email"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <input
          placeholder={currentObject[0].Phone}
          name="Phone"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <input
          placeholder={currentObject[0].Area}
          name="Area"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <input
          placeholder={currentObject[0].Adress}
          name="Adress"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <input
          placeholder={currentObject[0].Title}
          name="Title"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <input
          placeholder={currentObject[0].Text}
          name="Text"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <input
          placeholder={`${currentObject[0].Price}$`}
          name="Price"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <input
          placeholder={`${currentObject[0].Size}.sqm`}
          name="Size"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <input
          placeholder={currentObject[0].Rooms}
          name="Rooms"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <div>
          <label>Rent</label>
          <input
            type={"checkbox"}
            placeholder="Rent"
            style={{ marginRight: "0.3rem" }}
            onChange={handleAdsFormChange}
          />
          <label>Sell</label>
          <input
            type={"checkbox"}
            placeholder="Sell"
            onChange={handleAdsFormChange}
          />
        </div>
        <button
          type="submit"
          style={{
            background: "green",
            height: "2.8rem",
            color: "white",
            fontWeight: "bold",
            letterSpacing: "1px",
            fontSize: "1rem"
          }}
          onClick={(e) => {
            e.preventDefault();
            e.target.textContent = "Sending...";
            setTimeout(() => {
              window.location.href = `/propertys/property/${adId}`;
            }, 1000);
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditObject;
