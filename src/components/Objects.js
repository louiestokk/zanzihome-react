import React from "react";
import { ImHome } from "react-icons/im";
import { BsSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllObjects } from "../redux-toolkit/objects/objectSlice";

const Objects = () => {
  const allObjects = useSelector(getAllObjects);
  return (
    <>
      <h4 className="antal-objects">{allObjects?.length} properties</h4>
      <div className="objects-container">
        {allObjects?.map((object) => {
          const { id, url, location, price, size, type, to, desc } = object;

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
