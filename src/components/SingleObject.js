import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { BsMap } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import Bid from "./Bid";
import SingelObjectInfo from "./SingelObjectInfo";
import Brokers from "./Brokers";
import { useUserContext } from "../user_context";
const items = [];
const SingleObject = () => {
  const { propertys, setPropertys, savedItemsArray, setSavedItemsArray } =
    useGlobalContext();
  const { saved, setSaved, myUser, loginWithRedirect } = useUserContext();
  const [index, setIndex] = useState(0);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const { id } = useParams();
  const filterObject = () => {
    const newObject = propertys.filter((el) => el.id === +id);
    setPropertys(newObject);
  };

  const nextImage = () => {
    const num = propertys.map((el) => el.url).length;
    setIndex(index + 1);
    if (index > num - 1) {
      setIndex(0);
    }
  };
  const prevImage = () => {
    const num = propertys.map((el) => el.url).length;
    setIndex(index - 1);
    if (index < 0) {
      setIndex(0);
    }
  };

  useEffect(() => {
    filterObject();
  }, [id]);

  return (
    <>
      {propertys.map((object) => {
        const {
          id,
          date,
          url,
          location,
          price,
          size,
          type,
          to,
          desc,
          icon,
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
            <div className="singel-object-banner">
              <h5>{agency}</h5>
            </div>
            <div className="singel-object">
              <div className="single-object-img-container">
                <img
                  src={`../.${url[index]}`}
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
                  className="nav-login-container"
                  onClick={loginWithRedirect}
                  className="inte-inloggad-btn"
                >
                  <FiUser />
                  Login
                </button>
              </div>
              <div className="singel-object-heartmap">
                <button
                  onClick={(e) => {
                    if (myUser) {
                      e.currentTarget.children[0].classList.toggle(
                        "fill-hjarta"
                      );
                      e.currentTarget.style.background = "#dfe6d8";
                      setSaved(!saved);
                      items.push(Number(id));
                      setSavedItemsArray(items);
                    } else {
                      e.currentTarget.textContent = "You have to login to save";
                    }
                  }}
                  // style={{ background: `${green ? "#dfe6d8" : ""}` }}
                >
                  <AiFillHeart className="hjarta" />
                  Save
                </button>
                <div>
                  <button>
                    <BsMap /> Map
                  </button>
                </div>
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
                <SingelObjectInfo info={info} />
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

            <h5 className="sameoffice">For sale from the same office</h5>
            <div className="divider-singel-object"></div>
            <div className="brokers-divider"></div>
          </div>
        );
      })}
    </>
  );
};

export default SingleObject;
