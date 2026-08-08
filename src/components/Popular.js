import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Popular = ({ title, images }) => {
  const history = useHistory();
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
      <style>{`
        .popular-section {
          width: 100%;
          padding: 15px 16px;
          background: #fafbfa;
          overflow: hidden;
        }
        .popular-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          max-width: 1200px;
          margin: 0 auto 28px auto;
        }
        .popular-title-container {
          text-align: left;
        }
        .popular-title {
          font-size: 28px;
          font-weight: 700;
          color: #013a17;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .popular-subtitle {
          font-size: 14px;
          color: #6b7280;
          margin: 6px 0 0 0;
        }
        .popular-nav-container {
          display: flex;
          gap: 12px;
        }
        .popular-nav-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          color: #1c2c22;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .popular-nav-btn:hover:not(:disabled) {
          background: #013a17;
          color: #ffffff;
          border-color: #013a17;
          box-shadow: 0 4px 12px rgba(1, 58, 23, 0.25);
        }
        .popular-nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          background: #f9fafb;
          color: #9ca3af;
          border-color: #e5e7eb;
        }
        .popular-scroll-container {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          max-width: 1200px;
          margin: 0 auto;
          padding: 8px 4px 24px 4px;
          scrollbar-width: none; /* Hide standard Firefox scrollbar */
        }
        .popular-scroll-container::-webkit-scrollbar {
          display: none; /* Hide Chrome/Safari scrollbar for extra clean look */
        }
        .popular-card {
          position: relative;
          cursor: pointer;
          border-radius: 16px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.06);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          scroll-snap-align: start;
          width: 320px;
          flex-shrink: 0;
        }
        .popular-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 35px rgba(0,0,0,0.1);
          border-color: rgba(1, 58, 23, 0.15);
        }
        .popular-img-wrapper {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        .popular-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .popular-card:hover .popular-img {
          transform: scale(1.08);
        }
        .popular-badge-container {
          position: absolute;
          top: 14px;
          left: 14px;
          display: flex;
          gap: 8px;
          z-index: 2;
        }
        .popular-badge-featured {
          background: #FFD700;
          color: #000;
          padding: 6px 12px;
          font-size: 11px;
          font-weight: 700;
          border-radius: 20px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          letter-spacing: 0.3px;
        }
        .popular-badge-hot {
          background: #ff4d4f;
          color: #fff;
          padding: 6px 12px;
          font-size: 11px;
          font-weight: 700;
          border-radius: 20px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          letter-spacing: 0.3px;
        }
        .popular-img-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
          z-index: 1;
        }
        .popular-card-content {
          padding: 20px;
        }
        .popular-card-title {
          font-size: 17px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 10px 0;
          line-height: 1.4;
          transition: color 0.3s;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 48px;
        }
        .popular-card:hover .popular-card-title {
          color: #013a17;
        }
        .popular-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #f3f4f6;
        }
        .popular-location {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          color: #6b7280;
        }
        .popular-type-tag {
          font-size: 11px;
          font-weight: 600;
          color: #013a17;
          background: #e6ebe7;
          padding: 4px 10px;
          border-radius: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .popular-specs-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 8px;
          font-size: 13px;
          color: #4b5563;
        }
        .popular-price {
          font-size: 15px;
          font-weight: 700;
          color: #013a17;
        }
        .popular-spec-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #6b7280;
        }
        
        @media (max-width: 768px) {
          .popular-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 20px;
          }
          .popular-nav-container {
            display: none; /* Hide buttons on mobile in favor of pure touch swipe */
          }
          .popular-card {
            width: 280px;
          }
          .popular-img-wrapper {
            height: 180px;
          }
        }
      `}</style>

      {/* Header Container */}
      <div className="popular-header">
        <div className="popular-title-container">
          <h2 className="popular-title">{title}</h2>
          <p className="popular-subtitle">
            Featured listings get more <strong>views</strong> and <strong>buyers</strong>
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
              history.push(`/propertys/property/${tour.adId}`);
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