import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { BsHeart } from "react-icons/bs";
import { BsMap } from "react-icons/bs";
import { Link } from "react-router-dom";
import Bid from "./Bid";
import SingelObjectInfo from "./SingelObjectInfo";
import AdBanner from "./AdBanner";
import Brokers from "./Brokers";

const SingleObject = () => {
  const { propertys, setPropertys, index, setIndex } = useGlobalContext();
  const { id } = useParams();
  const filterObject = () => {
    const newObject = propertys.filter((el) => el.id === +id);
    setPropertys(newObject);
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
                  <button type="button" className="singel-img-left-arr">
                    <MdOutlineArrowBackIosNew />
                  </button>
                )}
                <button typ="button" className="singel-img-right-arr">
                  <MdOutlineArrowForwardIos />
                </button>
              </div>
              <div className="singel-object-heartmap">
                <button>
                  <BsHeart /> Save
                </button>
                <div>
                  <button onClick={() => setIndex(1)}>
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
            <div className="singel-banner">
              <AdBanner />
            </div>
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
