"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { BiMap } from "react-icons/bi";
import Abovefooter from "../components/Abovefooter";
import MatchRequestStepper from "../components/MatchRequestStepper";
import { coccolagoonProperties } from "../utils/coccolagoonData";

const CoccolagoonPartnerPage = () => {
  const router = useRouter();

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
      <div className="grid-container">
        <div className="cards-grid">
          {coccolagoonProperties.map((prop) => (
            <div
              key={prop.id}
              className="prop-card"
              onClick={() => router.push(`/partners/coccolagoon/property/${prop.id}`)}
            >
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
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "2rem auto" }}>
        <MatchRequestStepper />
      </div>

      <Abovefooter />
    </section>
  );
};

export default CoccolagoonPartnerPage;
