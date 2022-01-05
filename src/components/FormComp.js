import React, { useState, useRef } from "react";
import { useFormContext } from "../form_ads_context";
import { RiAdvertisementFill } from "react-icons/ri";
import emailjs from "@emailjs/browser";
import { useHisory, useHistory } from "react-router-dom";
// npm install emailjs-com --save

function FormComp() {
  const { company, sell, handleChange } = useFormContext();
  const [image, setImage] = useState();
  const [accept, setAccept] = useState(true);
  const [loading, setLoading] = useState(false);
  const form = useRef();
  const history = useHistory();
  const handleImageChange = (e) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      setImage(e.currentTarget.files[0]);
    }
  };
  const removeSelectedImage = () => {
    setImage();
  };
  const handleAccept = (e) => {
    setAccept(!accept);
  };
  const sendEmail = (e) => {
    setLoading(true);
    e.preventDefault();

    emailjs
      .sendForm(
        "service_9wx2s0e",
        "template_cj67o8s",
        form.current,
        "user_a9rRSeZcRVhTLpSYxEfo8"
      )
      .then(
        (result) => {
          if (result.text === "OK") {
            setLoading(false);
            history.push("/payment/newad");
          }
          // if(result.text === OK){betala här eller till ny sida där man betalar, redirect eller show modal payment}
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <form className="ad-form-in" ref={form} onSubmit={sendEmail}>
      <div className="form-header">
        <h1>Place ad on Zanzihome</h1>
        <button type="button" className="cancel-form-btn">
          Cancel
        </button>
      </div>
      <div className="form-div form-company" style={{ margin: "1.2rem 1rem" }}>
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
      <div className="form-div form-company" style={{ margin: "1.4rem 1rem" }}>
        <input
          type="checkbox"
          value="Sell"
          name="Sell"
          id="checkad"
          checked={sell}
          onChange={handleChange}
        />
        <label htmlFor="Sell">Sell</label>
        <input
          type="checkbox"
          value="Rent"
          name="Rent"
          id="checkad"
          checked={!sell}
          onChange={handleChange}
        />
        <label htmlFor="Rent">Rent out</label>
      </div>
      <div className="form-control form-select-category">
        <p>Ad package</p>
        <select name="package">
          {sell && <option value="Premium">Premium 60 days $100</option>}
          {sell && <option value="Plus">Plus 45 days $50</option>}
          {sell && <option value="Base">Base 30 days $10</option>}
          {!sell && <option value="Rent">Rent out 12 months $50</option>}
        </select>
      </div>
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
        <input type="text" name="Area" placeholder="ex: Jambiani" required />
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
        <input type="text" name="Zip" placeholder="ex: 71000" required />
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
        <textarea type="text" name="Text" required rows="12" cols="60" />
      </div>
      <div className="form-control">
        <label htmlFor="Price">Price USD $</label>
        <input type="text" name="Price" placeholder="ex: $10.000" required />
      </div>
      {!company && (
        <div className="form-control">
          <label htmlFor="About">About company</label>
          <textarea type="text" name="About" required rows="4" cols="6s0" />
        </div>
      )}
      {/* <h4 style={{ marginLeft: "1rem", FontWeigth: "bold", marginTop: "2rem" }}>
        Images
      </h4> */}
      {/* <div style={{ display: "flex", margin: "1rem 0" }}>
        <div>
          <p>Main 3 images</p>
          {image && (
            <img src={URL.createObjectURL(image)} className="uploaded-img" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            data-id="0"
            className="upload-img-inputs"
            name="File"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            data-id="0"
            className="upload-img-inputs"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            data-id="0"
            className="upload-img-inputs"
          />
        </div>
        <div>
          <p>Image Gallery</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            data-id="0"
            className="upload-img-inputs"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            data-id="0"
            className="upload-img-inputs"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            data-id="0"
            className="upload-img-inputs"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            data-id="0"
            className="upload-img-inputs"
          />
        </div>
      </div> */}
      <div
        className="new-ad-info-box"
        style={{ margin: "2rem 1rem", color: "green" }}
      >
        <p>* In next step you will send the images</p>
      </div>

      <div className="form-ad-btn-cont-sub">
        <div>
          <input
            type="checkbox"
            name="accept"
            onChange={(e) => handleAccept(e)}
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
          Review all information and then place your ad. In the next step, you
          will send the images and then pay for the ad. The ad will be reviewed
          and published within 24 hours. You will receive a notice by email.
        </p>
      </div>
    </form>
  );
}

export default FormComp;
