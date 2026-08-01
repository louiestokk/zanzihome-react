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
      <style>{`
        .modern-ad-form-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 20px 15px;
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
          width: 100%;
        }

        .ad-form-in {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
          align-items: start;
        }

        /* Override global index.css recursive margin-left shift bug */
        .ad-form-in div {
          margin-left: 0 !important;
        }

        @media (min-width: 992px) {
          .ad-form-in {
            grid-template-columns: 1.4fr 1fr;
          }
        }

        .ad-form-in.hidden {
          display: none;
        }

        .form-fields-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
        }

        .form-sidebar-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          box-sizing: border-box;
          width: 100%;
        }

        @media (min-width: 992px) {
          .form-sidebar-column {
            position: sticky;
            top: 20px;
          }
        }

        .form-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          box-sizing: border-box;
        }

        .form-card-title {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 20px 0;
          border-bottom: 1px solid #f3f4f6;
          padding-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-control-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        @media (min-width: 600px) {
          .form-control-row.split-2 {
            grid-template-columns: 1fr 1fr;
          }
        }

        .form-control-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
        }

        .form-control-item label {
          font-size: 13.5px;
          font-weight: 600;
          color: #374151;
        }

        .autocomplete-container {
          position: relative;
          width: 100%;
        }

        .autocomplete-container input[type="text"] {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af' stroke-width='2.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          background-size: 16px;
          padding-right: 40px !important;
        }

        .suggestions-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #ffffff;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          margin-top: 6px;
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          padding: 6px 0;
        }

        .suggestion-item {
          padding: 10px 14px;
          font-size: 14px;
          color: #374151;
          cursor: pointer;
          transition: background 0.15s;
          text-align: left;
        }

        .suggestion-item:hover {
          background: #f3f4f6;
          color: #0b8b3a;
          font-weight: 600;
        }

        .no-suggestions {
          padding: 10px 14px;
          font-size: 13.5px;
          color: #9ca3af;
          text-align: center;
        }

        .form-control-item input[type="text"],
        .form-control-item input[type="email"],
        .form-control-item select,
        .form-control-item textarea {
          width: 100%;
          height: 46px;
          border-radius: 10px;
          border: 1.5px solid #e5e7eb;
          padding: 8px 14px;
          font-size: 14.5px;
          font-family: 'Poppins', sans-serif;
          color: #1f2937;
          background-color: #ffffff;
          box-sizing: border-box;
          transition: all 0.2s ease;
          outline: none;
        }

        .form-control-item textarea {
          height: auto;
          resize: vertical;
          min-height: 100px;
        }

        .form-control-item input[type="text"]:focus,
        .form-control-item input[type="email"]:focus,
        .form-control-item select:focus,
        .form-control-item textarea:focus {
          border-color: #0b8b3a;
          box-shadow: 0 0 0 4px rgba(11, 139, 58, 0.08);
        }

        .form-control-item select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234b5563' stroke-width='2.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          background-size: 16px;
          padding-right: 40px;
        }

        .checkbox-group-wrapper {
          display: flex;
          align-items: center;
          gap: 24px;
          margin: 10px 0 20px 0;
          flex-wrap: wrap;
        }

        .checkbox-item-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .checkbox-item-wrapper input[type="checkbox"] {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          border: 1.5px solid #cbd5e1;
          cursor: pointer;
          accent-color: #0b8b3a;
        }

        .checkbox-item-wrapper label {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          margin: 0;
        }

        .form-header-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          border-bottom: 1.5px solid #e5e7eb;
          padding-bottom: 16px;
        }

        .form-header-box h1 {
          font-size: 24px;
          font-weight: 800;
          color: #111827;
          margin: 0;
        }

        .form-header-box .cancel-form-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f3f4f6;
          border: none;
          color: #4b5563;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .form-header-box .cancel-form-btn:hover {
          background: #e5e7eb;
          color: #111827;
        }

        .submit-section-box {
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-top: 1px solid #f3f4f6;
          padding-top: 20px;
          margin-top: 12px;
        }

        .submit-checkbox-wrapper {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .submit-checkbox-wrapper input[type="checkbox"] {
          margin-top: 3px;
          width: 18px;
          height: 18px;
          accent-color: #0b8b3a;
          cursor: pointer;
        }

        .submit-checkbox-wrapper label {
          font-size: 13.5px;
          font-weight: 500;
          color: #4b5563;
          line-height: 1.4;
          cursor: pointer;
        }

        .form-ad-btn-cont-sub-btn {
          width: 100%;
          height: 48px;
          background: #0b8b3a;
          color: #ffffff;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(11, 139, 58, 0.15);
        }

        .form-ad-btn-cont-sub-btn:hover:not(:disabled) {
          background: #013a17;
          box-shadow: 0 6px 16px rgba(1, 58, 23, 0.25);
          transform: translateY(-1px);
        }

        .form-ad-btn-cont-sub-btn:disabled {
          background: #cbd5e1;
          color: #94a3b8;
          box-shadow: none;
          cursor: not-allowed;
          opacity: 0.8;
        }

        .disclaimer-box {
          display: flex;
          gap: 10px;
          background: #f8fafc;
          border-radius: 12px;
          padding: 16px;
          border: 1px solid #f1f5f9;
        }

        .disclaimer-box svg {
          font-size: 20px;
          color: #0b8b3a;
          flex-shrink: 0;
        }

        .disclaimer-box p {
          margin: 0;
          font-size: 12.5px;
          color: #64748b;
          line-height: 1.5;
        }
      `}</style>

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
              onClick={() => history.push("/")}
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
