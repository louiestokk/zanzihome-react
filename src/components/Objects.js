import React, { useEffect } from "react";
import { ImHome } from "react-icons/im";
import { useGlobalContext } from "../context";
import { useUserContext } from "../user_context";
import { Link } from "react-router-dom";
import { objects } from "../utils/data";
const Objects = () => {
  const { propertys, setPropertys } = useGlobalContext();
  const { saved, setSaved } = useUserContext();

  const change = () => {
    setPropertys(objects);
  };
  const setSavedLocal = (ident) => {
    localStorage.setItem("itemid", ident);
  };

  useEffect(() => {
    change();
  }, []);
  return (
    <>
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
              <img src={url[0]} alt={location} />
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
