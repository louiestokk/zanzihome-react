import React, { useState, useRef, useEffect } from "react";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
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
  const [percent, setPercent] = useState(0);
  const [loading, setloading] = useState(false);
  const firestoreData = useSelector(getFirestoreData);
  const form = useRef();
  const classes = useStyles();
  const { adId } = useParams();
  const [upDated, setupDated] = useState(false);
  const [currentObject, setcurrentOject] = useState(
    firestoreData?.filter((el) => el.adId === Number(adId))
  );
  const [imagesArray, setimagesArray] = useState(
    currentObject?.[0]?.imagesArray
      ? [...currentObject[0].imagesArray]
      : [currentObject[0]?.uri]
  );
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
      await updateDoc(object, {
        [e.target.name]: e.target.value
      });
      console.log("updated");
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    setloading(true);
    event.preventDefault();
    const storageRef = ref(storage, `/files/${event.target.files[0]?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, event.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent);
        setloading(false);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          imagesArray.push(url);
        });
      }
    );
  };
  const uploadNewImages = async (e) => {
    e.preventDefault();
    try {
      const q = query(
        collection(db, "newAd"),
        where("adId", "==", Number(adId))
      );
      const querySnapshot = await getDocs(q);
      let docId = "";
      querySnapshot.forEach((doc) => (docId = doc.id));
      const object = doc(db, "newAd", docId);
      await updateDoc(object, {
        imagesArray: imagesArray
      });
      console.log("updated");
      setupDated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <section style={{ marginBottom: "1rem" }}>
        <h4 style={{ marginBottom: "0.5rem" }}>Add images</h4>
        <div className="edit-object-file">
          <input type={"file"} accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="edit-object-file">
          <input type={"file"} accept="image/*" onChange={handleImageChange} />
        </div>
        <div>
          <p style={{ margin: "0.5rem 0" }}>{percent} "% done"</p>
        </div>
      </section>
      <form className={classes.form} ref={form}>
        <h4>Edit ad: {adId}</h4>
        <label htmlFor="Name">Name</label>
        <input
          placeholder={currentObject?.[0]?.Name}
          name="Name"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <label htmlFor="Email">Email</label>
        <input
          placeholder={currentObject?.[0]?.Email}
          name="Email"
          type={"email"}
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <label htmlFor="Phone">Phone</label>
        <input
          placeholder={currentObject?.[0]?.Phone}
          name="Phone"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <label htmlFor="Area">Area</label>
        <input
          placeholder={currentObject?.[0]?.Area}
          name="Area"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <label htmlFor="Adress">Address</label>
        <input
          placeholder={currentObject?.[0]?.Adress}
          name="Adress"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <label htmlFor="Title">Title</label>
        <input
          placeholder={currentObject?.[0]?.Title}
          name="Title"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <label htmlFor="Text">Description</label>
        <input
          placeholder={currentObject?.[0]?.Text}
          name="Text"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <label htmlFor="Price">Price</label>
        <input
          placeholder={`${currentObject?.[0]?.Price}$`}
          name="Price"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <label htmlFor="Size">Size(sqm)</label>
        <input
          placeholder={`${currentObject?.[0]?.Size}.sqm`}
          name="Size"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <label htmlFor="Rooms">Rooms</label>
        <input
          placeholder={currentObject?.[0]?.Rooms}
          name="Rooms"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <label htmlFor="lat">Latitude</label>
        <input
          placeholder={
            currentObject?.[0]?.lat != null
              ? currentObject?.[0]?.lat != null
              : "latitude"
          }
          name="lat"
          className={classes.input}
          onChange={handleAdsFormChange}
        />
        <label htmlFor="lng">Longitude</label>
        <input
          placeholder={
            currentObject?.[0]?.lng != null
              ? currentObject?.[0]?.lng != null
              : "longitude"
          }
          name="lng"
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
            uploadNewImages(e);
            // setTimeout(() => {
            //   window.location.href = `/propertys/property/${adId}`;
            // }, 1000);
          }}
        >
          {upDated ? "Updated" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EditObject;
