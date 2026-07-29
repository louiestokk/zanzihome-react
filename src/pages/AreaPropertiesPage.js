import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { Helmet } from "react-helmet-async";
import { db } from "../firebase";
import { ImHome } from "react-icons/im";
import { BsSquare, BsCompass } from "react-icons/bs";
import { Audio } from "react-loader-spinner";

const types = ["House", "Apartment", "Land", "Business"];

const AreaPropertiesPage = () => {
  const { areaName } = useParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const queryParams = new URLSearchParams(window.location.search);
  const initialOffer = queryParams.get("offer") || "All";
  const initialType = queryParams.get("type") || "All";

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
    const fetchAds = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "newAd"));
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        
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
      } catch (err) {
        console.error("Error fetching area properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [areaName]);

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
      <Helmet>
        <title>{`Properties for Sale & Rent in ${formattedAreaName}, Zanzibar | ZanziHome`}</title>
        <meta
          name="description"
          content={`Browse beachfront villas, land plots, apartments and holiday homes in ${formattedAreaName}, Zanzibar. Find your next property or investment today.`}
        />
        <link rel="canonical" href={`https://www.zanzihome.com/properties/area/${areaName}`} />
        <meta property="og:url" content={`https://www.zanzihome.com/properties/area/${areaName}`} />
        <meta property="og:title" content={`Real Estate in ${formattedAreaName}, Zanzibar | ZanziHome`} />
        <meta
          property="og:description"
          content={`Explore property listings in ${formattedAreaName}. Filter by houses, plots, apartments for sale or rent.`}
        />
      </Helmet>

      {/* Styled-Components Style Tag */}
      <style>{`
        .area-page {
          font-family: 'Poppins', sans-serif;
          background: #fafbfa;
          min-height: 100vh;
          padding-bottom: 60px;
        }
        
        /* Hero Banner */
        .area-hero {
          background: linear-gradient(135deg, #013a17 0%, #0d2818 100%);
          color: #ffffff;
          padding: 60px 20px;
          text-align: center;
          position: relative;
        }
        .area-hero::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 24px;
          background: #fafbfa;
          clip-path: ellipse(60% 100% at 50% 100%);
        }
        .area-breadcrumbs {
          display: flex;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          color: #a3b899;
          margin-bottom: 12px;
        }
        .area-breadcrumbs a {
          color: #a3b899;
          text-decoration: none;
          transition: color 0.2s;
        }
        .area-breadcrumbs a:hover {
          color: #ffffff;
        }
        .area-hero-title {
          font-size: 38px;
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .area-hero-subtitle {
          font-size: 15px;
          color: #d1e2c9;
          max-width: 600px;
          margin: 10px auto 0 auto;
          font-weight: 300;
        }

        /* Container & Grid */
        .area-content-container {
          max-width: 1200px;
          margin: 30px auto 0 auto;
          padding: 0 16px;
        }

        /* Filter Controls */
        .area-filter-wrapper {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          border: 1px solid rgba(0,0,0,0.05);
          margin-bottom: 30px;
        }
        .area-filter-row {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .filter-group-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 700;
          color: #6b7280;
          margin-bottom: 8px;
        }

        /* Segmented Button Group (Offer Type) */
        .segmented-group {
          display: inline-flex;
          background: #f3f4f6;
          padding: 4px;
          border-radius: 30px;
          gap: 4px;
        }
        .segmented-btn {
          border: none;
          background: transparent;
          color: #4b5563;
          padding: 8px 20px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .segmented-btn.active {
          background: #013a17;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(1, 58, 23, 0.2);
        }

        /* Tag Group (Property Type) */
        .tags-group {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .tag-btn {
          border: 1px solid #e5e7eb;
          background: #ffffff;
          color: #374151;
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 500;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .tag-btn:hover {
          border-color: #013a17;
          color: #013a17;
        }
        .tag-btn.active {
          background: #e6ebe7;
          border-color: #013a17;
          color: #013a17;
          font-weight: 600;
        }

        /* Info Row */
        .results-info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding: 0 4px;
        }
        .results-count {
          font-size: 16px;
          font-weight: 600;
          color: #013a17;
          margin: 0;
        }

        /* Cards Grid */
        .properties-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        /* Listing Card */
        .property-card {
          position: relative;
          cursor: pointer;
          border-radius: 16px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.06);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .property-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 35px rgba(0,0,0,0.08);
          border-color: rgba(1, 58, 23, 0.15);
        }
        .card-img-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .property-card:hover .card-img {
          transform: scale(1.08);
        }

        /* Card Badges */
        .badge-container {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          gap: 6px;
          z-index: 2;
        }
        .badge-featured {
          background: #FFD700;
          color: #000;
          padding: 4px 8px;
          font-size: 11px;
          font-weight: 700;
          border-radius: 12px;
        }
        .badge-hot {
          background: #ff4d4f;
          color: #fff;
          padding: 4px 8px;
          font-size: 11px;
          font-weight: 700;
          border-radius: 12px;
        }
        .badge-offer-type {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(1, 58, 23, 0.9);
          color: #ffffff;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 600;
          border-radius: 12px;
          z-index: 2;
        }

        /* Card Content */
        .card-body {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .card-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }
        .card-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0;
          line-height: 1.4;
          transition: color 0.3s;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 44px;
        }
        .property-card:hover .card-title {
          color: #013a17;
        }

        .card-category-indicator {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        
        /* Specs / Features Grid */
        .card-specs-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 16px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #f3f4f6;
          font-size: 13px;
          color: #4b5563;
        }
        .spec-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .spec-price {
          font-size: 15px;
          font-weight: 700;
          color: #013a17;
        }

        /* Buttons container */
        .card-actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        .card-actions a {
          flex: 1;
          text-decoration: none;
        }
        .card-btn-primary {
          width: 100%;
          padding: 10px;
          background: #013a17;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
          transition: background 0.2s;
        }
        .card-btn-primary:hover {
          background: #0d2818;
        }
        .card-btn-secondary {
          width: 100%;
          padding: 10px;
          background: #ffffff;
          color: #013a17;
          border: 1px solid #013a17;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
          transition: all 0.2s;
        }
        .card-btn-secondary:hover {
          background: #e6ebe7;
        }

        /* Empty / No properties State */
        .empty-state {
          background: #ffffff;
          border-radius: 16px;
          padding: 50px 20px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          border: 1px solid rgba(0,0,0,0.05);
          max-width: 600px;
          margin: 40px auto;
        }
        .empty-state-icon {
          color: #a3b899;
          margin-bottom: 16px;
        }
        .empty-state-title {
          font-size: 20px;
          font-weight: 600;
          color: #013a17;
          margin: 0 0 8px 0;
        }
        .empty-state-desc {
          font-size: 14px;
          color: #6b7280;
          margin: 0 auto 20px auto;
          max-width: 400px;
        }
        .empty-state-btn {
          background: #013a17;
          color: #ffffff;
          border: none;
          padding: 10px 24px;
          font-weight: 600;
          border-radius: 30px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .empty-state-btn:hover {
          background: #0d2818;
        }

        /* Loading */
        .loading-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 50vh;
          gap: 16px;
          color: #013a17;
        }
        
        @media (min-width: 768px) {
          .area-hero {
            padding: 80px 20px;
          }
          .area-hero-title {
            font-size: 46px;
          }
          .area-filter-row {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
          }
          .area-filter-wrapper {
            padding: 30px;
          }
        }
      `}</style>

      {/* Hero Header */}
      <section className="area-hero">
        <div className="area-breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/properties-zanzibar">Properties</Link>
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
          <div className="loading-container">
            <Audio height="80" width="80" radius="9" color="#013a17" ariaLabel="loading" />
            <p style={{ fontWeight: "500" }}>Loading listings...</p>
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
                        <Link to={`/propertys/property/${adId}`}>
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
                            <Link to={`/propertys/property/${adId}`} style={{ textDecoration: "none" }}>
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
                              {isRent ? `$${priceVal}/month` : `$${priceVal}`}
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
                          <Link to={`/propertys/property/${adId}`}>
                            <button className="card-btn-primary">Contact</button>
                          </Link>
                          <Link to={`/propertys/property/${adId}`}>
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
    </main>
  );
};

export default AreaPropertiesPage;
