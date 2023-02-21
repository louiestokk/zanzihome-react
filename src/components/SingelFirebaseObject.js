import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import Bid from "./Bid";
import SingelObjectInfo from "./SingelObjectInfo";
import Brokers from "./Brokers";
import emailjs from "@emailjs/browser";
import { useUserContext } from "../user_context";
import { useSelector } from "react-redux";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";

const SingelFirebaseObject = () => {
  const location = useLocation();
  const firestoreData = useSelector(getFirestoreData);
  const { saved, setSaved, user, loginWithRedirect } = useUserContext();
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [randomId, setRandomId] = useState(Math.floor(Math.random() * 1000000));
  const [sending, setSending] = useState(false);
  const [recivied, setRecivied] = useState(false);
  const { adId } = useParams();
  const form = useRef();

  const nextImage = () => {
    const num = firestoreData.map((el) => el.url).length;
    setIndex(index + 1);
    if (index > num - 1) {
      setIndex(0);
    }
  };
  const prevImage = () => {
    setIndex(index - 1);
    if (index < 0) {
      setIndex(0);
    }
  };
  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);
    emailjs
      .sendForm(
        "service_9wx2s0e",
        "template_9kq3rcn",
        form.current,
        process.env.REACT_APP_EMAILJ_USER_ID
      )
      .then(
        (result) => {
          if (result.text === "OK") {
            setSending(false);
            setShowModal(false);
            setRecivied(true);
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      {firestoreData.map((object) => {
        const {
          Name,
          Email,
          Phone,
          Sell,
          Area,
          Adress,
          Rent,
          top3,
          rocket3,
          rocket10,
          top10,
          category,
          Zip,
          Title,
          Text,
          Price,
          adId,
          About,
          Size,
          uri
        } = object;
        if (!location.pathname.includes(adId)) return;
        return (
          <div className="singel-object-container" key={adId}>
            <div className="singel-object">
              <div className="single-object-img-container">
                <img
                  src={uri}
                  style={{ backgroundPosition: "cover", maxHeight: "500px" }}
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="singel-img-left-arr"
                    onClick={prevImage}
                  >
                    <MdOutlineArrowBackIosNew />
                  </button>
                )}
                {uri.length > 1 && (
                  <button
                    typ="button"
                    className="singel-img-right-arr"
                    onClick={nextImage}
                  >
                    <MdOutlineArrowForwardIos />
                  </button>
                )}
              </div>
              <div className={showLoginModal ? "not-loggedin-modal" : "hidden"}>
                <h3>Log in to save items</h3>
                <button
                  className="nav-login-container inte-inloggad-btn"
                  onClick={loginWithRedirect}
                >
                  <FiUser />
                  Login
                </button>
              </div>
              <div className="singel-object-heartmap">
                <button
                  onClick={(e) => {
                    if (user?.nickname) {
                      e.currentTarget.children[0].classList.toggle(
                        "fill-hjarta"
                      );
                      e.currentTarget.style.background = "#dfe6d8";
                      setSaved(!saved);

                      localStorage.setItem("zanzihomeSaved", adId);
                    } else {
                      e.currentTarget.textContent = "You have to login to save";
                    }
                  }}
                  // style={{ background: `${green ? "#dfe6d8" : ""}` }}
                >
                  <AiFillHeart className="hjarta" />
                  Save
                </button>
              </div>
              <div className="singel-object-info">
                <h2>
                  {category} In {Adress}
                </h2>
                <p>{Text}</p>

                <button
                  onClick={() => setIndex(1)}
                  className="map-btn-singel-object"
                >
                  Se on map
                </button>
                <h4 className="singel-object-price">
                  {Sell === null && Rent === null
                    ? `${Price}.00$`
                    : `${Price}$/week`}
                </h4>
              </div>
              {/* <div className="bid-div">{bid && <Bid bid={bid} />}</div> */}

              <div className="divider-singel-object"></div>
              <div className="jjj">
                <div className="singel-object-fact">
                  <div className="col-1">
                    <div>
                      <ul className="ul-title">
                        <li>Housing Type</li>
                        <li>Size</li>
                        <li>{"Rooms"}</li>
                        <li>Price</li>
                      </ul>
                    </div>
                    <div>
                      <ul className="ul-besk">
                        <li>{category}</li>
                        <li>{Size} sq.m</li>
                        <li>{"rooms"}</li>
                        <li>
                          {Sell === null && Rent === null
                            ? `${Price}.000$`
                            : `${Price}$/week`}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <SingelObjectInfo
                  info={Text}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  recivied={recivied}
                />
                {showModal && (
                  <form
                    className="interest-root"
                    ref={form}
                    onSubmit={sendEmail}
                  >
                    <div style={{ display: "none" }}>
                      <label htmlFor="id">Object:</label>
                      <input
                        type="text"
                        name="id"
                        value={`${randomId}${adId}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="name">Name: </label>
                      <input name="name" type="text" required />
                    </div>
                    <div>
                      <label htmlFor="email">Email: </label>
                      <input name="email" type="email" required />
                    </div>
                    <div>
                      <label htmlFor="phone">Phone: </label>
                      <input name="phone" type="text" required />
                    </div>
                    <div>
                      <label htmlFor="commentInterest">Decsribe</label>
                      <textarea
                        name="commentInterest"
                        cols={20}
                        rows={4}
                        required
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="soitbt-2"
                        style={{
                          padding: "0.3rem",
                          cursor: "pointer",
                          width: "5rem"
                        }}
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="soitbt-1"
                        style={{
                          padding: "0.3rem",
                          cursor: "pointer",
                          width: "5rem"
                        }}
                      >
                        {sending ? "...sending" : "Send"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            <div className="divider-singel-object"></div>
            {/* <div className="singel-banner">
              <AdBanner />
            </div> */}
            <div className="broker-contact-div">
              <Brokers
                contact={Name}
                agency={Name}
                number={Phone}
                // logo={"logo"}
                email={Email}
              />
            </div>

            {/* <h5 className="sameoffice">For sale from the same office</h5> */}
            <div className="divider-singel-object"></div>
            <div className="brokers-divider"></div>
          </div>
        );
      })}
    </>
  );
};

export default SingelFirebaseObject;
