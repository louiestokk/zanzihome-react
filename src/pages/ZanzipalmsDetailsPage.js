import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BiMap } from "react-icons/bi";
import Karusell from "../components/Karusell";
import CompanyLeadForm from "../components/CompanyLeadForm";
import Abovefooter from "../components/Abovefooter";
import MatchRequestStepper from "../components/MatchRequestStepper";

const ZanzipalmsDetailsPage = () => {
  const { id } = useParams();
  const history = useHistory();
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
        <style>{`
          .detail-spinner {
            border: 4px solid rgba(1, 58, 23, 0.1);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border-left-color: #013a17;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Listing Not Found</h2>
        <p>This property could not be loaded or is no longer available.</p>
        <button onClick={() => history.push("/partners/zanzipalms")} style={{ marginTop: "20px", padding: "10px 20px", background: "#013a17", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Back to Zanzipalms Listings
        </button>
      </div>
    );
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="property-details-page">
      <Helmet>
        <title>{`${property.title} in ${property.Area} | Zanzipalms Partner`}</title>
        <meta
          name="description"
          content={`Explore ${property.title} in ${property.Area}, Zanzibar. Priced at ${property.price}, this property offers ${property.rooms} bedrooms and ${property.size} sqm. Contact us directly.`}
        />
        <link rel="canonical" href={currentUrl} />
      </Helmet>

      <style>{`
        .property-details-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 15px;
          font-family: 'Poppins', sans-serif;
          color: #1f2937;
          box-sizing: border-box;
          width: 100%;
        }

        .property-main-header {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }
        @media (min-width: 768px) {
          .property-main-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
          }
        }

        .header-title-box {
          flex: 1;
        }

        .property-badge {
          display: inline-block;
          background: #e6ece8;
          color: #013a17;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 30px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .property-main-title {
          font-size: 26px;
          font-weight: 800;
          color: #111827;
          margin: 0 0 4px 0;
          line-height: 1.25;
        }

        .property-main-location {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .property-grid-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
          align-items: start;
          width: 100%;
        }
        @media (min-width: 992px) {
          .property-grid-layout {
            grid-template-columns: 63% 37%;
          }
        }

        .layout-main-col {
          display: flex;
          flex-direction: column;
          gap: 30px;
          min-width: 0;
          width: 100%;
          box-sizing: border-box;
        }

        .layout-side-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 0;
          width: 100%;
          box-sizing: border-box;
        }
        @media (min-width: 992px) {
          .layout-side-col {
            position: sticky;
            top: 20px;
          }
        }

        .details-section-box {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
        }

        .section-box-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 16px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .wp-content-description {
          line-height: 1.8;
          color: #374151;
          font-size: 15px;
        }
        .wp-content-description p {
          margin-bottom: 1.2rem;
        }
        .wp-content-description ul {
          margin: 1rem 0;
          padding-left: 1.5rem;
          list-style-type: disc;
        }
        .wp-content-description li {
          margin-bottom: 0.5rem;
        }

        .facts-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
        }
        .facts-card-price {
          font-size: 28px;
          font-weight: 800;
          color: #013a17;
          margin-bottom: 20px;
          border-bottom: 1px solid #f3f4f6;
          padding-bottom: 15px;
        }
        .facts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 20px;
        }
        .fact-item {
          display: flex;
          flex-direction: column;
        }
        .fact-label {
          font-size: 10px;
          font-weight: 700;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .fact-value {
          font-size: 14.5px;
          font-weight: 700;
          color: #1f2937;
          margin-top: 3px;
        }

        .single-fallback-image-wrapper {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          width: 100%;
          height: 56vw;
          max-height: 320px;
          min-height: 220px;
        }
        @media (min-width: 768px) {
          .single-fallback-image-wrapper {
            height: 450px;
            max-height: none;
            min-height: none;
          }
        }
        .single-fallback-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #013a17;
          font-weight: 600;
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 16px;
          transition: transform 0.2s ease;
        }
        .back-link:hover {
          transform: translateX(-4px);
        }
      `}</style>

      {/* Back to Partner listings link */}
      <Link to="/partners/zanzipalms" className="back-link">
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
