import React, { useState, useRef, useEffect } from "react";
import { useFormContext } from "../form_ads_context";
import { RiAdvertisementFill } from "react-icons/ri";
import emailjs from "@emailjs/browser";
import { BsFillCameraFill } from "react-icons/bs";
import { init } from "@emailjs/browser";
init("user_a9rRSeZcRVhTLpSYxEfo8");
const AdsForm = ({ setActiveStep, setAmount }) => {
  const [accept, setAccept] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(false);
  const form = useRef();
  const { company, sell, handleChange, price, setPrice } = useFormContext();

  const sendEmail = (e) => {
    setLoading(true);
    e.preventDefault();

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
            // här skall du ge kunden pop up att vi mottagit annonsen och att den skall granskas och publiceras inom 24h
            // göm sen form och visa betal
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
        onSubmit={sendEmail}
      >
        <div className="step-container">
          <div className="form-header">
            <h1>Place ad on Zanzihome</h1>
            <button type="button" className="cancel-form-btn">
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
            <input type="text" name="Name" required value={"Louie"} />
          </div>
          <div className="form-control">
            <label htmlFor="Email">E-mail</label>
            <input
              type="email"
              name="Email"
              value={"louiestokk@gmail.com"}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="Phone">Phone</label>
            <input type="text" name="Phone" value={"0317539060"} required />
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
              value="Paje"
              placeholder="ex: Jambiani"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="Adress">Adress / Street</label>
            <input
              type="text"
              name="Adress"
              value="Summer beach Paje"
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
              value="House for sale in paje on beach side"
              placeholder="ex: House for sale in Paje close by beach"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="Text">Text / Info</label>
            <textarea
              type="text"
              name="Text"
              required
              rows="12"
              cols="60"
              value="Nice house at the beach"
            />
          </div>
          <div className="form-control">
            <label htmlFor="Price">Price USD $</label>
            <input
              type="text"
              name="Price"
              placeholder="ex: $10.000"
              value="$100.000"
              required
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
          <div>
            <h5>Images</h5>
            <div>
              <BsFillCameraFill />
              <input type="file" />
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
