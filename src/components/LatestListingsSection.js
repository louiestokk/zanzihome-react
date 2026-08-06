import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";

const LatestListingsSection = ({ title, subtitle, category }) => {
  const history = useHistory();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const firestoreData = useSelector(getFirestoreData) || [];

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

  if (latestListings.length === 0) {
    return null; // Don't render empty sections
  }

  return (
    <section className="latest-section">
      <style>{`
        .latest-section {
          padding: 40px 20px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Poppins', sans-serif;
        }

        .latest-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 24px;
        }

        .latest-title-container {
          flex: 1;
        }

        .latest-title {
          font-size: 26px;
          font-weight: 800;
          color: #013a17;
          margin: 0 0 6px 0;
          letter-spacing: -0.5px;
        }

        .latest-subtitle {
          font-size: 14px;
          color: #64748b;
          margin: 0;
          font-weight: 500;
        }

        .latest-nav-container {
          display: flex;
          gap: 8px;
          margin-left: 16px;
        }

        .latest-nav-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          color: #1e293b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
        }

        .latest-nav-btn:hover:not(:disabled) {
          background: #013a17;
          color: #ffffff;
          border-color: #013a17;
          transform: scale(1.05);
        }

        .latest-nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .latest-scroll-container {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 8px 4px 20px 4px;
          scrollbar-width: none; /* Firefox */
          scroll-behavior: smooth;
        }

        .latest-scroll-container::-webkit-scrollbar {
          display: none; /* Chrome, Safari */
        }

        .latest-card {
          flex: 0 0 280px;
          scroll-snap-align: start;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
          border: 1px solid #f1f5f9;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .latest-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(1, 58, 23, 0.08);
          border-color: rgba(1, 58, 23, 0.12);
        }

        .latest-img-wrapper {
          position: relative;
          height: 180px;
          overflow: hidden;
          background: #f1f5f9;
        }

        .latest-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .latest-card:hover .latest-img {
          transform: scale(1.06);
        }

        .latest-badge-container {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 2;
        }

        .latest-badge-new {
          background: #013a17;
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .latest-badge-verified {
          background: #22c55e;
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .latest-img-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
          z-index: 1;
        }

        .latest-card-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .latest-card-title {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px 0;
          line-height: 1.4;
          height: 42px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .latest-specs-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          font-size: 12px;
          color: #64748b;
          font-weight: 600;
        }

        .latest-price {
          font-size: 15px;
          font-weight: 800;
          color: #013a17;
        }

        .latest-spec-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .latest-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid #f1f5f9;
        }

        .latest-location {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #475569;
          font-weight: 600;
        }

        .latest-publisher {
          font-size: 11px;
          color: #013a17;
          font-weight: 700;
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        @media (max-width: 640px) {
          .latest-title {
            font-size: 22px;
          }
          .latest-card {
            flex: 0 0 250px;
          }
        }
      `}</style>

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
          const isVerified = item.isCompany === true || (item.About && item.About.trim().length > 0);
          const isNew = index < 3; // First 3 sorted items get a "New" badge

          return (
            <div
              key={item.id || index}
              className="latest-card"
              onClick={() => history.push(`/propertys/property/${item.adId}`)}
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
                  <span className="latest-price">{item.Price || item.price || "Contact"}</span>
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
                  {item.Name && (
                    <span className="latest-publisher">
                      {item.Name}
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
