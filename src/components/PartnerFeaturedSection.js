"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zanzipalmsStaticData } from "../utils/zanzipalmsData";

const PartnerFeaturedSection = () => {
  const router = useRouter();
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
    const staticData = zanzipalmsStaticData[wpItem.id];
    
    let price = 'Price on Request';
    if (staticData && staticData.price) {
      price = staticData.price;
    } else {
      const priceMatch = bodyText.match(/USD\s*([0-9,.]+)/i);
      if (priceMatch) {
        price = `$${priceMatch[1]}`;
      }
    }

    let rooms = 0;
    if (staticData && staticData.bedrooms !== null) {
      rooms = staticData.bedrooms;
    } else {
      const bedMatch = bodyText.match(/(\d+)\s*Bedroom/i);
      if (bedMatch) rooms = parseInt(bedMatch[1], 10);
    }

    let size = '';
    if (staticData && staticData.size) {
      size = staticData.size;
    } else {
      const sizeMatch = bodyText.match(/([0-9,.]+)\s*(sqm|m²)/i);
      if (sizeMatch) size = sizeMatch[1];
    }

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
    <section className="popular-section">
      

      {/* Header Container */}
      <div className="popular-header">
        <div className="popular-title-container">
          <span className="partner-badge" style={{ display: "inline-block", marginBottom: "8px" }}>Partner Agent</span>
          <h2 className="popular-title">Zanzipalms Properties</h2>
          <p className="popular-subtitle">
            Luxury properties from our verified partner <strong>Zanzipalms</strong>
          </p>
        </div>

        {/* Navigation Buttons (Desktop only) */}
        {!loading && properties.length > 0 && (
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
        )}
      </div>

      {/* Horizontal Scroll Container */}
      <div className="popular-scroll-container" ref={scrollRef}>
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
              className="popular-card"
              onClick={() => {
                router.push(`/partners/zanzipalms/property/${tour.id}`);
              }}
            >
              {/* Image Wrapper */}
              <div className="popular-img-wrapper">
                <img
                  loading="lazy"
                  src={tour.url}
                  alt={`${tour.title} Zanzipalms`}
                  title={`${tour.title} Zanzipalms`}
                  className="popular-img"
                />

                {/* Badges */}
                <div className="popular-badge-container">
                  <span className="popular-badge-featured" style={{ background: "rgba(1, 58, 23, 0.85)", color: "#fff" }}>
                    🌴 Zanzipalms
                  </span>
                  <span className="popular-badge-featured" style={{ background: "#FFD700", color: "#000" }}>
                    {tour.Rent === "Rent" ? "For Rent" : "For Sale"}
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
                  <span className="popular-price">{tour.price}</span>
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
                  {tour.rooms > 0 && (
                    <div className="popular-spec-item">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      <span>{tour.rooms} {tour.rooms > 1 ? "Beds" : "Bed"}</span>
                    </div>
                  )}
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
          ))
        )}
      </div>

      {/* Button to see all Zanzipalms listings */}
      {!loading && properties.length > 0 && (
        <div className="partner-cta-container">
          <button
            onClick={() => router.push("/partners/zanzipalms")}
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
