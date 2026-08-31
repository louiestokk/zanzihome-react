"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { coccolagoonProperties } from "../utils/coccolagoonData";

const CoccolagoonFeaturedSection = () => {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      checkScroll();
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="popular-section">

      {/* Header Container */}
      <div className="popular-header">
        <div className="popular-title-container">
          <span className="partner-badge" style={{ display: "inline-block", marginBottom: "8px" }}>Partner Agent</span>
          <h2 className="popular-title">Cocco Lagoon Resort & Spa</h2>
          <p className="popular-subtitle">
            Luxury resort apartments and villas from our verified partner <strong>Cocco Lagoon</strong>, Pemba Island
          </p>
        </div>

        {/* Navigation Buttons (Desktop only) */}
        <div className="popular-nav-container">
          <button
            onClick={() => handleScroll("left")}
            className="popular-nav-btn"
            disabled={!canScrollLeft}
            aria-label="Previous properties"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="popular-nav-btn"
            disabled={!canScrollRight}
            aria-label="Next properties"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="popular-scroll-container" ref={scrollRef}>
        {coccolagoonProperties.map((tour) => (
          <div
            key={tour.id}
            className="popular-card"
            onClick={() => {
              router.push(`/partners/coccolagoon/property/${tour.id}`);
            }}
          >
            {/* Image Wrapper */}
            <div className="popular-img-wrapper">
              <img
                loading="lazy"
                src={tour.url}
                alt={`${tour.title} Cocco Lagoon`}
                title={`${tour.title} Cocco Lagoon`}
                className="popular-img"
              />

              {/* Badges */}
              <div className="popular-badge-container">
                <span className="popular-badge-featured" style={{ background: "rgba(1, 58, 23, 0.85)", color: "#fff" }}>
                  🏝️ Cocco Lagoon
                </span>
                <span className="popular-badge-featured" style={{ background: "#FFD700", color: "#000" }}>
                  {tour.badge}
                </span>
              </div>

              {/* Bottom Gradient overlay */}
              <div className="popular-img-overlay" />
            </div>

            {/* Content Details */}
            <div className="popular-card-content">
              <h3 className="popular-card-title">{tour.title}</h3>

              {/* Price and Specs row */}
              <div className="popular-specs-row">
                <span className="popular-price">from {tour.price}</span>
                <div className="popular-spec-item">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  <span>{tour.size} sqm</span>
                </div>
                <div className="popular-spec-item">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>{tour.rooms} {tour.rooms > 1 ? "Beds" : "Bed"}</span>
                </div>
              </div>

              {/* Meta row containing Location and Property Type Tag */}
              <div className="popular-meta-row">
                <div className="popular-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#013a17" }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{tour.Area}</span>
                </div>
                <span className="popular-type-tag">{tour.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button to see all Cocco Lagoon listings */}
      <div className="partner-cta-container">
        <button
          onClick={() => router.push("/partners/coccolagoon")}
          className="partner-see-all-btn"
        >
          See All Cocco Lagoon Listings
        </button>
      </div>
    </section>
  );
};

export default CoccolagoonFeaturedSection;
