import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { BsHeart } from "react-icons/bs";
import { BsMap } from "react-icons/bs";
import { Link } from "react-router-dom";
import Bid from "./Bid";

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
        } = object;
        return (
          <div className="singel-object-container" key={id}>
            <div className="singel-object-banner">
              <h5>Seller name</h5>
            </div>
            <div className="singel-object">
              <div className="single-object-img-container">
                <img src={`../.${url[index]}`} />
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
              <Bid bid={(bid, id, propertys)} />
              <div className="divider-singel-object"></div>
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
                        {to === "Rent" ? `${price}$ / week` : `${price}$`}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="singel-object-contact"></div>
          </div>
        );
      })}
    </>
  );
};

export default SingleObject;
