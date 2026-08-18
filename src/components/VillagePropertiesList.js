"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ImHome } from "react-icons/im";
import { BsSquare, BsCompass } from "react-icons/bs";

const types = ["House", "Apartment", "Land", "Business"];

export default function VillagePropertiesList({ initialProperties, villageName }) {
  const [offerType, setOfferType] = useState("All"); // All, Sale, Rent
  const [propertyType, setPropertyType] = useState("All"); // All, House, Apartment, Land, Business

  // Helper to normalize strings for comparison
  const normalize = (str) => str?.toLowerCase().replace(/[-\s]/g, "") || "";
  const targetVillageNormalized = normalize(villageName);

  // 1. Filter by Village/Area (case-insensitive and robust against dash/spaces)
  const villageProperties = (initialProperties || []).filter((obj) => {
    const isProperty = !["Vehicle", "Tours", "Taxi"].includes(obj.adType);
    const isPaidAndActive = obj.paid && !obj.removed;
    const matchesArea = normalize(obj.Area) === targetVillageNormalized;
    return isProperty && isPaidAndActive && matchesArea;
  });

  // 2. Filter by UI Controls (Offer Type and Category)
  const filteredProperties = villageProperties.filter((obj) => {
    // Offer Type Filter (Rent vs Sale)
    if (offerType === "Sale") {
      if (obj.Rent === "Rent") return false;
    } else if (offerType === "Rent") {
      if (obj.Rent !== "Rent") return false;
    }

    // Property Type Filter
    if (propertyType !== "All") {
      const categoryNormalized = obj.category === "Hand" ? "Land" : obj.category;
      if (categoryNormalized !== propertyType) return false;
    }

    return true;
  });

  const resetFilters = () => {
    setOfferType("All");
    setPropertyType("All");
  };

  return (
    <div className="village-properties-section" style={{ marginTop: "40px" }}>
      {villageProperties.length > 0 ? (
        <>
          {/* Filters Wrapper */}
          <div className="area-filter-wrapper">
            <div className="area-filter-row">
              {/* Offer Type */}
              <div>
                <div className="filter-group-label">Offer Type</div>
                <div className="segmented-group">
                  <button
                    className={`segmented-btn ${offerType === "All" ? "active" : ""}`}
                    onClick={() => setOfferType("All")}
                  >
                    All Offers
                  </button>
                  <button
                    className={`segmented-btn ${offerType === "Sale" ? "active" : ""}`}
                    onClick={() => setOfferType("Sale")}
                  >
                    For Sale
                  </button>
                  <button
                    className={`segmented-btn ${offerType === "Rent" ? "active" : ""}`}
                    onClick={() => setOfferType("Rent")}
                  >
                    For Rent
                  </button>
                </div>
              </div>

              {/* Property Type */}
              <div>
                <div className="filter-group-label">Property Type</div>
                <div className="tags-group">
                  <button
                    className={`tag-btn ${propertyType === "All" ? "active" : ""}`}
                    onClick={() => setPropertyType("All")}
                  >
                    All Types
                  </button>
                  {types.map((t) => (
                    <button
                      key={t}
                      className={`tag-btn ${propertyType === t ? "active" : ""}`}
                      onClick={() => setPropertyType(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Info Row */}
          <div className="results-info-row" style={{ marginBottom: "20px" }}>
            <h2 className="results-count" style={{ fontSize: "20px", fontWeight: "700", color: "#013a17" }}>
              {filteredProperties.length === 1
                ? `1 Property Found in ${villageName}`
                : `${filteredProperties.length} Properties Found in ${villageName}`}
            </h2>
          </div>

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className="properties-grid">
              {filteredProperties.map((obj, i) => {
                const {
                  Area,
                  Rent,
                  category,
                  Title,
                  Price: priceVal,
                  Size,
                  Rooms,
                  adId,
                  uri,
                  imagesArray,
                  top3,
                  rocket3,
                } = obj;

                const imageUrl = uri || imagesArray?.[0] || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&h=250";
                const catDisplay = category === "Hand" ? "Land" : category;
                const isRent = Rent === "Rent";

                return (
                  <div key={`${adId || "property"}-${i}`} className="property-card">
                    {/* Image Block */}
                    <div className="card-img-container">
                      <Link href={`/propertys/property/${adId}`}>
                        <img
                          src={imageUrl}
                          alt={`Property in ${Area}, Zanzibar`}
                          title={`Property in ${Area}, Zanzibar`}
                          loading="lazy"
                          className="card-img"
                        />
                      </Link>

                      {/* Featured/Hot Badges */}
                      <div className="badge-container">
                        {top3 && <span className="badge-featured">⭐ Featured</span>}
                        {rocket3 && <span className="badge-hot">🔥 Hot</span>}
                      </div>

                      {/* Rent/Sale Badge */}
                      <span className="badge-offer-type">
                        {isRent ? "FOR RENT" : "FOR SALE"}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="card-body">
                      <div>
                        <div className="card-title-row">
                          <Link href={`/propertys/property/${adId}`} style={{ textDecoration: "none" }}>
                            <h3 className="card-title">
                              {Title || `${catDisplay} in ${Area}`}
                            </h3>
                          </Link>
                        </div>

                        <div className="card-category-indicator" style={{ color: Title === "SOLD" ? "#ff4d4f" : "#22c55e" }}>
                          {catDisplay === "House" || catDisplay === "Apartment" ? (
                            <ImHome />
                          ) : (
                            <BsSquare />
                          )}{" "}
                          <span style={{ fontSize: "13px", fontWeight: "600", textTransform: "capitalize" }}>
                            {Title === "SOLD" ? "SOLD" : catDisplay}
                          </span>
                        </div>

                        {/* Specs Row */}
                        <div className="card-specs-row">
                          <span className="spec-price">
                            {isRent ? `$${priceVal}/night` : `$${priceVal}`}
                          </span>
                          <div className="spec-item">
                            <BsCompass />
                            <span>{Size || "0"} sqm</span>
                          </div>
                          {Rooms && Rooms > 0 && (
                            <div className="spec-item">
                              <ImHome />
                              <span>{Rooms} {Rooms > 1 ? "Rooms" : "Room"}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="card-actions">
                        <Link href={`/propertys/property/${adId}`}>
                          <button className="card-btn-primary">Contact</button>
                        </Link>
                        <Link href={`/propertys/property/${adId}`}>
                          <button className="card-btn-secondary">Details</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty state when filtering results in 0 items */
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h3 className="empty-state-title">No listings match filters</h3>
              <p className="empty-state-desc">
                We couldn't find any properties matching your selected filters in {villageName} right now.
              </p>
              <button className="empty-state-btn" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          )}
        </>
      ) : (
        /* Empty state when no properties exist in database for this village */
        <div className="empty-state" style={{ padding: "50px 20px", background: "#ffffff", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)" }}>
          <div className="empty-state-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <h3 className="empty-state-title" style={{ color: "#013a17", fontSize: "22px", fontWeight: "700" }}>No properties in {villageName}</h3>
          <p className="empty-state-desc" style={{ color: "#4b5563", maxWidth: "500px", margin: "10px auto 25px auto", fontSize: "15px" }}>
            No active properties are listed for {villageName} in our database at the moment. We are constantly updating our database with new beachfront land, plots, and villas.
          </p>
          <Link href="/properties-zanzibar">
            <button className="empty-state-btn" style={{ background: "#22c55e", color: "#ffffff", border: "none", padding: "12px 24px", borderRadius: "30px", fontWeight: "600", cursor: "pointer", fontSize: "15px" }}>
              Explore All Properties
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
