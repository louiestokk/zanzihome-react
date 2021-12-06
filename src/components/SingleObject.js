import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { BsHeart } from "react-icons/bs";
import { BsMap } from "react-icons/bs";
import { Link } from "react-router-dom";

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
        } = object;
        return (
          <div className="singel-object-container" key={id}>
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
                <h4>{to === "Rent" ? `${price}$ / week` : `${price}.000$`}</h4>
                <h5>Monitor final price</h5>
              </div>
              <div className="singel-object-fact"></div>
            </div>
            <div className="singel-object-contact"></div>
          </div>
        );
      })}
    </>
  );
};

export default SingleObject;
