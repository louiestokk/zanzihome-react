"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Popular = ({ title, images }) => {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to enable/disable navigation buttons
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
      // Run once on load to adjust buttons
      checkScroll();
      
      // Also run when window resizes
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [images]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75; // Scroll 75% of the container width
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
          <h2 className="popular-title">{title}</h2>
          <p className="popular-subtitle">
            Handpicked properties offering the best <strong>value</strong> and <strong>location</strong> in Zanzibar
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
        {images?.map((tour, i) => (
          <div
            key={i}
            className="popular-card"
            onClick={() => {
              router.push(`/propertys/property/${tour.adId}`);
            }}
          >
            {/* Image Wrapper */}
            <div className="popular-img-wrapper">
              <img
                loading="lazy"
                src={tour.url}
                alt={`${tour.imgText} Zanzibar`}
                title={`${tour.imgText} Zanzibar`}
                className="popular-img"
              />

              {/* Badges */}
              <div className="popular-badge-container">
                <span className="popular-badge-featured">⭐ Featured</span>
                {i % 2 === 0 && <span className="popular-badge-hot">🔥 Hot</span>}
              </div>

              {/* Bottom Gradient overlay */}
              <div className="popular-img-overlay" />
            </div>

            {/* Content Details */}
            <div className="popular-card-content">
              <h3 className="popular-card-title">{tour.imgText}</h3>

              {/* Price and Specs row */}
              {(tour.price || tour.size || tour.rooms) && (
                <div className="popular-specs-row">
                  {tour.price && <span className="popular-price">{tour.price}</span>}
                  {tour.size && (
                    <div className="popular-spec-item">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                      <span>{tour.size} sqm</span>
                    </div>
                  )}
                  {tour.rooms && (
                    <div className="popular-spec-item">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      <span>{tour.rooms} {tour.rooms > 1 ? "Rooms" : "Room"}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Meta row containing Location and Property Type Tag */}
              <div className="popular-meta-row">
                <div className="popular-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#013a17" }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Zanzibar</span>
                </div>
                <span className="popular-type-tag">{tour.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Popular;