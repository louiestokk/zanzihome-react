import React, { useState, useRef } from "react";
import { useFormContext } from "../form_ads_context";
import { RiAdvertisementFill } from "react-icons/ri";
import emailjs from "@emailjs/browser";
import { BsFillCameraFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";

const AdsForm = ({ setActiveStep }) => {
  const [accept, setAccept] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(false);
  const [progress, setProgress] = useState(0);
  const form = useRef();
  const history = useHistory();
  const { company, sell, handleChange, setPrice, adId } = useFormContext();

  const sendEmail = (e) => {
    localStorage.setItem("zanzihomeAdId", adId);
    setLoading(true);

    emailjs
      .sendForm(
        "service_9wx2s0e",
        "template_cj67o8s",
        form.current,
        process.env.REACT_APP_EMAILJ_USER_ID
      )
      .then(
        (result) => {
          if (result.text === "OK") {
            setLoading(false);
            setSended(true);
            setActiveStep((old) => old + 1);
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <>
      <form
        className={sended ? "ad-form-in hidden" : "ad-form-in"}
        ref={form}
        onSubmit={(e) => {
          e.preventDefault();
          sendEmail();
        }}
      >
        <div className="step-container">
          <div className="form-header">
            <h1>Place ad on Zanzihome</h1>
            <button
              type="button"
              className="cancel-form-btn"
              onClick={() => history.push("/")}
            >
              Cancel
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
            <label htmlFor="Privat">Privat</label>
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
            <input type="text" name="Name" required />
          </div>
          <div className="form-control">
            <label htmlFor="Email">E-mail</label>
            <input type="email" name="Email" required />
          </div>
          <div className="form-control">
            <label htmlFor="Phone">Phone</label>
            <input type="text" name="Phone" required />
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
              onChange={handleChange}
            />
            <label htmlFor="Sell">Sell $50 1/2 year</label>
            <input
              type="checkbox"
              value="Rent"
              name="Rent"
              id="checkad"
              checked={!sell}
              onChange={handleChange}
            />

            <label htmlFor="Rent">Rent out $50 1 year</label>
          </div>
          <h5>Adons</h5>
          <div
            className="form-div form-company"
            style={{ margin: "1.4rem 1rem" }}
          >
            <input
              type="checkbox"
              value={100}
              name="rocket3"
              onClick={() => setPrice(150)}
            />
            <label htmlFor="Sell">Rocket 3 - $100</label>
            <input
              type="checkbox"
              value={50}
              name="rocket10"
              onClick={() => setPrice(100)}
            />
            <label htmlFor="Rent">Rocket 10 - $50</label>
          </div>
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
            <select name="category">
              <option value="house">House</option>
              <option value="land">Land / Plot</option>
              <option value="apartment">Apartment</option>
              <option value="business">Businesss</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="Area">Area</label>
            <input
              type="text"
              name="Area"
              placeholder="ex: Jambiani"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="Adress">Adress / Street</label>
            <input
              type="text"
              name="Adress"
              placeholder="ex: exampleroad 22"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="Zip">Zip code</label>
            <input type="text" name="Zip" placeholder="ex: 71000" />
          </div>
          <div className="form-control">
            <h2
              style={{
                marginTop: "1rem",
                fontWeight: "100",
              }}
            >
              Ad content
            </h2>
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              name="Title"
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
              required
              rows="12"
              cols="60"
            />
          </div>
          <div className="form-control">
            <label htmlFor="Price">Price USD $</label>
            <input type="text" name="Price" required />
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
              <textarea type="text" name="About" required rows="4" cols="6s0" />
            </div>
          )}
        </div>

        <div style={{ marginLeft: "1rem", height: "360px", marginTop: "4rem" }}>
          {progress > 0 ? <h5> Uploaded {progress}%</h5> : <h5>Images</h5>}
          <div style={{ display: "flex" }}>
            <div className="up-image">
              <BsFillCameraFill />
              <input
                type="file"
                style={{
                  fontSize: "0.6rem",
                  marginTop: "0.5rem",
                  width: "4rem",
                }}
              />
            </div>
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
            >
              {loading ? "sending..." : "Place the ad"}
            </button>
            {/* prevent default and check the Formdata object */}
          </div>
          <div className="lllll">
            <RiAdvertisementFill />
            <p style={{ marginLeft: "0.2rem" }}>
              Review all information , send the images and then pay for the ad.
              The ad will be reviewed and published within 24 hours. You will
              receive a notice by email.
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdsForm;
