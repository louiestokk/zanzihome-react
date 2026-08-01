import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { 
  FiArrowRight, 
  FiActivity, 
  FiCpu, 
  FiTrendingUp, 
  FiUsers, 
  FiMail, 
  FiPercent,
  FiMapPin,
  FiExternalLink
} from "react-icons/fi";

const AgencyPromoBanner = () => {
  const firestoreData = useSelector(getFirestoreData) || [];

  // Filter the first valid featured property
  const featuredProperty = firestoreData.find(
    (obj) => !["Vehicle", "Tours", "Taxi"].includes(obj.adType) && obj.paid && !obj.removed
  );

  // Fallback beautiful property if firebase has no paid listings in local dev
  const defaultProperty = {
    id: "374543975",
    Title: "Luxury Oceanfront Villa",
    price: "450,000",
    Area: "Nungwi",
    category: "House",
    url: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=600&h=400"]
  };

  const displayProperty = featuredProperty || defaultProperty;

  // Format first image URL safely
  let propertyImage = "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=600&h=400";
  if (displayProperty.url) {
    if (Array.isArray(displayProperty.url) && displayProperty.url.length > 0) {
      propertyImage = displayProperty.url[0];
    } else if (typeof displayProperty.url === "string") {
      propertyImage = displayProperty.url;
    }
  }

  // Display price formatted
  const propertyPrice = displayProperty.price
    ? (displayProperty.price.toString().startsWith("$") ? displayProperty.price : `$${Number(displayProperty.price).toLocaleString()}`)
    : "$450,000";

  return (
    <section className="agency-promo-banner-container">
      <style>{`
        .agency-promo-banner-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 20px 40px 20px;
          box-sizing: border-box;
          width: 100%;
        }

        .promo-banner-card {
          background: linear-gradient(135deg, #013a17 0%, #0b8b3a 100%) !important;
          border-radius: 20px;
          padding: 30px;
          color: #ffffff;
          box-shadow: 0 20px 40px rgba(1, 58, 23, 0.15);
          position: relative;
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
        }

        /* Ambient background decorations */
        .promo-banner-card::before {
          content: "";
          position: absolute;
          top: -60px;
          right: -60px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          pointer-events: none;
        }

        .promo-banner-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 25px;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        @media (min-width: 900px) {
          .promo-banner-grid {
            grid-template-columns: 1.25fr 0.75fr;
            gap: 35px;
          }
        }

        .promo-text-column {
          display: flex;
          flex-direction: column;
        }

        .promo-tag {
          display: inline-block;
          background: rgba(255, 255, 255, 0.12);
          padding: 4px 10px;
          border-radius: 30px;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 10px;
          width: fit-content;
        }

        .promo-title {
          font-size: 24px;
          font-weight: 800;
          line-height: 1.25;
          margin: 0 0 10px 0;
          letter-spacing: -0.5px;
        }

        .promo-subtitle {
          font-size: 13.5px;
          line-height: 1.5;
          color: #e2f0dc;
          margin: 0;
          font-weight: 300;
        }

        /* 6 benefits compact list */
        .promo-features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 18px;
        }

        @media (min-width: 550px) {
          .promo-features-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .promo-feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          font-weight: 600;
          color: #ffffff;
        }

        .promo-feature-icon {
          font-size: 15px;
          color: #e2f0dc;
          flex-shrink: 0;
        }

        /* Buttons list */
        .promo-buttons-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 22px;
        }

        .promo-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          color: #013a17;
          font-weight: 700;
          font-size: 13.5px;
          padding: 10px 20px;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          border: 2px solid #ffffff;
        }

        .promo-btn-primary:hover {
          background: #f0f4f1;
          color: #013a17;
          transform: translateY(-2px);
        }

        .promo-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: #ffffff;
          font-weight: 600;
          font-size: 13px;
          padding: 8px 18px;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s ease;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .promo-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #ffffff;
          transform: translateY(-1px);
        }

        /* Featured preview card in right column */
        .promo-preview-column {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .success-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 12px;
          width: 100%;
          box-sizing: border-box;
          color: #1f2937;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          position: relative;
        }

        .success-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: #ef4444;
          color: #ffffff;
          font-size: 9px;
          font-weight: 800;
          padding: 4px 8px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          z-index: 15;
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.25);
        }

        .success-img-wrapper {
          height: 110px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }

        .success-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .success-metrics-overlay {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(1, 58, 23, 0.9);
          backdrop-filter: blur(5px);
          color: #ffffff;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .success-info {
          margin-top: 10px;
        }

        .success-title {
          font-size: 13.5px;
          font-weight: 700;
          margin: 0 0 2px 0;
          color: #111827;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .success-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 4px;
        }

        .success-location {
          font-size: 11px;
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .success-price {
          font-size: 13px;
          font-weight: 700;
          color: #0b8b3a;
        }

        .success-divider {
          height: 1px;
          background: #f3f4f6;
          margin: 8px 0;
        }

        .success-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10.5px;
          color: #4b5563;
        }

        .success-views {
          color: #013a17;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 3px;
        }
      `}</style>

      <div className="promo-banner-card">
        <div className="promo-banner-grid">
          {/* Left Column: Text & Features */}
          <div className="promo-text-column">
            <span className="promo-tag">🚀 For Agencies & Multi-Sellers</span>
            <h2 className="promo-title">Become a ZanziHome Premium Partner</h2>
            <p className="promo-subtitle">
              Do you list multiple properties in Zanzibar? Automate your listings import via API, get featured badges, and boost your properties to top search results to reach over 10,000 active monthly buyers.
            </p>

            {/* 6 Positive Sales Points Grid */}
            <div className="promo-features-grid">
              <div className="promo-feature-item">
                <FiCpu className="promo-feature-icon" />
                <span>Automated API Import</span>
              </div>
              <div className="promo-feature-item">
                <FiTrendingUp className="promo-feature-icon" />
                <span>Featured Badges</span>
              </div>
              <div className="promo-feature-item">
                <FiActivity className="promo-feature-icon" />
                <span>Top Search Priority</span>
              </div>
              <div className="promo-feature-item">
                <FiUsers className="promo-feature-icon" />
                <span>10,000+ Monthly Buyers</span>
              </div>
              <div className="promo-feature-item">
                <FiMail className="promo-feature-icon" />
                <span>Direct Lead Routing</span>
              </div>
              <div className="promo-feature-item">
                <FiPercent className="promo-feature-icon" />
                <span>0% Commission Fee</span>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="promo-buttons-row">
              <Link to="/about" className="promo-btn-primary">
                Learn More & Join <FiArrowRight style={{ marginLeft: "8px" }} />
              </Link>
              <Link to="/contact" className="promo-btn-secondary">
                Contact Sales
              </Link>
            </div>
          </div>

          {/* Right Column: Featured success story object */}
          <div className="promo-preview-column">
            <div className="success-card">
              <span className="success-badge">Featured Success</span>
              <div className="success-img-wrapper">
                <img src={propertyImage} className="success-img" alt="Zanzibar featured property" />
                <span className="success-metrics-overlay">
                  <FiTrendingUp /> +185% views
                </span>
              </div>
              
              <div className="success-info">
                <h3 className="success-title">{displayProperty.Title}</h3>
                <div className="success-meta">
                  <span className="success-location">
                    <FiMapPin /> {displayProperty.Area}
                  </span>
                  <span className="success-price">{propertyPrice}</span>
                </div>
                
                <div className="success-divider" />
                
                <div className="success-footer">
                  <span>Sold/Rented faster</span>
                  <Link to={`/propertys/property/${displayProperty.id}`} className="success-views" style={{ textDecoration: "none" }}>
                    View Live <FiExternalLink />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgencyPromoBanner;
