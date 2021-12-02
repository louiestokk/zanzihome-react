import React from "react";
import { objects } from "../utils/data";
import { BsHeart } from "react-icons/bs";

const Objects = () => {
  return (
    <div className="objects-container">
      {objects.map((object) => {
        const { id, date, url, location, price, size, type, to, desc, info } =
          object;
        return (
          <div key={id} className="objects">
            <img src={url[0]} alt={location} />
            <div className="heart-container">
              <BsHeart />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Objects;
