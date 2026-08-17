"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import { ImHome } from "react-icons/im";
import { BsSquare, BsCompass } from "react-icons/bs";
import { Audio } from "react-loader-spinner";
import MatchRequestStepper from "../components/MatchRequestStepper";
import PartnerFeaturedSection from "../components/PartnerFeaturedSection";
import { useDispatch, useSelector } from "react-redux";
import { getRawFirestoreData, setFirestoreData } from "../redux-toolkit/firebaseDataSlice";

const types = ["House", "Apartment", "Land", "Business"];

const AreaPropertiesPage = ({ initialProperties }) => {
  const { areaName } = useParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const reduxData = useSelector(getRawFirestoreData) || [];
  const firestoreData = reduxData.length > 0 ? reduxData : (initialProperties || []);
  
  const searchParams = useSearchParams();
  const initialOffer = searchParams.get("offer") || "All";
  const initialType = searchParams.get("type") || "All";

  // Filtering States
  const [offerType, setOfferType] = useState(initialOffer); // All, Sale, Rent
  const [propertyType, setPropertyType] = useState(initialType); // All, House, Apartment, Land, Business

  // Convert area slug/param to readable name (e.g. "stone-town" to "Stone Town")
  const formatAreaName = (slug) => {
    if (!slug) return "";
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formattedAreaName = formatAreaName(areaName);

  // Fetch Firestore listings on mount
  useEffect(() => {
    const filterAndSet = (data) => {
      // Filter by area (case-insensitive and robust against dash/spaces)
      const normalize = (str) => str?.toLowerCase().replace(/[-\s]/g, "") || "";
      const targetAreaNormalized = normalize(areaName);
      
      const areaFiltered = data.filter((obj) => {
        const isProperty = !["Vehicle", "Tours", "Taxi"].includes(obj.adType);
        const isPaidAndActive = obj.paid && !obj.removed;
        const matchesArea = normalize(obj.Area) === targetAreaNormalized;
        return isProperty && isPaidAndActive && matchesArea;
      });

      setProperties(areaFiltered);
    };

    if (firestoreData.length > 0) {
      filterAndSet(firestoreData);
      setLoading(false);
      return;
    }

    const fetchAds = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/properties");
        if (!res.ok) throw new Error("API response error");
        const data = await res.json();
        dispatch(setFirestoreData(data));
        filterAndSet(data);
      } catch (err) {
        console.error("Error fetching area properties via API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [firestoreData, areaName, dispatch]);

  // Sync state with URL search parameters
  useEffect(() => {
    setOfferType(initialOffer);
    setPropertyType(initialType);
  }, [initialOffer, initialType]);

  // Apply UI Filters on fetched area listings
  const filteredProperties = properties.filter((obj) => {
    // 1. Filter by Offer Type (Sale vs Rent)
    if (offerType === "Sale") {
      if (obj.Rent === "Rent") return false;
    } else if (offerType === "Rent") {
      if (obj.Rent !== "Rent") return false;
    }

    // 2. Filter by Property Category
    if (propertyType !== "All") {
      // Normalize 'Hand' typo in DB to 'Land'
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
    <main className="area-page">
      

      {/* Styled-Components Style Tag */}
      

      {/* Hero Header */}
      <section className="area-hero">
        <div className="area-breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/properties-zanzibar">Properties</Link>
          <span>/</span>
          <span>{formattedAreaName}</span>
        </div>
        <h1 className="area-hero-title">Properties in {formattedAreaName}</h1>
        <p className="area-hero-subtitle">
          Explore rental listings, plots, villas and premium real estate investment opportunities in {formattedAreaName}, Zanzibar.
        </p>
      </section>

      <section className="area-content-container">
        {/* Loading Spinner */}
        {loading ? (
          <div className="modern-loader-container">
            <div className="modern-spinner"></div>
            <p className="modern-loader-text">Loading properties...</p>
          </div>
        ) : (
          <>
            {/* Filter Section */}
            <div className="area-filter-wrapper">
              <div className="area-filter-row">
                {/* Segmented control for Offer Type */}
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

                {/* Tag group for Property Type */}
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

            {/* Results Count & Action */}
            <div className="results-info-row">
              <h2 className="results-count">
                {filteredProperties.length === 1
                  ? "1 Property Found"
                  : `${filteredProperties.length} Properties Found`}
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
                    <div key={adId || i} className="property-card">
                      {/* Image block */}
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

                        {/* Top Badges */}
                        <div className="badge-container">
                          {top3 && <span className="badge-featured">⭐ Featured</span>}
                          {rocket3 && <span className="badge-hot">🔥 Hot</span>}
                        </div>

                        {/* Rent/Sale Badge */}
                        <span className="badge-offer-type">
                          {isRent ? "FOR RENT" : "FOR SALE"}
                        </span>
                      </div>

                      {/* Content details */}
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

                          {/* Features Specs */}
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

                        {/* Action buttons */}
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
              /* Beautiful Empty state */
              <div className="empty-state">
                <div className="empty-state-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <h3 className="empty-state-title">No listings found</h3>
                <p className="empty-state-desc">
                  We couldn't find any listings matching your current filter choices in {formattedAreaName} at the moment.
                </p>
                <button className="empty-state-btn" onClick={resetFilters}>
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <PartnerFeaturedSection />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px 40px 15px" }}>
        <MatchRequestStepper />
      </div>
    </main>
  );
};

export default AreaPropertiesPage;
