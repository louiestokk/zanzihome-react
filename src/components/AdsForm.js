import React, { useState, useRef } from "react";
import { useFormContext } from "../form_ads_context";
import { RiAdvertisementFill } from "react-icons/ri";
import emailjs from "@emailjs/browser";
import { villages } from "../utils/data";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../context";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import SendImages from "./SendImages";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
const AdsForm = ({ setActiveStep, adType }) => {
  const { company, sell, handleChange, setPrice, adId } = useFormContext();
  const [accept, setAccept] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setformData] = useState("");
  const [open, setOpen] = useState(false);
  const [adsFormData, setadsFormData] = useState({
    Name: "",
    Email: "",
    Phone: null,
    Sell: null,
    Area: "",
    Adress: "",
    Rent: null,
    category: adType === "Vehicle" ? "Car" : "House",
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
    paid: true,
    adType: adType,
    Gear: "Automatic",
    Doors: "",
    tourTime: "",
    People: "",
    AC: null,
    WhatsApp: null
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
            setActiveStep(2);
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
  const handleAccept = () => {
    setAccept(!accept);
    if (adsFormData.Name === "" && adsFormData.Phone === null) {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
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
          <h3 style={{ marginLeft: "1rem", marginBottom: "1.5rem" }}>
            {adType} in Zanzibar
          </h3>
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
          <div className="form-control">
            <label htmlFor="WhatsApp">WhatsApp</label>
            <input
              type="text"
              name="WhatsApp"
              required
              onChange={handleAdsFormChange}
            />
          </div>
          {(adType === "Properties" || adType === "Vehicle") && (
            <div className="form-control form-select-category">
              <p>Category</p>
              <select name="category" onChange={handleAdsFormChange}>
                {adType === "Properties" && (
                  <>
                    <option value="House">House</option>
                    <option value="Hand">Plot</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Business">Businesss</option>
                  </>
                )}
                {adType === "Vehicle" && (
                  <>
                    <option value="Car">Car</option>
                    <option value="Motorcycle">Motorbike</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Bicycle">Bicycle</option>
                  </>
                )}
              </select>
            </div>
          )}

          <div className="form-control">
            <label htmlFor="Area">Area</label>
            <select name="Area" onChange={handleAdsFormChange}>
              <option value="choose">-Select area-</option>
              {villages.map((el, i) => (
                <option key={i} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
          {adType === "Properties" && (
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
          )}
          {adType === "Vehicle" && (
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
          )}
          {adType === "Vehicle" && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <label htmlFor="AC">Aircondition?</label>
              <section
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <p style={{ marginRight: "0.3rem" }}>Yes</p>
                  <input
                    type="checkbox"
                    value="Yes"
                    name="AC"
                    id="checkad"
                    onClick={handleAdsFormChange}
                    onChange={handleAdsFormChange}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ marginRight: "0.3rem" }}>No</p>
                  <input
                    type="checkbox"
                    value="No"
                    name="AC"
                    id="checkad"
                    onClick={handleAdsFormChange}
                    onChange={handleAdsFormChange}
                  />
                </div>
              </section>
            </div>
          )}
          {adType === "Vehicle" && (
            <div className="form-control">
              <label htmlFor="Gear">Gear</label>
              <select name="Gear" onChange={handleAdsFormChange}>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          )}

          {adType === "Vehicle" && (
            <div className="form-control">
              <label htmlFor="Doors">Doors</label>
              <input
                type="text"
                placeholder="How many doors?"
                name="Doors"
                onChange={handleAdsFormChange}
              />
            </div>
          )}
          {adType === "Vehicle" && (
            <div className="form-control">
              <label htmlFor="People">How many people?</label>
              <input
                type="text"
                placeholder="The car holds how many?"
                name="People"
                onChange={handleAdsFormChange}
              />
            </div>
          )}
          {adType === "Properties" && (
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
          )}
          {adType === "Properties" && (
            <div className="form-control">
              <label htmlFor="Area">Rooms</label>
              <input
                type="text"
                name="Rooms"
                placeholder="how many rooms?"
                onChange={handleAdsFormChange}
              />
            </div>
          )}

          <div className="form-control">
            <h2
              style={{
                marginTop: "1rem",
                fontWeight: "100"
              }}
            >
              Ad content
            </h2>
            <label htmlFor="Title">
              {adType === "Vehicle" ? "Vehicle model" : "Title"}
            </label>
            <input
              placeholder={adType === "Vehicle" ? "Example: Toyota Rav4" : ""}
              type="text"
              name="Title"
              onChange={handleAdsFormChange}
              required
            />

            {adType === "Tours" && (
              <>
                <label htmlFor="tourTime" style={{ marginTop: "1rem" }}>
                  How long does it last?
                </label>
                <input
                  type="text"
                  placeholder="Hours"
                  name="tourTime"
                  onChange={handleAdsFormChange}
                />
              </>
            )}
          </div>
          <div className="form-control">
            <label htmlFor="Text">Text / Info</label>
            <textarea
              placeholder="Describe little more please"
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
              <input type="checkbox" name="accept" onClick={handleAccept} />
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
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"You forgot to fill in important information!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Check that you have filled in your Name, Email and Phone number.
              Do you have WhatsApp? Please fill it in as well.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default AdsForm;
