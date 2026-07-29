import React from "react";
import { ImHome } from "react-icons/im";
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
    <section style={{ maxWidth: "1200px", margin: "1.5rem auto 3rem auto", padding: "0 1rem", fontFamily: "'Poppins', sans-serif" }}>
      <style>{`
        .object-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 28px;
        }

        .object-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
          background: #ffffff;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .object-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          border-color: rgba(1, 58, 23, 0.15);
        }

        /* Image Wrapper & Zoom */
        .object-img-wrapper {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .object-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .object-card:hover .object-img {
          transform: scale(1.05);
        }

        /* Transaction badge */
        .object-badge-transaction {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(1, 58, 23, 0.85);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 30px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          z-index: 2;
        }

        /* Card Content Area */
        .object-card-body {
          padding: 22px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .object-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .object-category-tag {
          font-size: 11px;
          font-weight: 700;
          color: #013a17;
          background: #e6ebe7;
          padding: 4px 10px;
          border-radius: 30px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .object-brand {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
        }

        .object-title {
          font-size: 17px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 10px 0;
          line-height: 1.4;
          transition: color 0.3s;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 48px;
        }

        .object-card:hover .object-title {
          color: #013a17;
        }

        /* Price Details */
        .object-price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .object-price {
          font-size: 19px;
          font-weight: 700;
          color: #013a17;
        }

        /* Specs details row */
        .object-specs {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12.5px;
          color: #4b5563;
          border-top: 1px solid #f3f4f6;
          padding-top: 12px;
          margin-top: auto;
        }

        .object-spec-item {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #6b7280;
        }

        /* Action buttons */
        .object-buttons {
          display: flex;
          gap: 10px;
          margin-top: 18px;
        }

        .btn-contact, .btn-info {
          width: 100%;
          padding: 10px 16px;
          font-size: 13.5px;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s;
          text-align: center;
          font-family: 'Poppins', sans-serif;
        }

        .btn-contact {
          background: #013a17;
          color: #ffffff;
          border: none;
          box-shadow: 0 4px 10px rgba(1, 58, 23, 0.15);
        }

        .btn-contact:hover {
          background: #0d2818;
          box-shadow: 0 6px 16px rgba(1, 58, 23, 0.25);
        }

        .btn-info {
          background: #ffffff;
          color: #013a17;
          border: 1px solid #013a17;
        }

        .btn-info:hover {
          background: #f0f4f1;
        }

        @media (max-width: 480px) {
          .object-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Counter Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "600", color: "#6b7280" }}>
          Showing <span style={{ color: "#013a17", fontWeight: "700" }}>{visibleObjects.length + 25}</span> properties in Zanzibar
        </h4>
      </div>

      {/* Grid of properties */}
      <div className="object-grid">
        {visibleObjects.map((obj, index) => {
          const {
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
            <div key={index} className="object-card">
              
              {/* IMAGE & BADGES */}
              <div className="object-img-wrapper">
                <Link to={`/propertys/property/${adId}`}>
                  <img
                    src={imageUrl}
                    alt={`Property in ${Area}, Zanzibar`}
                    title={`Property in ${Area}, Zanzibar`}
                    loading="lazy"
                    className="object-img"
                  />
                </Link>

                {/* Hot & Featured Badges */}
                <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", gap: "6px", zIndex: 2 }}>
                  {top3 && (
                    <span style={{ background: "#FFD700", color: "#000", padding: "4px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
                      ⭐ Featured
                    </span>
                  )}
                  {rocket3 && (
                    <span style={{ background: "#ff4d4f", color: "#fff", padding: "4px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
                      🔥 Hot
                    </span>
                  )}
                </div>

                {/* Transaction Tag */}
                <div className="object-badge-transaction">
                  {Rent === "Rent" ? "For Rent" : "For Sale"}
                </div>
              </div>

              {/* CARD DETAILS */}
              <div className="object-card-body">
                <div>
                  {/* Category and Brand */}
                  <div className="object-card-header">
                    <span className="object-category-tag">
                      {category === "Hand" ? "Land" : category}
                    </span>
                    <div className="object-brand">
                      <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#013a17", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <ImHome style={{ color: "#fff", fontSize: "11px" }} />
                      </div>
                      <span>ZanziHome</span>
                    </div>
                  </div>

                  {/* Property Name/Title */}
                  <h3 className="object-title" style={{ color: Title === "SOLD" ? "red" : "#111827" }}>
                    {Title}
                  </h3>

                  {/* Location Pin */}
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#6b7280", marginBottom: "14px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#013a17" }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{Area}, Zanzibar</span>
                  </div>

                  {/* Price */}
                  <div className="object-price-row">
                    <span className="object-price">
                      {Rent === null && Sell === null ? `$${Price}.00` : `$${Price}/month`}
                    </span>
                  </div>
                </div>

                {/* Specs Section */}
                <div className="object-specs">
                  {Size && (
                    <div className="object-spec-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#013a17" }}>
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                      <span>{Size} sqm</span>
                    </div>
                  )}
                  {Rooms && Rooms > 0 && (
                    <div className="object-spec-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#013a17" }}>
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      <span>{Rooms} {Rooms > 1 ? "Rooms" : "Room"}</span>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="object-buttons">
                  <Link to={`/propertys/property/${adId}`} style={{ flex: 1, textDecoration: "none" }}>
                    <button className="btn-contact">Contact</button>
                  </Link>
                  <Link to={`/propertys/property/${adId}`} style={{ flex: 1, textDecoration: "none" }}>
                    <button className="btn-info">Details</button>
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