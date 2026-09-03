"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CoccoLagoonPromo from "./CoccoLagoonPromo";

const BannerSection = () => {
  const router = useRouter();

  return (
    <div>
      

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
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Property for Sale & Rent in Zanzibar
          </h1>

          <p style={{ maxWidth: "600px", margin: "0 auto", lineHeight: "26px" }}>
            Find houses, villas, apartments and land for sale or rent in Zanzibar.
            Discover beachfront properties, investment opportunities and your dream home today.
          </p>

          {/* CTA BUTTON */}
          <button
            onClick={() => router.push("/properties-zanzibar")}
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
          onClick={() => router.push("/properties-zanzibar")}
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
      {/* <CoccoLagoonPromo /> */}
      <div className="home-promo-grid">
        
        {/* Promotion block 1: List Property */}
      <div 
          className="home-promo-card" 
          onClick={() => router.push("/list-your-property-zanzibar")}
          style={{
            background: "linear-gradient(135deg, #013a17 0%, #306c48 100%)",
            border: "none",
            boxShadow: "0 10px 30px rgba(1, 58, 23, 0.15)",
            color: "#ffffff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "260px"
          }}
        >
          <div style={{
            textAlign: "center",
            padding: "20px 10px"
          }}>
            <div style={{ fontSize: "36px", marginBottom: "16px" }}>📢</div>
            <h3 style={{ margin: "0 0 12px 0", color: "#ffffff", fontSize: "22px", fontWeight: "800", letterSpacing: "-0.5px" }}>
              Publish Your Listing for Free!
            </h3>
            <p style={{ margin: 0, fontSize: "14px", color: "#d1e2c9", fontWeight: "300", lineHeight: "1.6" }}>
              It is completely free to advertise on ZanziHome. Create and publish your property listing instantly to reach thousands of potential clients.
            </p>
          </div>
        </div>

        {/* Promotion block 2: Explore */}
        <div className="home-promo-card" onClick={() => router.push("/properties-zanzibar")}>
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