import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import SingelObjectInfo from "./SingelObjectInfo";
import Brokers from "./Brokers";
import { useUserContext } from "../user_context";
import { useSelector } from "react-redux";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import Karusell from "./Karusell";
import SingelPageMap from "./SingelPageMap";
import SingeldefaultMapMapPage from "./SingeldefaultMapMapPage";
import AdBanner from "./AdBanner";
import Abovefooter from "./Abovefooter";
import { Helmet } from "react-helmet-async";
import { pageData } from "../pages/guides/data";

const SingelFirebaseObject = () => {
  const location = useLocation();
  const firestoreData = useSelector(getFirestoreData);
  const { saved, setSaved, user, loginWithRedirect } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [recivied, setRecivied] = useState(false);
  const { adId } = useParams();

  const selectedObjects = firestoreData.filter((object) =>
    location.pathname.includes(object.adId)
  );

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1rem" }}>
      {selectedObjects.map((object) => {
        const {
          Name,
          Email,
          Phone,
          Sell,
          Rent,
          Area,
          category,
          Title,
          Text,
          Price,
          adId,
          Size,
          lat,
          lng,
          Rooms,
          uri,
          imagesArray,
        } = object;
        return (
          <div
            key={adId}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              overflow: "hidden",
              marginBottom: "2rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <Helmet>
              <title>{`${Title} in ${Area} - Zanzibar Properties`}</title>
              <meta
                name="description"
                content={`Buy or rent ${category} in ${Area}, Zanzibar. ${Text.slice(
                  0,
                  150
                )}...`}
              />
              <link rel="canonical" href={window.location.href} />
            </Helmet>

            {/* Image / Carousel */}
            <div style={{ position: "relative" }}>
              {imagesArray && imagesArray.length > 1 ? (
                <Karusell imagesArray={imagesArray} uri={uri} />
              ) : (
                <img
                  src={uri}
                  alt={`Property in ${Area}`}
                  title={`Property in ${Area}`}
                  style={{ width: "100%", height: "300px", objectFit: "cover" }}
                />
              )}
              {/* Heart Save Button */}
              <button
                onClick={(e) => {
                  if (user?.nickname) {
                    e.currentTarget.children[0].classList.toggle("fill-hjarta");
                    setSaved(!saved);
                    localStorage.setItem("zanzihomeSaved", adId);
                  } else {
                    e.currentTarget.textContent = "Login to save";
                  }
                }}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  display: "flex",
                  alignItems: "center",
                  background: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.5rem 0.75rem",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
              >
                <AiFillHeart
                  className="hjarta"
                  style={{ marginRight: "0.5rem", color: "#ef4444" }}
                />
                Save
              </button>
            </div>

            {/* Info Section */}
            <div style={{ padding: "1rem" }}>
              <h1 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>
                {category === "Hand" ? "Plot" : category} in {Area}
              </h1>
              <p style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#111827", marginBottom: "0.5rem" }}>
                {Title}
              </p>
              <button
                style={{
                  background: "#22c55e",
                  color: "white",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginBottom: "1rem",
                }}
              >
                See on map
              </button>
              <h3 style={{ fontSize: "1.5rem", color: "#16a34a" }}>
                {Sell === null && Rent === null ? `$${Price}.00` : `$${Price}/month`}
              </h3>
            </div>

            {/* Facts */}
            <div
              style={{
                display: "flex",
                borderTop: "1px solid #e5e7eb",
                borderBottom: "1px solid #e5e7eb",
                padding: "1rem",
                background: "#f9fafb",
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>Type</p>
                <p>{category === "Hand" ? "Land" : category}</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>Size</p>
                <p>{Size} m²</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>Rooms</p>
                <p>{Rooms}</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>Price</p>
                <p>{Sell === null && Rent === null ? `$${Price}.00` : `$${Price}/month`}</p>
              </div>
            </div>

            {/* Description */}
            <div style={{ padding: "1rem" }}>
              <SingelObjectInfo
                info={Text}
                showModal={showModal}
                setShowModal={setShowModal}
                recivied={recivied}
              />
            </div>

            {/* Brokers */}
            <div style={{ padding: "1rem" }}>
              <Brokers contact={Name} agency={Name} number={Phone} email={Email} />
            </div>
    <div style={{ background: "#ffeeba", padding: "1.5rem", textAlign: "center", margin: "2rem 0", borderRadius: "8px" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Sell or Rent Faster!</h2>
        <p style={{ marginBottom: "1rem" }}>Boost your property listing and get maximum visibility on ZanziHome.</p>
        <button onClick={() => window.location.href = "/contact"} style={{ padding: "0.8rem 1.5rem", background: "#013a17", color: "white", border: "none", borderRadius: "5px", fontWeight: "600", cursor: "pointer" }}>
          Boost Your Listing
        </button>
      </div>
            {/* Map */}
            <div style={{ padding: "1rem" }}>
              <SingelPageMap Area={Area} userCoords={[Number(lat), Number(lng)]} Title={Title} />
            </div>
          </div>
        );
      })}

      {/* Page Content */}
      <div style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Guide: Buy property in Zanzibar</h2>
        <img
          src="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg"
          alt="buy property in Zanzibar"
          style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "8px" }}
        />
        <p style={{ fontSize: "0.9rem", lineHeight: "1.6", marginTop: "0.3rem",marginBottom:'1rem' }}>
          {pageData.underImgText}
        </p>
        <a href="/buy-property-zanzibar" style={{direction:'none',color:'white'}}>
         <button
            style={{
              marginTop: "0.5rem",
              background: "#0b8b3a",
              color: "white",
              border: "none",
              padding: "0.8rem 1.6rem",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Read the guide
          </button>
        </a>
       
      </div>
      <Abovefooter />
    </div>
  );
};

export default SingelFirebaseObject;