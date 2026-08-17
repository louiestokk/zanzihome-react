"use client";

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { 
  FiArrowRight, 
  FiActivity, 
  FiCpu, 
  FiTrendingUp, 
  FiUsers, 
  FiMapPin,
  FiExternalLink,
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
            </div>

            {/* Buttons Row */}
            <div className="promo-buttons-row">
              <Link href="/statistics" className="promo-btn-primary">
                Learn More & Join <FiArrowRight style={{ marginLeft: "8px" }} />
              </Link>
              <Link href="/contact" className="promo-btn-secondary">
                Contact Sales <FiArrowRight style={{ marginLeft: "8px" }} />
              </Link>
            </div>
          </div>

          {/* Right Column: Featured success story object */}
          <div className="promo-preview-column">
            <div className="success-card">
              <span className="success-badge">Featured Success</span>
              <div className="success-img-wrapper">
                <img src={'https://i.ibb.co/PsxJ9GNR/plot-paje.jpg'} className="success-img" alt="Zanzibar featured property" />
                <span className="success-metrics-overlay">
                  <FiTrendingUp /> +185% views
                </span>
              </div>
              
              <div className="success-info">
                <h3 className="success-title">{'Beachfront development plot in Paje'}</h3>
                <div className="success-meta">
                  <span className="success-location">
                    <FiMapPin /> {'Paje'}
                  </span>
                  <span className="success-price">{'875.000'}$</span>
                </div>
                
                <div className="success-divider" />
                
                <div className="success-footer">
                  <span>Sold faster</span>
                  <Link href={`/`} className="success-views" style={{ textDecoration: "none" }}>
                    Success <FiTrendingUp />
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
