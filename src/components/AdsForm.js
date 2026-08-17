"use client";

import React, { useState, useRef } from "react";
import { useFormContext } from "../form_ads_context";
import { RiAdvertisementFill } from "react-icons/ri";
import emailjs from "@emailjs/browser";
import { villages } from "../utils/data";
import { useRouter } from "next/navigation";
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
const AdsForm = ({ setActiveStep, adType, onFormSubmit }) => {
  const { company, sell, handleChange, setPrice, adId } = useFormContext();
  const [accept, setAccept] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setformData] = useState("");
  const [open, setOpen] = useState(false);
  const [areaSearch, setAreaSearch] = useState("");
  const [showAreaSuggestions, setShowAreaSuggestions] = useState(false);
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
  const router = useRouter();
  const { myUser } = useGlobalContext();
  const sendEmail = (e) => {
    emailjs
      .sendForm(
        "service_thbibzh",
        "template_xn7q61k",
        form.current,
        process.env.NEXT_PUBLIC_REACT_APP_EMAILJS || process.env.REACT_APP_EMAILJS || "yP8LTloRH-vMrxS8b"
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
    setLoading(true);
    if (onFormSubmit) {
      try {
        await onFormSubmit(adsFormData);
      } catch (e) {
        console.error("Error submitting form: ", e);
        setLoading(false);
      }
    } else {
      sendEmail();
      try {
        const docRef = await addDoc(collection(db, "newAd"), adsFormData);
        console.log("Document written with ID: ", docRef.id);
        setLoading(false);
        setSended(true);
        setActiveStep(1);
      } catch (e) {
        console.error("Error adding document: ", e);
        setLoading(false);
      }
    }
  };
  const selectVillage = (villageName) => {
    setAreaSearch(villageName);
    setShowAreaSuggestions(false);
    handleAdsFormChange({ target: { name: "Area", value: villageName } });
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowAreaSuggestions(false);
    }, 200);
  };

  const filteredVillages = villages.filter((v) =>
    v.toLowerCase().includes(areaSearch.toLowerCase())
  );

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
    <div className="modern-ad-form-container">
      

      <form
        className={sended ? "ad-form-in hidden" : "ad-form-in"}
        ref={form}
        onSubmit={(e) => {
          e.preventDefault();
          addNewAdToFirebase();
        }}
      >
        {/* Left Column: Form Fields */}
        <div className="form-fields-column">
          
          <div className="form-header-box">
            <h1>Place ad on ZanziHome</h1>
            <button
              type="button"
              className="cancel-form-btn"
              onClick={() => router.push("/")}
            >
              &times;
            </button>
          </div>

          <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", fontWeight: "700", color: "#013a17" }}>
            {adType} in Zanzibar
          </h3>

          {/* Publisher Profile Card */}
          <div className="form-card">
            <h4 className="form-card-title">Publisher Details</h4>
            
            <div className="checkbox-group-wrapper">
              <div className="checkbox-item-wrapper">
                <input
                  type="checkbox"
                  value="Privat"
                  name="Privat"
                  id="checkad_privat"
                  checked={company}
                  onChange={handleChange}
                />
                <label htmlFor="checkad_privat">Private</label>
              </div>
              <div className="checkbox-item-wrapper">
                <input
                  type="checkbox"
                  value="Company"
                  name="Company"
                  id="checkad_company"
                  checked={!company}
                  onChange={handleChange}
                />
                <label htmlFor="checkad_company">Company</label>
              </div>
            </div>

            <div className="form-control-row split-2">
              <div className="form-control-item">
                <label htmlFor="Name">{!company ? "Company name" : "Name"}</label>
                <input
                  type="text"
                  name="Name"
                  required
                  onChange={handleAdsFormChange}
                />
              </div>
              <div className="form-control-item">
                <label htmlFor="Email">E-mail</label>
                <input
                  type="email"
                  name="Email"
                  required
                  value={formData.email}
                  onChange={handleAdsFormChange}
                />
              </div>
            </div>

            <div className="form-control-row split-2">
              <div className="form-control-item">
                <label htmlFor="Phone">Phone</label>
                <input
                  type="text"
                  name="Phone"
                  required
                  onChange={handleAdsFormChange}
                />
              </div>
              <div className="form-control-item">
                <label htmlFor="WhatsApp">WhatsApp</label>
                <input
                  type="text"
                  name="WhatsApp"
                  required
                  onChange={handleAdsFormChange}
                />
              </div>
            </div>
          </div>

          {/* Property or Vehicle Specs Card */}
          <div className="form-card">
            <h4 className="form-card-title">Listing Specifications</h4>

            <div className="form-control-row split-2">
              {(adType === "Properties" || adType === "Vehicle") && (
                <div className="form-control-item">
                  <label htmlFor="category">Category</label>
                  <select name="category" onChange={handleAdsFormChange}>
                    {adType === "Properties" && (
                      <>
                        <option value="House">House</option>
                        <option value="Hand">Plot</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Business">Business</option>
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

              <div className="form-control-item">
                <label htmlFor="Area">Area</label>
                <div className="autocomplete-container">
                  <input
                    type="text"
                    name="Area"
                    placeholder="Search or select area..."
                    value={areaSearch}
                    required
                    onFocus={() => setShowAreaSuggestions(true)}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setAreaSearch(e.target.value);
                      setShowAreaSuggestions(true);
                      handleAdsFormChange(e);
                    }}
                    autoComplete="off"
                  />
                  {showAreaSuggestions && (
                    <div className="suggestions-dropdown">
                      {filteredVillages.length > 0 ? (
                        <>
                          {filteredVillages.map((village, idx) => (
                            <div
                              key={idx}
                              className="suggestion-item"
                              onMouseDown={() => selectVillage(village)}
                            >
                              {village}
                            </div>
                          ))}
                          {areaSearch && !villages.some(v => v.toLowerCase() === areaSearch.toLowerCase()) && (
                            <div
                              className="suggestion-item"
                              style={{ borderTop: "1px solid #f3f4f6", color: "#0b8b3a", fontWeight: "600" }}
                              onMouseDown={() => selectVillage(areaSearch)}
                            >
                              + Add custom area: "{areaSearch}"
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          {areaSearch ? (
                            <div
                              className="suggestion-item"
                              style={{ color: "#0b8b3a", fontWeight: "600" }}
                              onMouseDown={() => selectVillage(areaSearch)}
                            >
                              + Add custom area: "{areaSearch}"
                            </div>
                          ) : (
                            <div className="no-suggestions">No areas found</div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {(adType === "Properties" || adType === "Vehicle") && (
              <div className="checkbox-group-wrapper">
                <div className="checkbox-item-wrapper">
                  <input
                    type="checkbox"
                    value="Sell"
                    name="Sell"
                    id="checkad_sell"
                    checked={sell}
                    onClick={handleChange}
                    onChange={handleAdsFormChange}
                  />
                  <label htmlFor="checkad_sell">Sell</label>
                </div>
                <div className="checkbox-item-wrapper">
                  <input
                    type="checkbox"
                    value="Rent"
                    name="Rent"
                    id="checkad_rent"
                    checked={!sell}
                    onClick={handleChange}
                    onChange={handleAdsFormChange}
                  />
                  <label htmlFor="checkad_rent">Rent out</label>
                </div>
              </div>
            )}

            {adType === "Vehicle" && (
              <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "10px 0 20px 0" }}>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Aircondition?</span>
                <div className="checkbox-group-wrapper" style={{ margin: 0 }}>
                  <div className="checkbox-item-wrapper">
                    <input
                      type="checkbox"
                      value="Yes"
                      name="AC"
                      id="checkad_ac_yes"
                      onClick={handleAdsFormChange}
                      onChange={handleAdsFormChange}
                    />
                    <label htmlFor="checkad_ac_yes">Yes</label>
                  </div>
                  <div className="checkbox-item-wrapper">
                    <input
                      type="checkbox"
                      value="No"
                      name="AC"
                      id="checkad_ac_no"
                      onClick={handleAdsFormChange}
                      onChange={handleAdsFormChange}
                    />
                    <label htmlFor="checkad_ac_no">No</label>
                  </div>
                </div>
              </div>
            )}

            {adType === "Vehicle" && (
              <div className="form-control-row split-2">
                <div className="form-control-item">
                  <label htmlFor="Gear">Gear</label>
                  <select name="Gear" onChange={handleAdsFormChange}>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div className="form-control-item">
                  <label htmlFor="Doors">Doors</label>
                  <input
                    type="text"
                    placeholder="How many doors?"
                    name="Doors"
                    onChange={handleAdsFormChange}
                  />
                </div>
              </div>
            )}

            {adType === "Vehicle" && (
              <div className="form-control-row">
                <div className="form-control-item">
                  <label htmlFor="People">How many people?</label>
                  <input
                    type="text"
                    placeholder="The car holds how many?"
                    name="People"
                    onChange={handleAdsFormChange}
                  />
                </div>
              </div>
            )}

            {adType === "Properties" && (
              <div className="form-control-row split-2">
                <div className="form-control-item">
                  <label htmlFor="Size">Size (sqm)</label>
                  <input
                    type="text"
                    name="Size"
                    placeholder="sqm"
                    required
                    onChange={handleAdsFormChange}
                  />
                </div>
                <div className="form-control-item">
                  <label htmlFor="Rooms">Rooms</label>
                  <input
                    type="text"
                    name="Rooms"
                    placeholder="how many rooms?"
                    onChange={handleAdsFormChange}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Ad Content details */}
          <div className="form-card">
            <h4 className="form-card-title">Ad Content</h4>

            <div className="form-control-row">
              <div className="form-control-item">
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
              </div>
            </div>

            {adType === "Tours" && (
              <div className="form-control-row">
                <div className="form-control-item">
                  <label htmlFor="tourTime">
                    How long does it last?
                  </label>
                  <input
                    type="text"
                    placeholder="Hours"
                    name="tourTime"
                    onChange={handleAdsFormChange}
                  />
                </div>
              </div>
            )}

            <div className="form-control-row">
              <div className="form-control-item">
                <label htmlFor="Text">Text / Info</label>
                <textarea
                  placeholder="Describe little more please"
                  name="Text"
                  rows="10"
                  required
                  onChange={handleAdsFormChange}
                />
              </div>
            </div>

            <div className="form-control-row">
              <div className="form-control-item">
                <label htmlFor="Price">Price USD $</label>
                <input
                  type="text"
                  name="Price"
                  placeholder={!sell ? "Enter price per day" : ""}
                  required
                  onChange={handleAdsFormChange}
                />
              </div>
            </div>

            {/* Hidden adId field */}
            <input
              type="text"
              name="adId"
              value={adId}
              style={{ display: "none" }}
            />

            {!company && (
              <div className="form-control-row" style={{ marginTop: "16px" }}>
                <div className="form-control-item">
                  <label htmlFor="About">About company</label>
                  <textarea
                    name="About"
                    required
                    rows="4"
                    onChange={handleAdsFormChange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Upload & Publication Controls */}
        <div className="form-sidebar-column">
          {progress > 0 ? (
            <h5 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: "700", color: "#111827" }}>
              Uploaded {progress}%
            </h5>
          ) : (
            <h5 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: "700", color: "#111827" }}>
              Images
            </h5>
          )}
          
          <div style={{ marginBottom: "10px" }}>
            <SendImages
              adsFormData={adsFormData}
              setadsFormData={setadsFormData}
            />
          </div>

          <div className="submit-section-box">
            <div className="submit-checkbox-wrapper">
              <input
                type="checkbox"
                name="accept"
                id="accept-checkbox"
                onClick={handleAccept}
              />
              <label htmlFor="accept-checkbox">
                I have checked that all information is correct
              </label>
            </div>

            <button
              type="submit"
              className="form-ad-btn-cont-sub-btn"
              disabled={accept || loading}
            >
              {loading ? "sending request..." : "Place the ad"}
            </button>
          </div>

          <div className="disclaimer-box">
            <RiAdvertisementFill />
            <p>
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
            <Button onClick={handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default AdsForm;
