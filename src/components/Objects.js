import React from "react";
import { ImHome } from "react-icons/im";
import { BsSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllObjects } from "../redux-toolkit/objects/objectSlice";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";

const Objects = () => {
  const allObjects = useSelector(getAllObjects);
  const firestoreData = useSelector(getFirestoreData);
  return (
    <>
      <h4 className="antal-objects">{firestoreData?.length} properties</h4>
      {/* <div className="objects-container">
        {allObjects?.map((object) => {
          const { id, url, location, price, size, type, to, desc } = object;
          return (
            <div className="objects" key={id}>
              <Link to={`/propertys/zanzibar/${id}`}>
                <img
                  src={url.includes("firebase") ? url[1] : url[0]}
                  alt={location}
                  loading={"lazy"}
                />
              </Link>

              <div className="objects-footer-first">
                <div className="objects-logo">
                  <h3 className="object-location-text">{location}</h3>
                  <div className="logo">
                    <div className="logo-circle circlar">
                      <ImHome className="logo-icon ccc" />
                    </div>
                    <div
                      className="logo-text objectsreal-logo"
                      style={{ marginRight: "0.75rem" }}
                    >
                      <h4>ZanziHom</h4>
                      <p className="pp">e</p>
                    </div>
                  </div>
                </div>
                <p>
                  {type === "House" || type === "Apartment" ? (
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
                  <span style={{ opacity: "0.8" }}>
                    <p>{to}</p>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </div>
              </div>
              <div className="objects-btn-container">
                <Link to={`/propertys/zanzibar/${id}`}>
                  <button type="button">Contact</button>
                </Link>
                <Link to={`/propertys/zanzibar/${id}`}>
                  <button type="button">Info</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div> */}
      <div className="objects-container">
        {firestoreData &&
          firestoreData?.map((object, index) => {
            const {
              Name,
              Email,
              Phone,
              Sell,
              Area,
              Adress,
              Rent,
              top3,
              rocket3,
              rocket10,
              top10,
              category,
              Zip,
              Title,
              Text,
              Price,
              adId,
              About,
              Size,
              uri,
              Rooms
            } = object;

            return (
              <div key={index} className="objects">
                <Link to={`/propertys/property/${adId}`}>
                  <img src={uri && uri} alt={Adress} loading={"lazy"} />
                </Link>
                <div className="objects-footer-first">
                  <div className="objects-logo">
                    <h3 className="object-location-text">{Area}</h3>
                    <div className="logo">
                      <div className="logo-circle circlar">
                        <ImHome className="logo-icon ccc" />
                      </div>
                      <div
                        className="logo-text objectsreal-logo"
                        style={{ marginRight: "0.75rem" }}
                      >
                        <h4>ZanziHom</h4>
                        <p className="pp">e</p>
                      </div>
                    </div>
                  </div>
                  <p>
                    {category === "House" || category === "Apartment" ? (
                      <ImHome style={{ color: "#22c55e" }} />
                    ) : (
                      <BsSquare
                        style={{ color: "#22c55e", background: "#22c55e" }}
                      />
                    )}{" "}
                    {Title}
                  </p>
                  <div
                    className="objects-footer"
                    style={{ marginBottom: "1rem" }}
                  >
                    <span
                      style={{
                        letterSpacing: "2px",
                        marginRight: Rooms && "2rem"
                      }}
                    >
                      {Rent === null && Sell === null
                        ? `$${Price}.00`
                        : `$${Price}/week`}
                    </span>
                    <span
                      style={{
                        marginRight: Rooms && "2rem"
                      }}
                    >
                      {Size}sqm
                    </span>
                    <span
                      style={{
                        marginRight: Rooms && "2rem"
                      }}
                    >
                      {category === "Hand" ? "Land" : category}
                    </span>
                    {Rooms && (
                      <div>
                        <p> {Rooms}</p>
                        <p>{Rooms > 1 ? "Rooms" : "Room"}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="objects-btn-container">
                  <Link to={`/propertys/property/${adId}`}>
                    <button type="button">Contact</button>
                  </Link>
                  <Link to={`/propertys/property/${adId}`}>
                    <button type="button">Info</button>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Objects;
