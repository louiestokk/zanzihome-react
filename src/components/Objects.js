import React from "react";
import { ImHome } from "react-icons/im";
import { BsSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Audio } from "react-loader-spinner";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";

const Objects = () => {
  const firestoreData = useSelector(getFirestoreData);

  if (!firestoreData || firestoreData.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}>
        <Audio height="80" width="80" radius="9" color="green" ariaLabel="loading" />
      </div>
    );
  }

  const visibleObjects = firestoreData.filter(
    obj => !["Vehicle", "Tours", "Taxi"].includes(obj.adType) && obj.paid && !obj.removed
  );

  return (
    <section style={{ maxWidth: "1200px", margin: "2rem auto", padding: "0 1rem" }}>
      <h4 style={{ marginBottom: "1rem", fontWeight: "600", color: "#013a17" }}>
        {visibleObjects.length+25} properties
      </h4>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem"
      }}>
        {visibleObjects.map((obj, index) => {
          const {
            Name,
            Area,
            Sell,
            Rent,
            category,
            Title,
            Price,
            Size,
            Rooms,
            adId,
            uri,
            imagesArray,
            top3,
            rocket3
          } = obj;

          const imageUrl = uri || imagesArray?.[0];

          return (
            <div key={index} style={{
              position: "relative",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              transition: "0.3s",
              background: "#fff",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              height: "100%"
            }}>
              {/* IMAGE */}
              <Link to={`/propertys/property/${adId}`}>
                <img
                  src={imageUrl}
                  alt={`Property in ${Area}, Zanzibar`}
                  title={`Property in ${Area}, Zanzibar`}
                  loading="lazy"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              </Link>

              {/* BADGES */}
              <div style={{ position: "absolute", top: "8px", left: "8px", display: "flex", gap: "5px" }}>
                {top3 && (
                  <span style={{ background: "#FFD700", color: "#000", padding: "3px 6px", borderRadius: "4px", fontSize: "12px", fontWeight: "600" }}>
                    ⭐ Featured
                  </span>
                )}
                {rocket3 && (
                  <span style={{ background: "#ff4d4f", color: "#fff", padding: "3px 6px", borderRadius: "4px", fontSize: "12px" }}>
                    🔥 Hot
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div style={{ padding: "1rem", flex: "1", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontSize: "1.1rem", color: "#013a17", margin: 0 }}>{Area}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#013a17", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <ImHome style={{ color: "#fff" }} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: "0.8rem", fontWeight: "600" }}>ZanziHome</h4>
    
                      </div>
                    </div>
                  </div>

                  <p style={{ margin: "0.25rem 0", lineHeight: "20px", fontWeight: "600", color: Title === "SOLD" ? "red" : "#013a17" }}>
                    {category === "House" || category === "Apartment" ? <ImHome style={{ color: "#22c55e" }} /> : <BsSquare style={{ color: "#22c55e" }} />}{" "}
                    {Title}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "0.5rem", fontSize: "0.9rem", color: "#333" }}>
                    <span>{Rent === null && Sell === null ? `$${Price}.00` : `$${Price}/month`}</span>
                    <span>{Size} sqm</span>
                    <span>{category === "Hand" ? "Land" : category}</span>
                    {Rooms && <span>{Rooms} {Rooms > 1 ? "Rooms" : "Room"}</span>}
                  </div>
                </div>

                {/* BUTTONS */}
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                  <Link to={`/propertys/property/${adId}`}>
                    <button style={{ flex: 1, padding: "0.6rem", background: "#013a17", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "600" }}>Contact</button>
                  </Link>
                  <Link to={`/propertys/property/${adId}`}>
                    <button style={{ flex: 1, padding: "0.6rem", background: "#fff", border: "1px solid #013a17", color: "#013a17", borderRadius: "5px", cursor: "pointer", fontWeight: "600" }}>Info</button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Objects;