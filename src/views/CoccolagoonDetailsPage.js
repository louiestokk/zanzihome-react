"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

import { BiMap } from "react-icons/bi";
import Karusell from "../components/Karusell";
import CompanyLeadForm from "../components/CompanyLeadForm";
import Abovefooter from "../components/Abovefooter";
import MatchRequestStepper from "../components/MatchRequestStepper";
import { getCoccolagoonPropertyById } from "../utils/coccolagoonData";

const CoccolagoonDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const property = getCoccolagoonPropertyById(id);

  if (!property) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Listing Not Found</h2>
        <p>This property could not be loaded or is no longer available.</p>
        <button onClick={() => router.push("/partners/coccolagoon")} style={{ marginTop: "20px", padding: "10px 20px", background: "#013a17", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Back to Cocco Lagoon Listings
        </button>
      </div>
    );
  }

  return (
    <div className="property-details-page">

      {/* Back to Partner listings link */}
      <Link href="/partners/coccolagoon" className="back-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Back to Cocco Lagoon Listings</span>
      </Link>

      {/* Header Info */}
      <div className="property-main-header">
        <div className="header-title-box">
          <span className="property-badge">
            🏝️ Cocco Lagoon Partner • {property.badge}
          </span>
          <h1 className="property-main-title">{property.title}</h1>
          <p className="property-main-location">
            <BiMap style={{ color: "#013a17", fontSize: "18px" }} />
            <span>{property.Area}, Zanzibar</span>
          </p>
        </div>
      </div>

      {/* Layout Split Grid */}
      <div className="property-grid-layout">

        {/* Left Main Column */}
        <div className="layout-main-col">

          {/* Carousel */}
          <div style={{ width: "100%", overflow: "hidden" }}>
            {property.imagesArray && property.imagesArray.length > 1 ? (
              <Karusell imagesArray={property.imagesArray} uri={property.url} />
            ) : (
              <div className="single-fallback-image-wrapper">
                <img
                  src={property.url}
                  alt={property.title}
                  className="single-fallback-image"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="details-section-box">
            <h3 className="section-box-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: "6px" }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
              <span>Description</span>
            </h3>
            <p className="wp-content-description">{property.description}</p>
          </div>

        </div>

        {/* Right Sidebar Column */}
        <div className="layout-side-col">

          {/* Facts Card */}
          <div className="facts-card">
            <div className="facts-card-price">
              from {property.price}
            </div>

            <div className="facts-grid">
              <div className="fact-item">
                <span className="fact-label">Type</span>
                <span className="fact-value">{property.category}</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Size</span>
                <span className="fact-value">{property.size} m²</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Rooms</span>
                <span className="fact-value">{property.rooms}</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Baths</span>
                <span className="fact-value">{property.bathrooms}</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Est. ROI</span>
                <span className="fact-value">{property.roi}</span>
              </div>
            </div>
          </div>

          {/* Company Contact Form */}
          <CompanyLeadForm
            listingTitle={property.title}
            listingId={property.id}
            companyName="Cocco Lagoon"
            companyEmail="clancy@coccolagoon.com"
            isCompany={true}
            about="Cocco Lagoon is a luxury 5-star condo resort under construction on Pemba Island, offering full property ownership with professional rental management and projected ~18% annual returns."
          />

        </div>

      </div>

      <div style={{ maxWidth: "1200px", margin: "2rem auto" }}>
        <MatchRequestStepper />
      </div>

      <Abovefooter />
    </div>
  );
};

export default CoccolagoonDetailsPage;
