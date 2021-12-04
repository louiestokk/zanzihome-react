import React from "react";
import { objects } from "../utils/data";
import { BsHeart } from "react-icons/bs";
import { ImHome } from "react-icons/im";

const Objects = () => {
  return (
    <>
      <div className="objects-container">
        {objects.map((object) => {
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
            info,
            icon,
          } = object;
          return (
            <div key={id} className="objects">
              <img src={url[0]} alt={location} />
              <div className="heart-container">
                <BsHeart />
              </div>
              <div className="objects-footer-first">
                <div className="objects-logo">
                  <h3 className="object-location-text">{location}</h3>
                  <div className="logo">
                    <div className="logo-circle circlar">
                      <ImHome className="logo-icon ccc" />
                    </div>
                    <div className="logo-text objectsreal-logo">
                      <h4>ZanziHom</h4>
                      <p className="pp">e</p>
                    </div>
                  </div>
                </div>
                <p>
                  {icon} {desc}
                </p>
                <div className="objects-footer">
                  <span>{price}.000$</span>
                  <span>{size}sqm</span>
                  <span>{type}</span>
                </div>
              </div>
              <div className="objects-btn-container">
                <button type="button">Contact</button>
                <button type="button">Read more</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Objects;
