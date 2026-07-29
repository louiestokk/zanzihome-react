import React from "react";
import { useHistory } from "react-router-dom";

const BannerSection = () => {
  const history = useHistory();

  return (
    <div>
      <style>{`
        .home-promo-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 1000px;
          margin: 3rem auto;
          padding: 0 1rem;
        }

        .home-promo-card {
          flex: 1;
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.05);
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }

        .home-promo-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.07);
        }

        .promo-card-image-box {
          height: 180px;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 18px;
          position: relative;
        }

        .promo-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .promo-card-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #013a17;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 30px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .promo-card-title {
          font-size: 18px;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 8px 0;
          line-height: 1.3;
        }

        .promo-card-desc {
          font-size: 13.5px;
          color: #4b5563;
          line-height: 1.6;
          margin: 0;
          font-weight: 300;
        }

        @media (min-width: 768px) {
          .home-promo-grid {
            flex-direction: row;
          }
        }
      `}</style>

      {/* ✅ HERO SECTION (H1 + SEARCH FEEL + SEO) */}
      <section
        style={{
          position: "relative",
          height: "320px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          marginBottom: "2rem"
        }}
      >
        {/* Background */}
        <img
          src="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Real estate in Zanzibar - houses, villas, apartments and land"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
            zIndex: 0
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.45)",
            zIndex: 1
          }}
        />

        {/* Content */}
        <div style={{ zIndex: 2, padding: "1rem" }}>
          {/* ✅ H1 (SUPER VIKTIG SEO) */}
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Property for Sale & Rent in Zanzibar
          </h1>

          <p style={{ maxWidth: "600px", margin: "0 auto", lineHeight: "26px" }}>
            Find houses, villas, apartments and land for sale or rent in Zanzibar.
            Discover beachfront properties, investment opportunities and your dream home today.
          </p>

          {/* CTA BUTTON */}
          <button
            onClick={() => history.push("/properties-zanzibar")}
            style={{
              marginTop: "1.5rem",
              background: "#0b8b3a",
              color: "white",
              border: "none",
              padding: "0.8rem 1.6rem",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Browse Properties
          </button>
        </div>
      </section>

      {/* ✅ MAIN CONTENT (CENTERED LIKE HEMNET) */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}
      >
        {/* ✅ PROPERTY BANNER */}
        <section
          className="zanzibar-real-estate-section"
          onClick={() => history.push("/properties-zanzibar")}
        >
          <div className="content">
            <span className="badge">Updated Monthly • 10,000+ Users</span>

            <h2 style={{margin: '0.5rem 0'}}>
              Buy & Rent Real Estate in Zanzibar – Villas, Apartments & Land
            </h2>

            <p style={{lineHeight:'24px'}}>
              Discover premium and verified real estate listings across Zanzibar,
              including beachfront villas, modern apartments, land plots and
              commercial properties. Thousands of buyers and investors trust
              ZanziHome every month to find their perfect property in Zanzibar.
            </p>

            <div className="cta">
              Explore Properties →
            </div>
          </div>
        </section>
      </div>

      {/* Side-by-side promotional grid on Desktop */}
      <div className="home-promo-grid">
        
        {/* Promotion block 1: List Property */}
        <div className="home-promo-card" onClick={() => history.push("/checkout")}>
          <div className="promo-card-image-box">
            <img
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&h=180"
              alt="List Property Zanzibar"
              className="promo-card-img"
            />
            <span className="promo-card-tag">List Listing</span>
          </div>
          <h3 className="promo-card-title">Promote your property listing</h3>
          <p className="promo-card-desc">
            Advertise your house, apartment or plot on ZanziHome. Starting from only <strong>$20 / 6 Months</strong> or <strong>$30 / 12 Months</strong>. Reach thousands of active property seekers daily.
          </p>
        </div>

        {/* Promotion block 2: Explore */}
        <div className="home-promo-card" onClick={() => history.push("/properties-zanzibar")}>
          <div className="promo-card-image-box">
            <img
              src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=400&h=180"
              alt="Explore Real Estate Zanzibar"
              className="promo-card-img"
            />
            <span className="promo-card-tag" style={{ background: "#0b8b3a" }}>Explore</span>
          </div>
          <h3 className="promo-card-title">Discover your dream property</h3>
          <p className="promo-card-desc">
            Browse through hundreds of verified houses, beachfront land plots, and vacation rentals for sale or rent across Zanzibar's top hotspots.
          </p>
        </div>

      </div>

    </div>
  );
};

export default BannerSection;