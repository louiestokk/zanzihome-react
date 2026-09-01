import React from "react";
import Link from "next/link";

import { BiMap } from "react-icons/bi";
import Abovefooter from "../components/Abovefooter";
import Karusell from "../components/Karusell";
import MatchRequestStepper from "../components/MatchRequestStepper";
import { coccolagoonProperties } from "../utils/coccolagoonData";

const resortOverviewImages = [
  "https://invest.coccolagoon.com/images/9ca7ec32-c0b4-435c-a4cf-3c430046cf33.png",
  "https://invest.coccolagoon.com/images/waves-lux-1c.jpg",
  "https://invest.coccolagoon.com/images/palm-pool-2.jpg",
  "https://invest.coccolagoon.com/images/ocean-studio-2c.jpg",
  "https://invest.coccolagoon.com/images/penthouse-1c.jpg",
  "https://invest.coccolagoon.com/images/penthouse-3c.jpg",
  "https://invest.coccolagoon.com/images/penthouse-5c.jpg",
];

const CoccolagoonPartnerPage = () => {
  return (
    <section style={{ fontFamily: "Poppins, sans-serif", background: "#fafbfa", paddingBottom: "40px" }}>

      {/* Hero Header */}
      <section className="partner-page-hero">
        <div className="partner-breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Cocco Lagoon Partner</span>
        </div>
        <h1 className="partner-page-hero-title">Cocco Lagoon Resort & Spa</h1>
        <p className="partner-page-hero-subtitle">
          Invest in a luxury, 5-star condo resort on Pemba Island. Browse available apartments and villas
          from our verified partner Cocco Lagoon — full title deed ownership with professional rental management.
        </p>
      </section>

      {/* Main Grid */}
      <div id="properties" className="grid-container">
        <div className="cards-grid">
          {coccolagoonProperties.map((prop) => (
            <Link key={prop.id} href={`/partners/coccolagoon/property/${prop.id}`}>
            <div
              className="prop-card">
              {/* Image */}
              <div className="prop-img-wrapper">
                <img
                  loading="lazy"
                  src={prop.url}
                  alt={prop.title}
                  className="prop-img"
                />
                <div className="prop-badge-partner">🏝️ Cocco Lagoon</div>
                <div className="prop-badge-transaction">{prop.badge}</div>
              </div>

              {/* Card Body */}
              <div className="prop-card-body">
                <div>
                  <div className="prop-card-header">
                    <span className="prop-category-tag">{prop.category}</span>
                  </div>
                  <h3 className="prop-title">{prop.title}</h3>
                </div>

                <div>
                  <div className="prop-price-row">
                    <span className="prop-price">from {prop.price}</span>
                  </div>

                  <div className="prop-specs">
                    <div className="prop-spec-item">
                      <BiMap style={{ color: "#013a17", fontSize: "16px" }} />
                      <span>{prop.Area}, Zanzibar</span>
                    </div>
                    <div className="prop-spec-item" style={{ marginLeft: "auto" }}>
                      <span>{prop.size} m²</span>
                    </div>
                    <div className="prop-spec-item">
                      <span>{prop.rooms} {prop.rooms > 1 ? "Beds" : "Bed"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
            
          ))}
        </div>
      </div>

      <section
        style={{
          maxWidth: "1200px",
          margin: "3rem auto",
          padding: "0 16px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "32px",
            alignItems: "center",
            background: "#ffffff",
            border: "1px solid rgba(1, 58, 23, 0.12)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <img
            src="https://invest.coccolagoon.com/images/masterplan-v2.png"
            alt="Cocco Lagoon Resort and Spa masterplan showing apartments for sale on Pemba, Zanzibar"
            loading="lazy"
            style={{ width: "100%", height: "100%", minHeight: "280px", objectFit: "cover" }}
          />
          <div style={{ padding: "32px", color: "#013a17" }}>
            <h2 style={{ fontSize: "2rem", lineHeight: "1.2", margin: "0 0 16px" }}>
              Invest in a Luxury Resort on the Indian Ocean
            </h2>
            <p style={{ color: "#4b5563", fontSize: "1.05rem", lineHeight: "1.7", margin: "0 0 16px" }}>
              Become the owner of a property in a 5-star resort on the paradise island of Zanzibar - Pemba.
            </p>
            <p style={{ color: "#013a17", fontSize: "1.2rem", fontWeight: "700", margin: 0 }}>
              Apartments from 125 999 USD
            </p>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: "1200px", margin: "3rem auto", padding: "0 16px" }}>
        <h2 style={{ color: "#013a17", fontSize: "1.75rem", margin: "0 0 16px" }}>
          Explore Cocco Lagoon Resort & Spa
        </h2>
        <Karusell imagesArray={resortOverviewImages} />
      </section>

      <section style={{ maxWidth: "1200px", margin: "3rem auto", padding: "0 16px" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid rgba(1, 58, 23, 0.12)",
            borderRadius: "8px",
            padding: "32px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              marginBottom: "40px",
            }}
          >
            <div style={{ borderLeft: "3px solid #013a17", padding: "8px 16px" }}>
              <strong style={{ color: "#013a17", display: "block", fontSize: "2rem", lineHeight: "1.1" }}>18%</strong>
              <span style={{ color: "#013a17", display: "block", fontSize: "1rem", fontWeight: "700", marginTop: "6px" }}>Annual Return</span>
              <span style={{ color: "#4b5563", display: "block", fontSize: "0.9rem", lineHeight: "1.5", marginTop: "4px" }}>estimated based on rental income</span>
            </div>
            <div style={{ borderLeft: "3px solid #013a17", padding: "8px 16px" }}>
              <strong style={{ color: "#013a17", display: "block", fontSize: "2rem", lineHeight: "1.1" }}>126K</strong>
              <span style={{ color: "#013a17", display: "block", fontSize: "1rem", fontWeight: "700", marginTop: "6px" }}>USD from</span>
              <span style={{ color: "#4b5563", display: "block", fontSize: "0.9rem", lineHeight: "1.5", marginTop: "4px" }}>minimum investment amount</span>
            </div>
            <div style={{ borderLeft: "3px solid #013a17", padding: "8px 16px" }}>
              <strong style={{ color: "#013a17", display: "block", fontSize: "2rem", lineHeight: "1.1" }}>Q4</strong>
              <span style={{ color: "#013a17", display: "block", fontSize: "1rem", fontWeight: "700", marginTop: "6px" }}>2026 Opening</span>
              <span style={{ color: "#4b5563", display: "block", fontSize: "0.9rem", lineHeight: "1.5", marginTop: "4px" }}>construction underway - 90% progress</span>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #e5ece6", paddingTop: "32px" }}>
            <p style={{ color: "#537460", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.8px", margin: "0 0 8px", textTransform: "uppercase" }}>
              About the Investment
            </p>
            <h2 style={{ color: "#013a17", fontSize: "2rem", lineHeight: "1.2", margin: "0 0 16px" }}>
              Cocco Lagoon Resort & Spa
            </h2>
            <p style={{ color: "#4b5563", fontSize: "1rem", lineHeight: "1.75", margin: "0 0 16px" }}>
              <strong>Cocco Lagoon is a luxury, 5-star condo resort</strong> being built on the pristine island of Pemba - one of the most extraordinary corners of the Indian Ocean. The project combines modern architecture with tropical nature, offering guests comfort, privacy and authentic experiences. The resort's extensive infrastructure includes a spa, pool zones, restaurants, bars, and direct access to a private beach, with a cinema and a private pier.
            </p>
            <p style={{ color: "#4b5563", fontSize: "1rem", lineHeight: "1.75", margin: "0 0 16px" }}>
              Each investor receives a title deed to their chosen property, while a professional operator handles its rental and full management. This lets owners earn passive income without being involved in day-to-day operations.
            </p>
            <p style={{ color: "#4b5563", fontSize: "1rem", lineHeight: "1.75", margin: 0 }}>
              Pemba's year-round attractions - coral reefs, diving, cruises and wild beaches - further strengthen the project's tourism and investment potential.
            </p>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "1200px", margin: "2rem auto" }}>
        <MatchRequestStepper />
      </div>

      <Abovefooter />
    </section>
  );
};

export default CoccolagoonPartnerPage;
