import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const PartnerFeaturedSection = () => {
  const history = useHistory();
  const scrollRef = useRef(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const mapWordPressProperty = (wpItem) => {
    const classes = wpItem.class_list || [];
    
    const cityClass = classes.find(c => c.startsWith('property_city-'));
    let city = 'Zanzibar';
    if (cityClass) {
      const rawCity = cityClass.replace('property_city-', '').replace('-2', '');
      city = rawCity.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    const typeClass = classes.find(c => c.startsWith('property_type-')) || '';
    const titleText = (wpItem.title?.rendered || '').toLowerCase();
    
    let category = 'House';
    if (typeClass.includes('land-for-sale') || typeClass.includes('beachfront') || typeClass.includes('farmland')) {
      category = 'Land';
    } else if (typeClass.includes('hotel') || typeClass.includes('business')) {
      category = 'Business';
    } else if (titleText.includes('villa')) {
      category = 'Villa';
    } else if (titleText.includes('condo') || typeClass.includes('condominium')) {
      category = 'Condo';
    } else if (titleText.includes('apartment') || typeClass.includes('apartment')) {
      category = 'Apartment';
    }

    const statusClass = classes.find(c => c.startsWith('property_status-'));
    const isRent = statusClass ? statusClass.includes('rent') : false;

    const bodyText = wpItem.content?.rendered || '';
    let price = 'Price on Request';
    const priceMatch = bodyText.match(/USD\s*([0-9,.]+)/i);
    if (priceMatch) {
      price = `$${priceMatch[1]}`;
    }

    let rooms = 0;
    const bedMatch = bodyText.match(/(\d+)\s*Bedroom/i);
    if (bedMatch) rooms = parseInt(bedMatch[1], 10);

    let size = '';
    const sizeMatch = bodyText.match(/([0-9,.]+)\s*(sqm|m²)/i);
    if (sizeMatch) size = sizeMatch[1];

    let imageUrl = 'https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg';
    if (wpItem._embedded?.['wp:featuredmedia']?.[0]) {
      imageUrl = wpItem._embedded['wp:featuredmedia'][0].source_url;
    } else if (wpItem.yoast_head_json?.og_image?.[0]) {
      imageUrl = wpItem.yoast_head_json.og_image[0].url;
    }

    return {
      id: wpItem.id,
      title: wpItem.title?.rendered || '',
      url: imageUrl,
      category,
      Area: city,
      Rent: isRent ? 'Rent' : 'Sale',
      price,
      size,
      rooms
    };
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("https://zanzipalms.com/wp-json/wp/v2/property?_embed&per_page=10");
        if (!response.ok) throw new Error("API request failed");
        const data = await response.json();
        const mapped = data.map(mapWordPressProperty);
        setProperties(mapped);
      } catch (err) {
        console.error("Error fetching partner listings:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

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
  }, [properties]);

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

  if (error) return null; // Gracefully hide the component if there's an API error

  return (
    <section className="partner-featured-section">
      <style>{`
        .partner-featured-section {
          width: 100%;
          padding: 50px 16px;
          background: #f0f4f1;
          overflow: hidden;
          border-top: 1px solid rgba(1, 58, 23, 0.08);
          border-bottom: 1px solid rgba(1, 58, 23, 0.08);
        }
        .partner-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          max-width: 1200px;
          margin: 0 auto 28px auto;
        }
        .partner-title-container {
          text-align: left;
        }
        .partner-badge {
          display: inline-block;
          background: #013a17;
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .partner-title {
          font-size: 28px;
          font-weight: 700;
          color: #013a17;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .partner-subtitle {
          font-size: 14px;
          color: #4b5563;
          margin: 6px 0 0 0;
        }
        .partner-nav-container {
          display: flex;
          gap: 12px;
        }
        .partner-nav-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid #d1d5db;
          background: #ffffff;
          color: #013a17;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        .partner-nav-btn:hover:not(:disabled) {
          background: #013a17;
          color: #ffffff;
          border-color: #013a17;
          box-shadow: 0 4px 12px rgba(1, 58, 23, 0.2);
        }
        .partner-nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          background: #f3f4f6;
          color: #9ca3af;
          border-color: #e5e7eb;
        }
        .partner-scroll-container {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          max-width: 1200px;
          margin: 0 auto;
          padding: 8px 4px 24px 4px;
          scrollbar-width: none;
        }
        .partner-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .partner-card {
          position: relative;
          cursor: pointer;
          border-radius: 16px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          border: 1px solid rgba(1, 58, 23, 0.05);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          scroll-snap-align: start;
          width: 320px;
          flex-shrink: 0;
        }
        .partner-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 35px rgba(1, 58, 23, 0.08);
          border-color: rgba(1, 58, 23, 0.15);
        }
        .partner-img-wrapper {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: #e5e7eb;
        }
        .partner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .partner-card:hover .partner-img {
          transform: scale(1.08);
        }
        .partner-card-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(1, 58, 23, 0.85);
          backdrop-filter: blur(4px);
          color: #ffffff;
          padding: 6px 12px;
          font-size: 11px;
          font-weight: 700;
          border-radius: 20px;
          z-index: 2;
          letter-spacing: 0.3px;
        }
        .partner-card-status-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          background: #FFD700;
          color: #000;
          padding: 6px 12px;
          font-size: 11px;
          font-weight: 700;
          border-radius: 20px;
          z-index: 2;
          letter-spacing: 0.3px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .partner-img-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(to top, rgba(0,0,0,0.2), transparent);
          z-index: 1;
        }
        .partner-card-content {
          padding: 20px;
        }
        .partner-card-title {
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
        .partner-card:hover .partner-card-title {
          color: #013a17;
        }
        .partner-specs-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 8px;
          font-size: 13px;
          color: #4b5563;
        }
        .partner-price {
          font-size: 15px;
          font-weight: 700;
          color: #013a17;
        }
        .partner-spec-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #6b7280;
        }
        .partner-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #f3f4f6;
        }
        .partner-location {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          color: #6b7280;
        }
        .partner-type-tag {
          font-size: 11px;
          font-weight: 600;
          color: #013a17;
          background: #e6ebe7;
          padding: 4px 10px;
          border-radius: 12px;
          text-transform: uppercase;
        }
        .partner-cta-container {
          text-align: center;
          margin-top: 24px;
        }
        .partner-see-all-btn {
          display: inline-block;
          padding: 12px 30px;
          background: #013a17;
          color: #ffffff;
          border: none;
          border-radius: 30px;
          font-size: 14.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(1, 58, 23, 0.15);
        }
        .partner-see-all-btn:hover {
          background: #0b8b3a;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(11, 139, 58, 0.25);
        }
        /* Loading Skeleton */
        .skeleton-card {
          width: 320px;
          height: 380px;
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.05);
          padding: 0;
          overflow: hidden;
          flex-shrink: 0;
        }
        .skeleton-image {
          height: 220px;
          background: #e5e7eb;
          animation: pulse 1.5s infinite ease-in-out;
        }
        .skeleton-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .skeleton-line {
          height: 16px;
          background: #e5e7eb;
          border-radius: 4px;
          animation: pulse 1.5s infinite ease-in-out;
        }
        .skeleton-title {
          width: 85%;
          height: 20px;
        }
        .skeleton-subtitle {
          width: 50%;
        }
        .skeleton-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
        .skeleton-footer-item {
          width: 30%;
          height: 20px;
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        @media (max-width: 768px) {
          .partner-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 20px;
          }
          .partner-nav-container {
            display: none;
          }
          .partner-card, .skeleton-card {
            width: 280px;
          }
          .partner-img-wrapper, .skeleton-image {
            height: 180px;
          }
        }
      `}</style>

      {/* Header Container */}
      <div className="partner-header">
        <div className="partner-title-container">
          <span className="partner-badge">Partner Agent</span>
          <h2 className="partner-title">Zanzipalms Properties</h2>
          <p className="partner-subtitle">
            Luxury properties from our verified partner <strong>Zanzipalms</strong>
          </p>
        </div>

        {/* Navigation Buttons (Desktop only) */}
        {!loading && properties.length > 0 && (
          <div className="partner-nav-container">
            <button
              onClick={() => handleScroll("left")}
              className="partner-nav-btn"
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
              className="partner-nav-btn"
              disabled={!canScrollRight}
              aria-label="Next properties"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Horizontal Scroll Container */}
      <div className="partner-scroll-container" ref={scrollRef}>
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="skeleton-card">
              <div className="skeleton-image" />
              <div className="skeleton-content">
                <div className="skeleton-line skeleton-title" />
                <div className="skeleton-line skeleton-subtitle" />
                <div className="skeleton-footer">
                  <div className="skeleton-line skeleton-footer-item" />
                  <div className="skeleton-line skeleton-footer-item" />
                </div>
              </div>
            </div>
          ))
        ) : properties.length === 0 ? (
          <div style={{ padding: "40px", color: "#6b7280", textAlign: "center", width: "100%" }}>
            No properties found at the moment.
          </div>
        ) : (
          properties.map((tour) => (
            <div
              key={tour.id}
              className="partner-card"
              onClick={() => {
                history.push(`/partners/zanzipalms/property/${tour.id}`);
              }}
            >
              {/* Image Wrapper */}
              <div className="partner-img-wrapper">
                <img
                  loading="lazy"
                  src={tour.url}
                  alt={`${tour.title} Zanzipalms`}
                  title={`${tour.title} Zanzipalms`}
                  className="partner-img"
                />

                {/* Badges */}
                <div className="partner-card-badge">🌴 Zanzipalms</div>
                <div className="partner-card-status-badge">
                  {tour.Rent === "Rent" ? "For Rent" : "For Sale"}
                </div>

                {/* Bottom Gradient overlay */}
                <div className="partner-img-overlay" />
              </div>

              {/* Content Details */}
              <div className="partner-card-content">
                <h3 className="partner-card-title">{tour.title}</h3>

                {/* Price and Specs row */}
                <div className="partner-specs-row">
                  <span className="partner-price">{tour.price}</span>
                  {tour.size && (
                    <div className="partner-spec-item">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                      <span>{tour.size} sqm</span>
                    </div>
                  )}
                  {tour.rooms > 0 && (
                    <div className="partner-spec-item">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      <span>{tour.rooms} {tour.rooms > 1 ? "Beds" : "Bed"}</span>
                    </div>
                  )}
                </div>

                {/* Meta row containing Location and Property Type Tag */}
                <div className="partner-meta-row">
                  <div className="partner-location">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#013a17" }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{tour.Area}</span>
                  </div>
                  <span className="partner-type-tag">{tour.category}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Button to see all Zanzipalms listings */}
      {!loading && properties.length > 0 && (
        <div className="partner-cta-container">
          <button
            onClick={() => history.push("/partners/zanzipalms")}
            className="partner-see-all-btn"
          >
            See All Zanzipalms Listings
          </button>
        </div>
      )}
    </section>
  );
};

export default PartnerFeaturedSection;
