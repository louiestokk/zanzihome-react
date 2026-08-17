"use client";

import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { isPartnerAd } from "../utils/partnerEmails";

const LatestListingsSection = ({ title, subtitle, category, initialProperties }) => {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const reduxData = useSelector(getFirestoreData) || [];
  const firestoreData = reduxData.length > 0 ? reduxData : (initialProperties || []);

  // Filter listings by category and active status
  const filteredListings = firestoreData.filter(
    (obj) =>
      !["Vehicle", "Tours", "Taxi"].includes(obj.adType) &&
      obj.category === category &&
      obj.paid &&
      !obj.removed
  );

  // Sort listings: latest startDate descending, then fallback to adId descending
  const sortedListings = [...filteredListings].sort((a, b) => {
    const dateA = a.startDate || "";
    const dateB = b.startDate || "";
    if (dateA !== dateB) {
      return dateB.localeCompare(dateA);
    }
    return (Number(b.adId) || 0) - (Number(a.adId) || 0);
  });

  // Limit to latest 10 listings for performance and UI clean lines
  const latestListings = sortedListings.slice(0, 10);

  const checkScrollLimits = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollLimits);
      // Run once on mount / update
      checkScrollLimits();
      // Also check on window resize
      window.addEventListener("resize", checkScrollLimits);
    }
    return () => {
      if (el) {
        el.removeEventListener("scroll", checkScrollLimits);
      }
      window.removeEventListener("resize", checkScrollLimits);
    };
  }, [latestListings.length]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (firestoreData.length === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "2rem 0" }}>
        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", color: "#6b7280", marginBottom: "0.5rem" }}>
          Fetching latest {category.toLowerCase()}s...
        </p>
        <div style={{ width: "20px", height: "20px", border: "2px solid #e5e7eb", borderTopColor: "#013a17", borderRadius: "50%", animation: "spin-loader 0.8s linear infinite" }} />
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes spin-loader {
            to { transform: rotate(360deg); }
          }
        ` }} />
      </div>
    );
  }

  if (latestListings.length === 0) {
    return null; // Don't render empty sections
  }

  return (
    <section className="latest-section">
      

      <div className="latest-header">
        <div className="latest-title-container">
          <h2 className="latest-title">{title}</h2>
          <p className="latest-subtitle">{subtitle}</p>
        </div>
        <div className="latest-nav-container">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="latest-nav-btn"
            aria-label="Previous items"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="latest-nav-btn"
            aria-label="Next items"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div className="latest-scroll-container" ref={scrollRef}>
        {latestListings.map((item, index) => {
          const isVerified = isPartnerAd(item);
          const isNew = index < 3; // First 3 sorted items get a "New" badge

          return (
            <div
              key={item.id || index}
              className="latest-card"
              onClick={() => router.push(`/propertys/property/${item.adId}`)}
            >
              <div className="latest-img-wrapper">
                <img
                  loading="lazy"
                  src={item.uri || "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg"}
                  alt={item.Title}
                  className="latest-img"
                />
                <div className="latest-badge-container">
                  {isNew && <span className="latest-badge-new">⚡ New</span>}
                  {isVerified && <span className="latest-badge-verified">✓ Partner</span>}
                </div>
                <div className="latest-img-overlay" />
              </div>

              <div className="latest-card-content">
                <h3 className="latest-card-title">{item.Title}</h3>

                <div className="latest-specs-row">
                  <span className="latest-price">
                    {item.Price || item.price ? (
                      item.Rent === "Rent" ? `$${item.Price || item.price}/night` : `$${item.Price || item.price}`
                    ) : (
                      "Contact"
                    )}
                  </span>
                  {item.Size && (
                    <div className="latest-spec-item">
                      <span>• {item.Size} sqm</span>
                    </div>
                  )}
                  {item.Rooms && (
                    <div className="latest-spec-item">
                      <span>• {item.Rooms} {Number(item.Rooms) > 1 ? "Rooms" : "Room"}</span>
                    </div>
                  )}
                </div>

                <div className="latest-meta-row">
                  <div className="latest-location">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#013a17" }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{item.Area || "Zanzibar"}</span>
                  </div>
                  {item.category && (
                    <span className="latest-publisher" style={{ textTransform: "capitalize" }}>
                      {item.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LatestListingsSection;
