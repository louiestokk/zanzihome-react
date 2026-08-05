import React, { useState, useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import SingelObjectInfo from "./SingelObjectInfo";
import Brokers from "./Brokers";
import { useUserContext } from "../user_context";
import { useSelector } from "react-redux";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import Karusell from "./Karusell";
import SingelPageMap from "./SingelPageMap";
import SingeldefaultMapMapPage from "./SingeldefaultMapMapPage";
import AdBanner from "./AdBanner";
import Abovefooter from "./Abovefooter";
import MatchRequestStepper from "./MatchRequestStepper";
import { Helmet } from "react-helmet-async";
import { pageData } from "../pages/guides/data";

const SingelFirebaseObject = () => {
  const location = useLocation();
  const history = useHistory();
  const firestoreData = useSelector(getFirestoreData);
  const { saved, setSaved, user, loginWithRedirect } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [recivied, setRecivied] = useState(false);
  const { adId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [adId]);

  const selectedObjects = firestoreData.filter((object) =>
    location.pathname.includes(object.adId)
  );
  const currentObject = selectedObjects[0];
  const Area = currentObject?.Area;
const currentUrl = typeof window !== "undefined" ? window.location.href : "";
const faqs = [
  {
    q: `How to buy property in ${Area}?`,
    a: "Browse listings, contact agents, and complete the legal process with assistance from local experts."
  },
  {
    q: `Can foreigners buy property in ${Area}, Zanzibar?`,
    a: "Yes, foreigners can buy property through leasehold agreements approved by the Zanzibar government."
  },
  {
    q: `Can I rent in ${Area}?`,
    a: "Yes, both rental and sale properties are available across Zanzibar."
  },
  {
    q: `Is ${Area} a good investment area?`,
    a: `${Area} is one of the most attractive locations in Zanzibar with strong tourism demand and rental income potential.`
  },
  {
    q: `What is the average price of property in ${Area}?`,
    a: "Prices vary depending on property type, location and proximity to the beach."
  }
];
console.log(currentObject)
const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="property-details-page">
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

        /* Header section styles */
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

        .header-action-box {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 10px;
        }
        @media (min-width: 768px) {
          .header-action-box {
            margin-top: 0;
          }
        }

        .btn-action-outline {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          color: #374151;
          padding: 10px 18px;
          border-radius: 12px;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }
        .btn-action-outline:hover {
          background: #f9fafb;
          border-color: #cbd5e1;
        }

        .btn-action-outline .fill-hjarta {
          color: #ef4444;
          fill: #ef4444;
        }

        /* 2-Column Split Grid */
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

        /* Section boxes in main column */
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

        /* Sidebar Cards */
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

        .sidebar-boost-card {
          background: linear-gradient(135deg, #013a17 0%, #0d2818 100%);
          color: #ffffff;
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 10px 25px rgba(1, 58, 23, 0.12);
        }
        .boost-card-title {
          font-size: 18px;
          font-weight: 800;
          margin: 0 0 8px 0;
        }
        .boost-card-text {
          font-size: 13px;
          color: #d1e2c9;
          line-height: 1.5;
          margin: 0 0 20px 0;
          font-weight: 300;
        }
        .btn-sidebar-boost {
          width: 100%;
          background: #ffffff;
          color: #013a17;
          border: none;
          padding: 12px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-sidebar-boost:hover {
          background: #d1e2c9;
          transform: translateY(-1px);
        }

        /* Map styling */
        .map-section-wrapper {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }

        /* Fallback Single Image styling */
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
      `}</style>

      {selectedObjects.map((object) => {
        const {
          Name,
          Email,
          Phone,
          Sell,
          Rent,
          Area,
          category,
          Title,
          Text,
          Price,
          adId,
          Size,
          lat,
          lng,
          Rooms,
          uri,
          imagesArray,
          WhatsApp,
          About,
        } = object;

        const hasCoords = lat && lng && !isNaN(Number(lat)) && !isNaN(Number(lng)) && Number(lat) !== 0 && Number(lng) !== 0;

        return (
          <div key={adId} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* SEO HELMET */}
            <Helmet>
              {/* Basic Meta */}
              <title>{`${Title} in ${Area} | Real Estate ${Area} Zanzibar`}</title>
              <meta
                name="description"
                content={`Looking for ${category?.toLowerCase()} in ${Area}, Zanzibar? Explore ${Title} with ${Rooms} rooms, ${Size} m², priced at $${Price}. View photos, map location, and contact brokers now.`}
              />
              <link rel="canonical" href={currentUrl} />

              {/* Open Graph */}
              <meta property="og:title" content={`${Title} in ${Area} | ZanziHome`} />
              <meta property="og:description" content={`Explore this ${category?.toLowerCase()} in ${Area}, Zanzibar. ${Rooms} rooms, ${Size} m², priced at $${Price}. Contact brokers today.`} />
              <meta property="og:type" content="website" />
              <meta property="og:url" content={currentUrl} />
              <meta property="og:image" content={imagesArray?.[0] || uri} />
              <meta property="og:site_name" content="ZanziHome" />

              {/* Twitter Card */}
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content={`${Title} in ${Area} | ZanziHome`} />
              <meta name="twitter:description" content={`Discover ${Title} in ${Area}, Zanzibar. ${Rooms} rooms, ${Size} m², $${Price}. Browse photos and contact brokers.`} />
              <meta name="twitter:image" content={imagesArray?.[0] || uri} />
              <meta name="twitter:site" content="@ZanziHome" />

              {/* JSON-LD Structured Data */}
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@graph": [
                    {
                      "@type": "WebSite",
                      "name": "ZanziHome",
                      "url": "https://www.zanzihome.com/",
                      "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://www.zanzihome.com/search?q={search_term_string}",
                        "query-input": "required name=search_term_string"
                      }
                    },
                    {
                      "@type": "WebPage",
                      "name": `${Title} in ${Area}`,
                      "url": currentUrl,
                      "description": Text,
                      "breadcrumb": {
                        "@id": `${window.location.href}#breadcrumb`
                      },
                      "mainEntity": {
                        "@type": "SingleFamilyResidence",
                        "name": Title,
                        "description": Text,
                        "url": currentUrl,
                        "image": imagesArray || [uri],
                        "address": {
                          "@type": "PostalAddress",
                          "addressLocality": Area,
                          "addressCountry": "TZ"
                        },
                        "geo": {
                          "@type": "GeoCoordinates",
                          "latitude": lat ? Number(lat) : null,
                          "longitude": lng ? Number(lng) : null
                        },
                        "numberOfRooms": Rooms,
                        "floorSize": {
                          "@type": "QuantitativeValue",
                          "value": Size,
                          "unitCode": "MTK"
                        },
                        "offers": {
                          "@type": "Offer",
                          "price": Price,
                          "priceCurrency": "USD",
                          "url": currentUrl,
                          "availability": "https://schema.org/InStock",
                          "seller": {
                            "@type": "RealEstateAgent",
                            "name": Name,
                            "telephone": Phone,
                            "email": Email
                          }
                        }
                      }
                    },
                    {
                      "@type": "BreadcrumbList",
                      "@id": `${window.location.href}#breadcrumb`,
                      "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.zanzihome.com/" },
                        { "@type": "ListItem", "position": 2, "name": "Properties in Zanzibar", "item": "https://www.zanzihome.com/properties-zanzibar" },
                        { "@type": "ListItem", "position": 3, "name": Title, "item": window.location.href }
                      ]
                    },
                    {
                      "@type": "ItemList",
                      "name": `Other properties in ${Area}`,
                      "itemListElement": firestoreData
                        .filter(p => p.Area === Area && p.adId !== adId && p.adType !== 'Vehicle')
                        .slice(0, 6)
                        .map((p, index) => ({
                          "@type": "ListItem",
                          "position": index + 1,
                          "url": `https://www.zanzihome.com/propertys/property/${p.adId}/`,
                          "name": p.Title
                        }))
                    },
                    {
                      "@type": "FAQPage",
                      "mainEntity": [
                        {
                          "@type": "Question",
                          "name": `How to buy property in ${Area}, Zanzibar?`,
                          "acceptedAnswer": { "@type": "Answer", "text": `Browse available listings, contact brokers, and arrange viewings through ZanziHome.` }
                        },
                        {
                          "@type": "Question",
                          "name": `Can I rent ${category?.toLowerCase()} in ${Area}?`,
                          "acceptedAnswer": { "@type": "Answer", "text": `Yes, ZanziHome lists both rental and sale properties in ${Area}, Zanzibar.` }
                        }
                      ]
                    }
                  ]
                })}
              </script>
            </Helmet>

            {/* 1. Header Title & Actions Row */}
            <div className="property-main-header">
              <div className="header-title-box">
                <span className="property-badge">
                  {Sell === null && Rent === null ? "For Sale" : "For Rent"}
                </span>
                <h1 className="property-main-title">{Title}</h1>
                <p className="property-main-location">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: "4px" }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{Area}, Zanzibar</span>
                </p>
              </div>
              <div className="header-action-box">
                <button
                  onClick={() => {
                    if (user?.nickname) {
                      setSaved(!saved);
                      localStorage.setItem("zanzihomeSaved", adId);
                    } else {
                      loginWithRedirect();
                    }
                  }}
                  className="btn-action-outline"
                >
                  <AiFillHeart className={saved ? "fill-hjarta" : ""} style={{ fontSize: "16px" }} />
                  <span>{saved ? "Saved" : "Save Property"}</span>
                </button>
              </div>
            </div>

            {/* 2. Grid split layout */}
            <div className="property-grid-layout">
              
              {/* Main Left Column */}
              <div className="layout-main-col">
                
                {/* Carousel wrapper */}
                <div style={{ width: "100%", overflow: "hidden" }}>
                  {imagesArray && imagesArray.length > 1 ? (
                    <Karusell imagesArray={imagesArray} uri={uri} />
                  ) : (
                    <div className="single-fallback-image-wrapper">
                      <img
                        src={uri}
                        alt={Title}
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
                  <SingelObjectInfo
                    info={Text}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    recivied={recivied}
                  />
                </div>

                {/* Map */}
                {hasCoords && (
                  <div className="details-section-box" id="map-section">
                    <h3 className="section-box-title">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: "6px" }}>
                        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
                        <line x1="9" y1="3" x2="9" y2="18"></line>
                        <line x1="15" y1="6" x2="15" y2="21"></line>
                      </svg>
                      <span>Location Map</span>
                    </h3>
                    <div className="map-section-wrapper">
                      <SingelPageMap Area={Area} userCoords={[Number(lat), Number(lng)]} Title={Title} />
                    </div>
                  </div>
                )}

              </div>

              {/* Sidebar Right Column */}
              <div className="layout-side-col">
                
                {/* Facts card */}
                <div className="facts-card">
                  <div className="facts-card-price">
                    {Sell === null && Rent === null ? `$${Price.toLocaleString()}` : `$${Price.toLocaleString()}/mo`}
                  </div>
                  
                  {hasCoords && (
                    <button
                      onClick={() => {
                        history.push(`/map?lat=${lat}&lng=${lng}`);
                      }}
                      style={{
                        width: "100%",
                        background: "#013a17",
                        color: "#ffffff",
                        border: "none",
                        padding: "12px",
                        borderRadius: "10px",
                        fontWeight: "700",
                        fontSize: "13.5px",
                        cursor: "pointer",
                        marginBottom: "20px",
                        transition: "all 0.2s"
                      }}
                    >
                      See on map
                    </button>
                  )}

                  <div className="facts-grid">
                    <div className="fact-item">
                      <span className="fact-label">Type</span>
                      <span className="fact-value">{category === "Hand" ? "Land" : category}</span>
                    </div>
                    <div className="fact-item">
                      <span className="fact-label">Size</span>
                      <span className="fact-value">{Size} m²</span>
                    </div>
                    <div className="fact-item">
                      <span className="fact-label">Rooms</span>
                      <span className="fact-value">{Rooms || "—"}</span>
                    </div>
                    <div className="fact-item">
                      <span className="fact-label">Status</span>
                      <span className="fact-value">{Sell === null && Rent === null ? "For Sale" : "For Rent"}</span>
                    </div>
                  </div>
                </div>

                {/* Brokers Contact Card */}
                <Brokers contact={Name} agency={Name} number={Phone} email={Email} whatsapp={WhatsApp} about={About} />

                {/* Boost Card */}
                <div className="sidebar-boost-card">
                  <h3 className="boost-card-title">Sell or Rent Faster! 🚀</h3>
                  <p className="boost-card-text">
                    Boost your listing to place it at the very top of search results and get featured homepage slider exposure.
                  </p>
                  <button
                    onClick={() => window.location.href = "/boost-listing"}
                    className="btn-sidebar-boost"
                  >
                    Boost This Listing
                  </button>
                </div>

              </div>

            </div>

          </div>
        );
      })}

      <div style={{ maxWidth: "1200px", margin: "2rem auto 0 auto" }}>
        <MatchRequestStepper />
      </div>

      {/* 🔥 RELATED PROPERTIES GRID */}
      <div style={{ marginTop: "3rem" }}>
        <h2 style={{ fontSize: "30px", fontWeight: "800", marginBottom: "20px" }}>
          More homes in {Area}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {firestoreData
            .filter(p => p.Area === Area && p.adId !== adId && p.adType !== "Vehicle")
            .slice(0, 6)
            .map(p => (
              <a
                key={p.adId}
                href={`/propertys/property/${p.adId}`}
                style={{
                  textDecoration: "none",
                  color: "#111",
                  borderRadius: "14px",
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  transition: "all 0.25s ease",
                  display: "block",
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.12)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)";
                }}
              >
                <div style={{ position: "relative", height: "180px" }}>
                  <img
                    src={p.imagesArray?.[0] || p.uri}
                    alt={p.Title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "10px",
                      background: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {p.category}
                  </div>
                </div>
                <div style={{ padding: "14px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "6px" }}>
                    {p.Title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#666" }}>
                    {p.Area} • {p.Rooms} rooms • {p.Size} m²
                  </p>
                  <p style={{ marginTop: "8px", fontWeight: "700", fontSize: "16px", color: "#0b8b3a" }}>
                    ${p.Price}
                  </p>
                </div>
              </a>
            ))}
        </div>
      </div>
            <div style={{height:'30px'}}></div>
      {/* 🔥 PROPERTY TYPE LINKS */}
      <h2 style={{ fontSize: "26px", fontWeight: "700", margin: "30px 0 15px 0" }}>
        Browse by property type in {Area}
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "40px" }}>
        {["apartment", "house", "plot"].map(type => (
          <a
            key={type}
            href={`/buy/${type}/${Area?.toLowerCase().replace(/\s+/g, "-")}`}
            style={{
              padding: "10px 18px",
              borderRadius: "30px",
              background: "#f3f4f6",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
              color: "#111",
              transition: "0.3s",
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "#0b8b3a";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "#f3f4f6";
              e.currentTarget.style.color = "#111";
            }}
          >
            Buy {type.charAt(0).toUpperCase() + type.slice(1)} in {Area}
          </a>
        ))}
        {["apartment", "house"].map(type => (
          <a
            key={`rent-${type}`}
            href={`/rent/${type}/${Area?.toLowerCase().replace(/\s+/g, "-")}`}
            style={{
              padding: "10px 18px",
              borderRadius: "30px",
              background: "#f3f4f6",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
              color: "#111",
              transition: "0.3s",
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "#0b8b3a";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "#f3f4f6";
              e.currentTarget.style.color = "#111";
            }}
          >
            Rent {type.charAt(0).toUpperCase() + type.slice(1)} in {Area}
          </a>
        ))}
        <a
          href={`/invest/${Area?.toLowerCase().replace(/\s+/g, "-")}`}
          style={{
            padding: "10px 18px",
            borderRadius: "30px",
            background: "#f3f4f6",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "600",
            color: "#111",
            transition: "0.3s",
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = "#0b8b3a";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = "#f3f4f6";
            e.currentTarget.style.color = "#111";
          }}
        >
          Invest in {Area}
        </a>
      </div>

      {/* 🔥 TOP ZANZIBAR AREAS GRID */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "20px", textAlign: "center" }}>
          Explore Top Zanzibar Areas
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            textAlign: "center",
          }}
        >
          {[
            { title: "Paje", img: "https://i.ibb.co/Xxz2sDwV/real-estate-paje.webp", desc: "Ideal for beachfront villas and kite-surfing rentals." },
            { title: "Nungwi", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&h=120", desc: "Popular tourist destination with high rental demand." },
            { title: "Stone Town", img: "https://i.ibb.co/MkQqpbB1/real-estate-stone-town.jpg", desc: "Cultural center with historic properties and charming streets." },
            { title: "Jambiani", img: "https://i.ibb.co/DgKcK2hF/real-estate-jambiani.jpg", desc: "Peaceful village, perfect for holiday rentals and beachfront homes." },
            { title: "Kendwa", img: "https://i.ibb.co/Nn2cSgCj/real-estate-kendwa.jpg", desc: "Vibrant nightlife and beautiful beaches attract investors and tourists." },
            { title: "Bwejuu", img: "https://i.ibb.co/mFqDnf6L/real-estate-bwejuu.webp", desc: "Quiet area, ideal for families and long-term rentals." },
          ].map(area => (
            <div key={area.title} onClick={() => window.location.href = `/properties/area/${area.title.toLowerCase().replace(" ", "-")}`} style={{ padding: "20px", borderRadius: "10px", background: "#f9f9f9", transition: "transform 0.3s", cursor: "pointer" }}>
              <img src={area.img} alt={area.title} style={{ borderRadius: "8px", marginBottom: "10px", width: "100%", height: "120px", objectFit: "cover" }} />
              <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>{area.title}</h3>
              <p style={{ fontSize: "15px", color: "#555" }}>{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 SEO TEXT */}
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "10px" }}>
          Property in {Area}, Zanzibar
        </h2>
        <p style={{ lineHeight: "26px", color: "#444" }}>
          Looking for property in {Area}? Discover apartments, houses and land for sale or rent in one of Zanzibar’s most attractive areas. 
          {Area} offers strong investment opportunities, growing tourism demand and excellent rental potential. 
          Explore similar listings, compare prices and find your perfect home in Zanzibar today.
        </p>
      </div>

      {/* Page Content / Guide */}
     <div style={{ marginTop: "2rem", position: "relative", borderRadius: "8px", overflow: "hidden",height:'100%' }}>
  {/* Bakgrundsbild */}
  <img
    src="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg"
    alt="buy property in Zanzibar"
    style={{ width: "100%", height: "440px", objectFit: "cover" }}
  />
<div style={{ marginTop: "3rem", maxWidth: "800px", marginInline: "auto" }}>
  <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "20px", textAlign: "center" }}>
    Frequently Asked Questions
  </h2>

  {faqs.map((faq, i) => (
    <div
      key={i}
      style={{
        borderBottom: "1px solid #e5e7eb",
        padding: "15px 0",
        cursor: "pointer"
      }}
      onClick={() => setOpenIndex(openIndex === i ? null : i)}
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h3 style={{ fontSize: "16px", fontWeight: "600" }}>
          {faq.q}
        </h3>
        <span style={{ fontSize: "20px" }}>
          {openIndex === i ? "−" : "+"}
        </span>
      </div>

      {openIndex === i && (
        <p style={{
          marginTop: "10px",
          color: "#555",
          lineHeight: "1.6",
          fontSize: "14px"
        }}>
          {faq.a}
        </p>
      )}
    </div>
  ))}
</div>
  {/* Overlay med text och knapp */}
  <div style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "440px",
    background: "rgba(0, 0, 0, 0.4)", // semi-transparent bakgrund
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    padding: "20px",
    textAlign: "center"
  }}>
    <h2 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "0.5rem" }}>
      Guide: Buy property in {Area} Zanzibar
    </h2>
    <p style={{ fontSize: "1rem", lineHeight: "1.4", maxWidth: "600px", marginBottom: "1rem" }}>
      {pageData?.underImgText}
    </p>
    <a href="/buy-property-zanzibar" style={{ textDecoration: "none" }}>
      <button
        style={{
          background: "#22c55e",
          color: "white",
          border: "none",
          padding: "0.8rem 1.6rem",
          borderRadius: "6px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
        }}
        onMouseOver={e => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.35)";
        }}
        onMouseOut={e => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
        }}
      >
        Read the guide
      </button>
    </a>
  </div>
</div>

      <Abovefooter />
    </div>
  );
};

export default SingelFirebaseObject;