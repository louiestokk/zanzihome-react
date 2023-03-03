import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { MdOutlineArrowForwardIos, MdTurnedInNot } from "react-icons/md";
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
import CarouselComponent from "./Carousel";
let index = 0;
const SingelFirebaseObject = () => {
  const location = useLocation();
  const firestoreData = useSelector(getFirestoreData);
  const { saved, setSaved, user, loginWithRedirect } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [recivied, setRecivied] = useState(false);
  const nextImage = (imagesArray) => {};
  const prevImage = () => {};

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
          Rooms,
          uri,
          imagesArray
        } = object;
        if (!location.pathname.includes(adId)) return;
        console.log(imagesArray);
        return (
          <div className="singel-object-container" key={adId}>
            <div className="singel-object">
              <div className="single-object-img-container">
                {imagesArray && imagesArray.length > 1 ? (
                  <CarouselComponent imagesArray={imagesArray} uri={uri} />
                ) : (
                  <img
                    src={uri}
                    style={{
                      backgroundPosition: "center",
                      maxHeight: "500px",
                      objectFit: "cover",
                      maxWidth: "700px"
                    }}
                  />
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
                  style={{ color: "black" }}
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
                  {category} In {Area}
                </h2>
                <p>{Title}</p>

                <button onClick={() => {}} className="map-btn-singel-object">
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
                        <li>Type</li>
                        <li>Size</li>
                        <li>{"Rooms"}</li>
                        <li>Price</li>
                      </ul>
                    </div>
                    <div>
                      <ul className="ul-besk">
                        <li>{category}</li>
                        <li>{Size} sq.m</li>
                        <li>{Rooms && Rooms}</li>
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
              </div>
            </div>
            <div className="divider-singel-object"></div>
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
