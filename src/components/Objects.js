import React, { useEffect } from "react";
import { ImHome } from "react-icons/im";
import { BsSquare } from "react-icons/bs";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

const Objects = () => {
  const { propertys, setPropertys } = useGlobalContext();
  return (
    <>
      <h4 className="antal-objects">{propertys.length} properties</h4>
      <div className="objects-container">
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
            info,
            icon,
          } = object;

          return (
            <div className="objects" key={id}>
              <img
                src={url.includes("firebase") ? url[1] : url[0]}
                alt={location}
              />
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
                  {type === "House" ? (
                    <ImHome style={{ color: "#22c55e" }} />
                  ) : (
                    <BsSquare
                      style={{ color: "#22c55e", background: "#22c55e" }}
                    />
                  )}{" "}
                  {desc}
                </p>
                <div className="objects-footer">
                  <span>
                    {to === "Rent" ? `$${price}/week` : `$${price}.000`}
                  </span>
                  <span>{size}sqm</span>
                  <span>{type}</span>
                </div>
              </div>
              <div className="objects-btn-container">
                <button type="button">Contact</button>
                <button type="button">
                  <Link
                    to={`/propertys/zanzibar/${id}`}
                    className="objects-link"
                  >
                    Read more
                  </Link>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Objects;
