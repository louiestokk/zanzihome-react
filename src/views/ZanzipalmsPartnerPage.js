"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { BiMap } from "react-icons/bi";
import Abovefooter from "../components/Abovefooter";
import AdBanner from "../components/AdBanner";
import MatchRequestStepper from "../components/MatchRequestStepper";
import { zanzipalmsStaticData } from "../utils/zanzipalmsData";

const ZanzipalmsPartnerPage = () => {
  const router = useRouter();
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
    
    // Look up static data first
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
      

      

      {/* Hero Header */}
      <section className="partner-page-hero">
        <div className="partner-breadcrumbs">
          <Link href="/">Home</Link>
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
                onClick={() => router.push(`/partners/zanzipalms/property/${prop.id}`)}
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
