"use client";

import React from "react";
import { ImHome } from "react-icons/im";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Audio } from "react-loader-spinner";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";

const Objects = () => {
  const firestoreData = useSelector(getFirestoreData);

  if (!firestoreData || firestoreData.length === 0) {
    return (
      <div className="modern-loader-container">
        <div className="modern-spinner"></div>
        <p className="modern-loader-text">Loading properties...</p>
      </div>
    );
  }

  const visibleObjects = firestoreData.filter(
    obj => !["Vehicle", "Tours", "Taxi"].includes(obj.adType) && obj.paid && !obj.removed
  );

  return (
    <section style={{ maxWidth: "1200px", margin: "1.5rem auto 3rem auto", padding: "0 1rem", fontFamily: "'Poppins', sans-serif" }}>
      

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
                <Link href={`/propertys/property/${adId}`}>
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
                      {Rent === "Rent" ? `$${Price}/night` : `$${Price}`}
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
                  <Link href={`/propertys/property/${adId}`} style={{ flex: 1, textDecoration: "none" }}>
                    <button className="btn-contact">Contact</button>
                  </Link>
                  <Link href={`/propertys/property/${adId}`} style={{ flex: 1, textDecoration: "none" }}>
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