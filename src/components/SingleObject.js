import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import Bid from "./Bid";
import SingelObjectInfo from "./SingelObjectInfo";
import Brokers from "./Brokers";
import emailjs from "@emailjs/browser";
import { useUserContext } from "../user_context";
import { useSelector, useDispatch } from "react-redux";
import { selectedObject } from "../redux/actions/objectsActions";

const SingleObject = () => {
  const { filtered } = useSelector((state) => state.filtered);
  console.log(filtered);
  const dispatch = useDispatch();
  const { allObjects } = useSelector((state) => state);
  const { object } = useSelector((state) => state);
  const { saved, setSaved, user, loginWithRedirect } = useUserContext();
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [randomId, setRandomId] = useState(Math.floor(Math.random() * 1000000));
  const [sending, setSending] = useState(false);
  const [recivied, setRecivied] = useState(false);
  const { id } = useParams();
  const form = useRef();

  const filterObject = () => {
    const newObject = allObjects.objects.filter((el) => el.id === +id);
    dispatch(selectedObject(newObject));
  };

  const nextImage = () => {
    const num = allObjects.objects.map((el) => el.url).length;
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

  useEffect(() => {
    filterObject();
  }, [id]);

  return (
    <>
      {object.objects.map((object) => {
        const {
          id,
          url,
          location,
          price,
          size,
          type,
          to,
          desc,
          info,
          rooms,
          bid,
          contact,
          agency,
          number,
          logo,
        } = object;

        return (
          <div className="singel-object-container" key={id}>
            <div className="singel-object">
              <div className="single-object-img-container">
                <img
                  src={url.includes("firebase") ? url[1] : `../.${url[index]}`}
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
                {url.length > 1 && (
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
                    if (user.nickname) {
                      e.currentTarget.children[0].classList.toggle(
                        "fill-hjarta"
                      );
                      e.currentTarget.style.background = "#dfe6d8";
                      setSaved(!saved);

                      localStorage.setItem("zanzihomeSaved", id);
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
                  {type} In {location}
                </h2>
                <p>{desc}</p>

                <button
                  onClick={() => setIndex(1)}
                  className="map-btn-singel-object"
                >
                  Se on map
                </button>
                <h4 className="singel-object-price">
                  {to === "Rent" ? `${price}$ / week` : `${price}.000$`}
                </h4>
              </div>
              <div className="bid-div">{bid && <Bid bid={bid} />}</div>

              <div className="divider-singel-object"></div>
              <div className="jjj">
                <div className="singel-object-fact">
                  <div className="col-1">
                    <div>
                      <ul className="ul-title">
                        <li>Housing Type</li>
                        <li>Size</li>
                        <li>{rooms && "Rooms"}</li>
                        <li>Price</li>
                      </ul>
                    </div>
                    <div>
                      <ul className="ul-besk">
                        <li>{type}</li>
                        <li>{size} sq.m</li>
                        <li>{rooms || ""}</li>
                        <li>
                          {to === "Rent" ? `${price}$ / week` : `${price}.000$`}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <SingelObjectInfo
                  info={info}
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
                      <input type="text" name="id" value={`${randomId}${id}`} />
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
                          width: "5rem",
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
                          width: "5rem",
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
                contact={contact}
                agency={agency}
                number={number}
                logo={logo}
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

export default SingleObject;
