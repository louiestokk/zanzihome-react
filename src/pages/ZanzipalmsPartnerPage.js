import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BiMap } from "react-icons/bi";
import Abovefooter from "../components/Abovefooter";
import AdBanner from "../components/AdBanner";
import MatchRequestStepper from "../components/MatchRequestStepper";

const ZanzipalmsPartnerPage = () => {
  const history = useHistory();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Filter states
  const [offerType, setOfferType] = useState("All"); // All, Sale, Rent
  const [propertyType, setPropertyType] = useState("All"); // All, House, Apartment, Land, Business
  const [selectedArea, setSelectedArea] = useState("Whole Zanzibar");
  const [dynamicAreas, setDynamicAreas] = useState([]);

  const mapWordPressProperty = (wpItem) => {
    const classes = wpItem.class_list || [];
    
    // 1. Extract location/city from class_list
    const cityClass = classes.find(c => c.startsWith('property_city-'));
    let city = 'Zanzibar';
    if (cityClass) {
      const rawCity = cityClass.replace('property_city-', '').replace('-2', '');
      city = rawCity.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    // 2. Map property type
    const typeClass = classes.find(c => c.startsWith('property_type-'));
    let category = 'House';
    if (typeClass) {
      if (typeClass.includes('condominium') || typeClass.includes('apartment')) category = 'Apartment';
      else if (typeClass.includes('land') || typeClass.includes('beachfront') || typeClass.includes('farmland')) category = 'Land';
      else if (typeClass.includes('hotel') || typeClass.includes('business')) category = 'Business';
    }

    // 3. Map offer type
    const statusClass = classes.find(c => c.startsWith('property_status-'));
    const isRent = statusClass ? statusClass.includes('rent') : false;

    // 4. Parse details (price, size, rooms) from HTML body
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

    // 5. Featured Image
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
      rooms,
      description: bodyText
    };
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("https://zanzipalms.com/wp-json/wp/v2/property?_embed&per_page=100");
        if (!response.ok) throw new Error("API request failed");
        const data = await response.json();
        const mapped = data.map(mapWordPressProperty);
        setProperties(mapped);
        setFilteredProperties(mapped);

        // Generate dynamic area options
        const areas = Array.from(new Set(mapped.map(p => p.Area))).filter(Boolean).sort();
        setDynamicAreas(areas);
      } catch (err) {
        console.error("Error fetching Zanzipalms partner listings:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = [...properties];

    if (offerType !== "All") {
      result = result.filter(p => p.Rent === offerType);
    }

    if (propertyType !== "All") {
      result = result.filter(p => p.category === propertyType);
    }

    if (selectedArea !== "Whole Zanzibar") {
      result = result.filter(p => p.Area === selectedArea);
    }

    setFilteredProperties(result);
  }, [offerType, propertyType, selectedArea, properties]);

  return (
    <section style={{ fontFamily: "Poppins, sans-serif", background: "#fafbfa", paddingBottom: "40px" }}>
      <Helmet>
        <title>Zanzipalms Luxury Real Estate Agency | ZanziHome Partner</title>
        <meta name="description" content="Discover premium properties, beachfront villas, plots and luxury condos in Paje, Jambiani and across Zanzibar from Zanzipalms. Contact verified agents." />
        <link rel="canonical" href="https://www.zanzihome.com/partners/zanzipalms" />
      </Helmet>

      <style>{`
        /* Hero Banner */
        .partner-page-hero {
          background: linear-gradient(135deg, #013a17 0%, #153d20 50%, #0d2818 100%);
          color: #ffffff;
          padding: 70px 20px;
          text-align: center;
          position: relative;
        }
        .partner-page-hero::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 24px;
          background: #fafbfa;
          clip-path: ellipse(60% 100% at 50% 100%);
          z-index: 1;
        }
        .partner-breadcrumbs {
          display: flex;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          color: #a3b899;
          margin-bottom: 14px;
        }
        .partner-breadcrumbs a {
          color: #a3b899;
          text-decoration: none;
          transition: color 0.2s;
        }
        .partner-breadcrumbs a:hover {
          color: #ffffff;
        }
        .partner-page-hero-title {
          font-size: 40px;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .partner-page-hero-subtitle {
          font-size: 15px;
          color: #d1e2c9;
          max-width: 600px;
          margin: 12px auto 0 auto;
          font-weight: 300;
          line-height: 1.5;
        }

        /* Filter Dashboard */
        .partner-filter-wrapper {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(1, 58, 23, 0.03);
          border: 1px solid rgba(1, 58, 23, 0.05);
          max-width: 1200px;
          margin: -30px auto 30px auto;
          position: relative;
          z-index: 10;
        }
        .partner-filter-row {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .partner-filter-row {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
          }
        }
        .filter-group-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 700;
          color: #6b7280;
          margin-bottom: 8px;
        }
        .segmented-group {
          display: inline-flex;
          background: #f3f4f6;
          padding: 4px;
          border-radius: 30px;
          gap: 4px;
        }
        .segmented-btn {
          border: none;
          background: transparent;
          color: #4b5563;
          padding: 8px 20px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .segmented-btn.active {
          background: #013a17;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(1, 58, 23, 0.2);
        }
        .tags-group {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .tag-btn {
          border: 1px solid #e5e7eb;
          background: #ffffff;
          color: #374151;
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 500;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .tag-btn:hover {
          border-color: #013a17;
          color: #013a17;
        }
        .tag-btn.active {
          background: #e6ebe7;
          border-color: #013a17;
          color: #013a17;
          font-weight: 600;
        }
        .select-group-container {
          min-width: 220px;
        }
        .select-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: #f3f4f6;
          border-radius: 30px;
          padding: 4px 16px;
          border: 1px solid transparent;
          transition: all 0.3s ease;
        }
        .select-wrapper:focus-within {
          border-color: #013a17;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(1, 58, 23, 0.1);
        }
        .select-icon {
          font-size: 20px;
          color: #013a17;
          margin-right: 8px;
        }
        .select-field {
          width: 100%;
          border: none;
          background: transparent;
          color: #111827;
          font-size: 14px;
          font-weight: 600;
          padding: 8px 0;
          cursor: pointer;
          outline: none;
        }

        /* Grid */
        .grid-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 16px;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 28px;
        }

        /* Card Layout */
        .prop-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(1, 58, 23, 0.05);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
          background: #ffffff;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .prop-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(1, 58, 23, 0.08);
          border-color: rgba(1, 58, 23, 0.15);
        }
        .prop-img-wrapper {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: #e5e7eb;
        }
        .prop-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .prop-card:hover .prop-img {
          transform: scale(1.05);
        }
        .prop-badge-partner {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(1, 58, 23, 0.85);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 30px;
          text-transform: uppercase;
          z-index: 2;
        }
        .prop-badge-transaction {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #FFD700;
          color: #000;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 30px;
          text-transform: uppercase;
          z-index: 2;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .prop-card-body {
          padding: 22px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .prop-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .prop-category-tag {
          font-size: 11px;
          font-weight: 700;
          color: #013a17;
          background: #e6ebe7;
          padding: 4px 10px;
          border-radius: 30px;
          text-transform: uppercase;
        }
        .prop-title {
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
        .prop-card:hover .prop-title {
          color: #013a17;
        }
        .prop-price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .prop-price {
          font-size: 19px;
          font-weight: 800;
          color: #013a17;
        }
        .prop-specs {
          display: flex;
          gap: 12px;
          font-size: 13px;
          color: #4b5563;
          border-top: 1px solid #f3f4f6;
          padding-top: 12px;
        }
        .prop-spec-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Loading Skeletons */
        .skeleton-card {
          border-radius: 20px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.05);
          height: 380px;
          animation: pulse 1.5s infinite ease-in-out;
        }
        .skeleton-img {
          height: 220px;
          background: #e5e7eb;
        }
        .skeleton-body {
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .skeleton-bar {
          background: #e5e7eb;
          height: 16px;
          border-radius: 4px;
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>

      {/* Hero Header */}
      <section className="partner-page-hero">
        <div className="partner-breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Zanzipalms Partner</span>
        </div>
        <h1 className="partner-page-hero-title">Zanzipalms Listings</h1>
        <p className="partner-page-hero-subtitle">
          Explore Zanzipalms' luxury catalog on ZanziHome. Find premium villas, apartments, beachfront plots, and commercial projects across the island.
        </p>
      </section>

      {/* Filter Dashboard */}
      <div className="partner-filter-wrapper">
        <div className="partner-filter-row">
          
          {/* Offer Type */}
          <div>
            <div className="filter-group-label">Offer Type</div>
            <div className="segmented-group">
              <button
                className={`segmented-btn ${offerType === "All" ? "active" : ""}`}
                onClick={() => setOfferType("All")}
              >
                All
              </button>
              <button
                className={`segmented-btn ${offerType === "Sale" ? "active" : ""}`}
                onClick={() => setOfferType("Sale")}
              >
                For Sale
              </button>
              <button
                className={`segmented-btn ${offerType === "Rent" ? "active" : ""}`}
                onClick={() => setOfferType("Rent")}
              >
                For Rent
              </button>
            </div>
          </div>

          {/* Property Category */}
          <div>
            <div className="filter-group-label">Property Type</div>
            <div className="tags-group">
              {["All", "House", "Apartment", "Land", "Business"].map((type) => (
                <button
                  key={type}
                  className={`tag-btn ${propertyType === type ? "active" : ""}`}
                  onClick={() => setPropertyType(type)}
                >
                  {type === "All" ? "All Types" : type}
                </button>
              ))}
            </div>
          </div>

          {/* Location Dropdown */}
          <div className="select-group-container">
            <div className="filter-group-label">Location</div>
            <div className="select-wrapper">
              <BiMap className="select-icon" />
              <select
                className="select-field"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                <option value="Whole Zanzibar">Whole Zanzibar</option>
                {dynamicAreas.map((area, idx) => (
                  <option key={idx} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Main Grid */}
      <div className="grid-container">
        {loading ? (
          <div className="cards-grid">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="skeleton-card">
                <div className="skeleton-img" />
                <div className="skeleton-body">
                  <div className="skeleton-bar" style={{ width: "40%" }} />
                  <div className="skeleton-bar" style={{ width: "90%" }} />
                  <div className="skeleton-bar" style={{ width: "60%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#b91c1c" }}>
            Failed to load properties from Zanzipalms. Please try again later.
          </div>
        ) : filteredProperties.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
            No properties found matching your filters.
          </div>
        ) : (
          <div className="cards-grid">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                className="prop-card"
                onClick={() => history.push(`/partners/zanzipalms/property/${prop.id}`)}
              >
                {/* Image */}
                <div className="prop-img-wrapper">
                  <img
                    loading="lazy"
                    src={prop.url}
                    alt={prop.title}
                    className="prop-img"
                  />
                  <div className="prop-badge-partner">🌴 Zanzipalms</div>
                  <div className="prop-badge-transaction">
                    {prop.Rent === "Rent" ? "For Rent" : "For Sale"}
                  </div>
                </div>

                {/* Card Body */}
                <div className="prop-card-body">
                  <div>
                    <div className="prop-card-header">
                      <span className="prop-category-tag">{prop.category}</span>
                    </div>
                    <h3 className="prop-title">{prop.title}</h3>
                  </div>

                  <div>
                    <div className="prop-price-row">
                      <span className="prop-price">{prop.price}</span>
                    </div>
                    
                    <div className="prop-specs">
                      <div className="prop-spec-item">
                        <BiMap style={{ color: "#013a17", fontSize: "16px" }} />
                        <span>{prop.Area}</span>
                      </div>
                      {prop.size && (
                        <div className="prop-spec-item" style={{ marginLeft: "auto" }}>
                          <span>{prop.size} m²</span>
                        </div>
                      )}
                      {prop.rooms > 0 && (
                        <div className="prop-spec-item">
                          <span>{prop.rooms} {prop.rooms > 1 ? "Beds" : "Bed"}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ maxWidth: "1200px", margin: "2rem auto" }}>
        <MatchRequestStepper />
      </div>

      <Abovefooter />
    </section>
  );
};

export default ZanzipalmsPartnerPage;
