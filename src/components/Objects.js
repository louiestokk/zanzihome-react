import React from "react";
import { ImHome } from "react-icons/im";
import { BsSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Audio } from "react-loader-spinner";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";

const Objects = () => {
  const firestoreData = useSelector(getFirestoreData);
  return (
    <>
      <h4 className="antal-objects">
        {firestoreData.filter((el) => !el.removed).length} properties
      </h4>
      {firestoreData.length <= 0 && (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
        />
      )}
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
              Rooms,
              paid,
              payerName,
              imagesArray,
              removed
            } = object;
            if (!paid) return;
            if (removed) return;
            return (
              <div key={index} className="objects">
                <Link to={`/propertys/property/${adId}`}>
                  <img
                    src={uri !== "" ? uri : imagesArray[1]}
                    alt={`Properties for sale in ${Area}, Zanzibar`}
                    title={`Properties for sale in ${Area}, Zanzibar`}
                    loading={"lazy"}
                  />
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
                  <p style={{ color: Title === "SOLD" && "red" }}>
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
                        : `$${Price}/month`}
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
