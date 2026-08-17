"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";


import { BiMap } from "react-icons/bi";
import Karusell from "../components/Karusell";
import CompanyLeadForm from "../components/CompanyLeadForm";
import Abovefooter from "../components/Abovefooter";
import MatchRequestStepper from "../components/MatchRequestStepper";
import { zanzipalmsStaticData } from "../utils/zanzipalmsData";

const ZanzipalmsDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

    let bathrooms = 0;
    if (staticData && staticData.bathrooms !== null) {
      bathrooms = staticData.bathrooms;
    }

    // 5. Featured Image
    let imageUrl = 'https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg';
    if (wpItem._embedded?.['wp:featuredmedia']?.[0]) {
      imageUrl = wpItem._embedded['wp:featuredmedia'][0].source_url;
    } else if (wpItem.yoast_head_json?.og_image?.[0]) {
      imageUrl = wpItem.yoast_head_json.og_image[0].url;
    }

    // Gallery array
    let imagesArray = [imageUrl];
    if (wpItem._embedded?.['wp:attachment']?.[0]) {
      const attachments = wpItem._embedded['wp:attachment'][0] || [];
      const galleryUrls = attachments
        .filter(item => item.mime_type?.startsWith('image/'))
        .map(item => item.source_url);
      if (galleryUrls.length > 0) {
        imagesArray = galleryUrls;
      }
    }

    return {
      id: wpItem.id,
      title: wpItem.title?.rendered || '',
      url: imageUrl,
      imagesArray,
      category,
      Area: city,
      Rent: isRent ? 'Rent' : 'Sale',
      price,
      size,
      rooms,
      bathrooms,
      description: bodyText
    };
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`https://zanzipalms.com/wp-json/wp/v2/property/${id}?_embed`);
        if (!response.ok) throw new Error("API request failed");
        const data = await response.json();
        const mapped = mapWordPressProperty(data);
        setProperty(mapped);
      } catch (err) {
        console.error("Error fetching property detail:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPropertyDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
        <div className="detail-spinner" />
        
      </div>
    );
  }

  if (error || !property) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Listing Not Found</h2>
        <p>This property could not be loaded or is no longer available.</p>
        <button onClick={() => router.push("/partners/zanzipalms")} style={{ marginTop: "20px", padding: "10px 20px", background: "#013a17", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Back to Zanzipalms Listings
        </button>
      </div>
    );
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="property-details-page">
      

      

      {/* Back to Partner listings link */}
      <Link href="/partners/zanzipalms" className="back-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Back to Zanzipalms Listings</span>
      </Link>

      {/* Header Info */}
      <div className="property-main-header">
        <div className="header-title-box">
          <span className="property-badge">
            🌴 Zanzipalms Partner • {property.Rent === "Rent" ? "For Rent" : "For Sale"}
          </span>
          <h1 className="property-main-title">{property.title}</h1>
          <p className="property-main-location">
            <BiMap style={{ color: "#013a17", fontSize: "18px" }} />
            <span>{property.Area}, Zanzibar</span>
          </p>
        </div>
      </div>

      {/* Layout Split Grid */}
      <div className="property-grid-layout">
        
        {/* Left Main Column */}
        <div className="layout-main-col">
          
          {/* Carousel */}
          <div style={{ width: "100%", overflow: "hidden" }}>
            {property.imagesArray && property.imagesArray.length > 1 ? (
              <Karusell imagesArray={property.imagesArray} uri={property.url} />
            ) : (
              <div className="single-fallback-image-wrapper">
                <img
                  src={property.url}
                  alt={property.title}
                  className="single-fallback-image"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="details-section-box">
            <h3 className="section-box-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: "6px" }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
              <span>Description</span>
            </h3>
            <div 
              className="wp-content-description"
              dangerouslySetInnerHTML={{ __html: property.description }} 
            />
          </div>

        </div>

        {/* Right Sidebar Column */}
        <div className="layout-side-col">
          
          {/* Facts Card */}
          <div className="facts-card">
            <div className="facts-card-price">
              {property.price}
            </div>

            <div className="facts-grid">
              <div className="fact-item">
                <span className="fact-label">Type</span>
                <span className="fact-value">{property.category}</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Size</span>
                <span className="fact-value">{property.size ? `${property.size} m²` : "—"}</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Rooms</span>
                <span className="fact-value">{property.rooms || "—"}</span>
              </div>
              {property.bathrooms > 0 && (
                <div className="fact-item">
                  <span className="fact-label">Baths</span>
                  <span className="fact-value">{property.bathrooms}</span>
                </div>
              )}
              <div className="fact-item">
                <span className="fact-label">Status</span>
                <span className="fact-value">{property.Rent === "Rent" ? "For Rent" : "For Sale"}</span>
              </div>
            </div>
          </div>

          {/* Company Contact Form */}
          <CompanyLeadForm
            listingTitle={property.title}
            listingId={property.id}
            companyName="Zanzipalms"
            companyEmail="sales@zanzipalms.com"
            isCompany={true}
            about="Zanzipalms is a premium real estate agency in Zanzibar specializing in luxury beachfront villas, plots, and apartments."
          />

        </div>

      </div>

      <div style={{ maxWidth: "1200px", margin: "2rem auto" }}>
        <MatchRequestStepper />
      </div>

      <Abovefooter />
    </div>
  );
};

export default ZanzipalmsDetailsPage;
