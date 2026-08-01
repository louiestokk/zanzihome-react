import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Import custom icons
import { FiHome, FiTrendingUp, FiUsers, FiLayers, FiArrowRight, FiPercent } from "react-icons/fi";
import { FaBuilding, FaHotel, FaUmbrellaBeach } from "react-icons/fa";

const About = () => {
  return (
    <main className="about-page-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>About Us | ZanziHome Real Estate Marketplace</title>
        <meta
          name="description"
          content="Discover ZanziHome, Zanzibar's leading real estate platform. We connect agents, agencies, and individual sellers with thousands of monthly buyers looking for apartments, houses, villas, hotels, and beachfront plots."
        />
        <link rel="canonical" href="https://www.zanzihome.com/about" />
      </Helmet>

      <style>{`
        .about-page-container {
          background: #fafbfa;
          font-family: 'Poppins', sans-serif;
          color: #1f2937;
          padding-bottom: 80px;
          width: 100%;
          box-sizing: border-box;
        }

        /* Banner Hero */
        .about-hero {
          background: linear-gradient(135deg, #013a17 0%, #0d2818 100%);
          color: #ffffff;
          padding: 80px 20px;
          text-align: center;
          position: relative;
        }

        .about-hero::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 24px;
          background: #fafbfa;
          clip-path: ellipse(60% 100% at 50% 100%);
        }

        .about-hero-title {
          font-size: 40px;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .about-hero-subtitle {
          font-size: 15px;
          color: #d1e2c9;
          max-width: 650px;
          margin: 12px auto 0 auto;
          font-weight: 300;
          line-height: 1.6;
        }

        /* Platform Stats */
        .stats-bar {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          max-width: 1000px;
          margin: -20px auto 40px auto;
          padding: 0 20px;
          position: relative;
          z-index: 2;
        }

        @media (min-width: 768px) {
          .stats-bar {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .stat-card {
          background: #ffffff;
          border-radius: 14px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.03);
        }

        .stat-number {
          font-size: 28px;
          font-weight: 800;
          color: #013a17;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 12.5px;
          color: #6b7280;
          font-weight: 500;
        }

        /* Inner container */
        .about-content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 20px;
        }

        @media (min-width: 900px) {
          .about-content-grid {
            grid-template-columns: 1.2fr 1fr;
          }
        }

        /* Listing type details list */
        .offerings-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .offering-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: transform 0.2s, border-color 0.2s;
        }

        .offering-card:hover {
          transform: translateY(-2px);
          border-color: #013a17;
        }

        .offering-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: #f0f4f1;
          color: #013a17;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }

        .offering-body h4 {
          margin: 0 0 6px 0;
          font-size: 16px;
          font-weight: 700;
          color: #1f2937;
        }

        .offering-body p {
          margin: 0;
          font-size: 13.5px;
          color: #6b7280;
          line-height: 1.5;
        }

        /* Partner card styling */
        .partner-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 30px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          height: fit-content;
        }

        .partner-title {
          font-size: 20px;
          font-weight: 700;
          color: #013a17;
          margin: 0 0 10px 0;
        }

        .partner-desc {
          font-size: 13.5px;
          color: #6b7280;
          margin: 0 0 24px 0;
          line-height: 1.6;
        }

        .benefits-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .benefit-icon {
          font-size: 18px;
          color: #0b8b3a;
          margin-top: 3px;
          flex-shrink: 0;
        }

        .benefit-item h4 {
          margin: 0 0 2px 0;
          font-size: 14px;
          font-weight: 700;
          color: #1f2937;
        }

        .benefit-item p {
          margin: 0;
          font-size: 12.5px;
          color: #6b7280;
          line-height: 1.5;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #013a17;
          color: #ffffff;
          font-size: 14.5px;
          font-weight: 700;
          padding: 14px 28px;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 4px 15px rgba(1, 58, 23, 0.15);
          width: 100%;
          box-sizing: border-box;
        }

        .cta-button:hover {
          background: #0b8b3a;
          box-shadow: 0 6px 20px rgba(11, 139, 58, 0.2);
          transform: translateY(-1px);
        }

        .secondary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          color: #013a17;
          border: 2px solid #013a17;
          font-size: 14.5px;
          font-weight: 700;
          padding: 12px 28px;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s;
          width: 100%;
          box-sizing: border-box;
          margin-top: 12px;
        }

        .secondary-button:hover {
          background: #f0f4f1;
          transform: translateY(-1px);
        }
      `}</style>

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
              <Link to="/checkout" className="cta-button">
                List Your Property (Free) <FiArrowRight style={{ marginLeft: "8px" }} />
              </Link>
              
              <div style={{ marginTop: "24px", textAlign: "center" }}>
                <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 10px 0", lineHeight: "1.4" }}>
                  Interested in becoming a <strong>Premium Partner Customer</strong>? Contact us to integrate your listings automatically via API and boost your properties to Featured positions.
                </p>
                <Link to="/contact" className="secondary-button">
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

        {/* Right Column: Agency partnership & advertising details */}
      
      </section>
    </main>
  );
};

export default About;
