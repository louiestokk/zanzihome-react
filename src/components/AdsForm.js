import React, { useState, useRef } from "react";
import { useFormContext } from "../form_ads_context";
import { RiAdvertisementFill } from "react-icons/ri";
import emailjs from "@emailjs/browser";
import { BsFillCameraFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../context";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import SendImages from "./SendImages";

const AdsForm = ({ setActiveStep }) => {
  const { company, sell, handleChange, setPrice, adId } = useFormContext();
  const [accept, setAccept] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setformData] = useState("");
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
    lat: null,
    lng: null,
    paid: true
  });
  const form = useRef();
  const history = useHistory();
  const { myUser } = useGlobalContext();
  const sendEmail = (e) => {
    emailjs
      .sendForm(
        "service_thbibzh",
        "template_xn7q61k",
        form.current,
        process.env.REACT_APP_EMAILJS
      )
      .then(
        (result) => {
          console.log(result);
          if (result.text === "OK") {
            setLoading(false);
            setSended(true);
            setActiveStep(1);
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const handleAdsFormChange = (e) => {
    setadsFormData({ ...adsFormData, [e.target.name]: e.target.value });
  };
  const addNewAdToFirebase = async () => {
    sendEmail();
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "newAd"), adsFormData);
      console.log("Document written with ID: ", docRef.id);
      setLoading(false);
      setSended(true);
      setActiveStep(1);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <form
        className={sended ? "ad-form-in hidden" : "ad-form-in"}
        ref={form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="step-container">
          <div className="form-header">
            <h1>Place ad on ZanziHome</h1>
            <button
              type="button"
              className="cancel-form-btn"
              onClick={() => history.push("/")}
            >
              x
            </button>
          </div>
          <div
            className="form-div form-company"
            style={{ margin: "1.2rem 1rem" }}
          >
            <input
              type="checkbox"
              value="Privat"
              name="Privat"
              id="checkad"
              checked={company}
              onChange={handleChange}
            />
            <label htmlFor="Privat">Private</label>
            <input
              type="checkbox"
              value="Company"
              name="Company"
              id="checkad"
              checked={!company}
              onChange={handleChange}
            />
            <label htmlFor="Company">Company</label>
          </div>
          <div className="form-control">
            <label htmlFor="Name">{!company ? "Company name" : "Name"}</label>
            <input
              type="text"
              name="Name"
              required
              onChange={handleAdsFormChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="Email">E-mail</label>
            <input
              type="email"
              name="Email"
              required
              value={formData.email}
              placeholder="Email"
              onChange={handleAdsFormChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="Phone">Phone</label>
            <input
              type="text"
              name="Phone"
              required
              onChange={handleAdsFormChange}
            />
          </div>
          <h5>Ad</h5>
          <div
            className="form-div form-company"
            style={{ margin: "1.4rem 1rem" }}
          >
            <input
              type="checkbox"
              value="Sell"
              name="Sell"
              id="checkad"
              checked={sell}
              onClick={handleChange}
              onChange={handleAdsFormChange}
            />
            <label htmlFor="Sell">Sell</label>
            <input
              type="checkbox"
              value="Rent"
              name="Rent"
              id="checkad"
              checked={!sell}
              onClick={handleChange}
              onChange={handleAdsFormChange}
            />

            <label htmlFor="Rent">Rent out</label>
          </div>
          {/* <h5>Adons</h5> */}
          {/* <div
            className="form-div form-company"
            style={{ margin: "1.4rem 1rem" }}
          >
            <input
              type="checkbox"
              value={60}
              name="rocket3"
              onClick={() => setPrice(60)}
              onChange={handleAdsFormChange}
            />
            <label htmlFor="Sell">Listed top 3 $50</label>
            <input
              type="checkbox"
              value={35}
              name="rocket10"
              onClick={() => setPrice(35)}
              onChange={handleAdsFormChange}
            />
            <label htmlFor="Rent">Listed top 10 - $25</label>
          </div> */}
          {/* <div className="form-control form-select-category">
            <p>Ad package</p>
            <select name="package" onChange={packageChange}>
              {sell && <option value="Premium-50">Premium 60 days $50</option>}
              {sell && <option value="Plus-30">Plus 45 days $30</option>}
              {sell && <option value="Base-10">Base 30 days $10</option>}
              {!sell && <option value="Rent-50">Rent out 12 months $50</option>}
            </select>
          </div> */}
          <div className="form-control form-select-category">
            <p>Category</p>
            <select name="category" onChange={handleAdsFormChange}>
              <option value="House">House</option>
              <option value="Hand">Land / Plot</option>
              <option value="Apartment">Apartment</option>
              <option value="Business">Businesss</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="Area">Size</label>
            <input
              type="text"
              name="Size"
              placeholder="sqm"
              required
              onChange={handleAdsFormChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="Area">Rooms</label>
            <input
              type="text"
              name="Rooms"
              placeholder="how many rooms?"
              onChange={handleAdsFormChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="Area">Area</label>
            <input
              type="text"
              name="Area"
              placeholder="ex: Paje"
              required
              onChange={handleAdsFormChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="Adress">Adress / Street</label>
            <input
              type="text"
              name="Adress"
              placeholder="ex: exampleroad 22"
              onChange={handleAdsFormChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="Zip">Zip code</label>
            <input
              type="text"
              name="Zip"
              placeholder="ex: 71000"
              onChange={handleAdsFormChange}
            />
          </div>
          <div className="form-control">
            <h2
              style={{
                marginTop: "1rem",
                fontWeight: "100"
              }}
            >
              Ad content
            </h2>
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              name="Title"
              onChange={handleAdsFormChange}
              placeholder="ex: House for sale in Paje close by beach"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="Text">Text / Info</label>
            <textarea
              style={{ borderradius: "5px 5px" }}
              type="text"
              name="Text"
              rows="12"
              cols="60"
              onChange={handleAdsFormChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="Price">Price USD $</label>
            <input
              type="text"
              name="Price"
              required
              placeholder={
                adsFormData.Sell === null && adsFormData.Rent === null
                  ? "Total selling price"
                  : "Price per month"
              }
              onChange={handleAdsFormChange}
            />
          </div>

          <div className="form-control">
            <input
              type="text"
              name="adId"
              value={adId}
              style={{ display: "none" }}
            />
          </div>

          {!company && (
            <div className="form-control">
              <label htmlFor="About">About company</label>
              <textarea
                type="text"
                name="About"
                required
                rows="4"
                onChange={handleAdsFormChange}
              />
            </div>
          )}
        </div>

        <div style={{ marginLeft: "1rem", height: "360px", marginTop: "4rem" }}>
          {progress > 0 ? <h5> Uploaded {progress}%</h5> : <h5>Images</h5>}
          <div>
            <SendImages
              adsFormData={adsFormData}
              setadsFormData={setadsFormData}
            />
          </div>
          <div className="form-ad-btn-cont-sub">
            <div>
              <input
                type="checkbox"
                name="accept"
                onClick={() => setAccept(!accept)}
              />
              <label htmlFor="accept" style={{ marginLeft: "0.5rem" }}>
                I have checked that all information is correct
              </label>
            </div>

            <button
              type="submit"
              className="form-ad-btn-cont-sub-btn"
              disabled={accept}
              onClick={addNewAdToFirebase}
            >
              {loading ? "sending..." : "Place the ad"}
            </button>
          </div>
          <div className="lllll">
            <RiAdvertisementFill />
            <p style={{ marginLeft: "0.2rem" }}>
              Review all information and place the ad. After that your ad will
              be published. Then you can login and edit your ad like adding more
              images.
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdsForm;
