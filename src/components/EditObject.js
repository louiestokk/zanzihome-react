import React, { useState, useRef } from "react";
import { doc, addDoc, collection } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import SendImages from "./SendImages";
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
  const form = useRef();
  const classes = useStyles();
  const firestoreData = useSelector(getFirestoreData);
  const { adId } = useParams();
  const [loading, setLoading] = useState(false);
  const [adsFormData, setadsFormData] = useState({
    Name: "",
    Email: "",
    Phone: null,
    Sell: null,
    Area: "",
    Adress: "",
    Rent: null,
    top3: null,
    rocket3: null,
    rocket10: null,
    top10: null,
    category: "House",
    Zip: null,
    Title: "",
    Text: "",
    Price: "",
    adId: adId,
    About: "",
    Size: null,
    uri: "",
    Rooms: null,
    coords: [null, null]
  });
  const handleAdsFormChange = (e) => {
    setadsFormData({ ...adsFormData, [e.target.name]: e.target.value });
  };

  const addNewAdToFirebase = async (e) => {
    e.preventDefault();
    console.log(adsFormData);
    // setLoading(true);
    // try {
    //   const docRef = await addDoc(collection(db, "newAd"), adsFormData);
    //   console.log("Document written with ID: ", docRef.id);
    //   setLoading(false);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
  };
  //  jag kan ju här skicka helt nya data vilket är den vi redan har. men den vi har här lokalt ändrar jag just det objektet opch sen retunerar jag det nya objeltet
  return (
    <div className={classes.root}>
      <section>add more images</section>
      <form className={classes.form} ref={form}>
        <h4>Edit your ad content</h4>
        <input
          placeholder="Edit Name"
          name="Name"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <input
          placeholder="Edit Email"
          name="Email"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <input
          placeholder="Edit Phone"
          name="Phone"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <input
          placeholder=" Edit Area"
          name="Area"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <input
          placeholder="Edit Address"
          name="Adress"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <input
          placeholder="Edit Title"
          name="Title"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <input
          placeholder="Edit Text"
          name="Text"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <input
          placeholder="Edit Price"
          name="Price"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <input
          placeholder="Edit Size"
          name="Size"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <input
          placeholder="Edit Rooms"
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
          onClick={addNewAdToFirebase}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditObject;
