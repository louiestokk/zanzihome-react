import React from "react";
import Link from "next/link";
import { FiHome, FiTrendingUp, FiUsers, FiLayers, FiArrowRight, FiPercent } from "react-icons/fi";
import { FaBuilding, FaUmbrellaBeach } from "react-icons/fa";

export const metadata = {
  title: "About Us | ZanziHome Real Estate Marketplace",
  description: "Discover ZanziHome, Zanzibar's leading real estate platform. We connect agents, agencies, and individual sellers with thousands of monthly buyers looking for apartments, houses, villas, hotels, and beachfront plots.",
  alternates: {
    canonical: "https://www.zanzihome.com/about",
  },
};

export default function AboutPage() {
  return (
    <main className="about-page-container">
      {/* Hero Header */}
      <section className="about-hero">
        <h1 className="about-hero-title">Who We Are</h1>
        <p className="about-hero-subtitle">
          ZanziHome is Zanzibar's leading property directory. We connect local listings, premium projects, and dream real estate opportunities directly with a global audience.
        </p>
      </section>

      {/* Platform Statistics */}
      <section className="stats-bar">
        <div className="stat-card">
          <div className="stat-number">10,000+</div>
          <div className="stat-label">Monthly Active Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">500+</div>
          <div className="stat-label">Properties Listed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">50+</div>
          <div className="stat-label">Partner Agencies</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">100%</div>
          <div className="stat-label">Zanzibar Focused</div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="about-content-grid">
        <div>
          <div className="partner-card">
            <h3 className="partner-title">Advertise on ZanziHome</h3>
            <p className="partner-desc">
              ZanziHome empowers both established real estate agencies and private individuals to showcase their listings to thousands of active buyers and renters. Join Zanzibar's premier real estate community.
            </p>

            <div className="benefits-list">
              <div className="benefit-item">
                <FiTrendingUp className="benefit-icon" />
                <div>
                  <h4>Reach Thousands Instantly</h4>
                  <p>Tap into our active monthly traffic of over 10,000 users looking for real estate in Zanzibar.</p>
                </div>
              </div>

              <div className="benefit-item">
                <FiPercent className="benefit-icon" />
                <div>
                  <h4>For Private Sellers & Landlords</h4>
                  <p>List properties completely free of charge. Connect directly with prospective clients without broker commissions.</p>
                </div>
              </div>

              <div className="benefit-item">
                <FiUsers className="benefit-icon" />
                <div>
                  <h4>For Real Estate Agencies</h4>
                  <p>Create a dedicated company profile, group listing catalogues under your logo, and manage multi-agent leads easily.</p>
                </div>
              </div>

              <div className="benefit-item" style={{ background: "#f0fdf4", padding: "12px", borderRadius: "8px", border: "1px dashed #bbf7d0" }}>
                <FiLayers className="benefit-icon" style={{ color: "#15803d" }} />
                <div>
                  <h4 style={{ color: "#166534" }}>Premium Partner & API Integration</h4>
                  <p style={{ color: "#166534", fontSize: "12.5px", lineHeight: "1.5", margin: 0 }}>
                    We automatically import all your agency listings via API. Plus, get featured badge statuses and top-tier search priority for maximum exposure.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "30px", borderTop: "1px solid #f3f4f6", paddingTop: "20px" }}>
              <Link href="/list-your-property-zanzibar" className="cta-button">
                List Your Property (Free) <FiArrowRight style={{ marginLeft: "8px" }} />
              </Link>
              
              <div style={{ marginTop: "24px", textAlign: "center" }}>
                <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 10px 0", lineHeight: "1.4" }}>
                  Interested in becoming a <strong>Premium Partner Customer</strong>? Contact us to integrate your listings automatically via API and boost your properties to Featured positions.
                </p>
                <Link href="/contact" className="secondary-button">
                  Become a Premium Partner
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Left Column: Offerings */}
        <div className="offerings-list">
          <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#013a17", margin: "0 0 10px 0" }}>
            Our Real Estate Offerings
          </h2>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 20px 0", lineHeight: "1.5" }}>
            We list prime real estate opportunities across Unguja and Pemba islands. Explore Zanzibar's market or list your properties in just a few clicks.
          </p>

          {/* Offering 1: Apartments & Houses */}
          <div className="offering-card">
            <div className="offering-icon-box">
              <FiHome />
            </div>
            <div className="offering-body">
              <h4>Villas, Houses & Apartments for Sale</h4>
              <p>
                From modern oceanfront condominiums to traditional Swahili villas and luxurious residences in gated estates. We bring you direct sales options to acquire your perfect home in Zanzibar.
              </p>
            </div>
          </div>

          {/* Offering 2: Beachfront plots & Hotels */}
          <div className="offering-card">
            <div className="offering-icon-box">
              <FaUmbrellaBeach />
            </div>
            <div className="offering-body">
              <h4>Dream Plots, Beachfronts & Commercial Hotels</h4>
              <p>
                Secure development land, beachfront plots, or fully operational hotels and resorts. Excellent commercial opportunities tailored for international developers and leisure operators.
              </p>
            </div>
          </div>

          {/* Offering 3: Rentals */}
          <div className="offering-card">
            <div className="offering-icon-box">
              <FaBuilding />
            </div>
            <div className="offering-body">
              <h4>Rentals of All Kinds</h4>
              <p>
                Find holiday stays, long-term rentals, beachfront bungalows, or serviced corporate apartments. Flexible options matching any duration and budget requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
