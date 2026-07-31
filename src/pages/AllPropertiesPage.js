import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { Helmet } from "react-helmet-async";
import { db } from "../firebase";
import { BiMap } from "react-icons/bi";
import Objects from "../components/Objects";
import Popular from "../components/Popular";
import MapPage from "./MapPage";
import Faq from "../components/Faq";
import Abovefooter from "../components/Abovefooter";
import AdBanner from "../components/AdBanner";
import { setFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { useDispatch } from "react-redux";
import { villages } from "../utils/data";
import { faqdata } from "../utils/faq";

const types = ["House", "Apartment", "Land", "Business"];

const AllPropertiesPage = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const initialOffer = queryParams.get("offer") || "All";
  const initialType = queryParams.get("type") || "All";
  const initialArea = queryParams.get("area") || "Whole Zanzibar";

  const [offerType, setOfferType] = useState(initialOffer); // All, Sale, Rent
  const [propertyType, setPropertyType] = useState(initialType); // All, House, Apartment, Land, Business
  const [selectedArea, setSelectedArea] = useState(initialArea);
  const [memo, setMemo] = useState([]);
  const dispatch = useDispatch();

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": "ZanziHome Properties - Sale & Rent in Zanzibar",
    "url": "https://www.zanzihome.com/properties-zanzibar",
    "description": "Browse and find houses, apartments, villas, land and commercial properties for sale or rent in Zanzibar. Get featured listings and boost your property visibility with ZanziHome.",
    "image": "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "author": {
      "@type": "Organization",
      "name": "ZanziHome"
    },
    "mainEntityOfPage": "https://www.zanzihome.com/properties-zanzibar"
  };

  useEffect(() => {
    const fetchFirestoreData = async () => {
      const querySnapshot = await getDocs(collection(db, "newAd"));
      const newData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setMemo(newData);
      dispatch(setFirestoreData(newData));
    };
    fetchFirestoreData();
  }, [dispatch]);

  // Filter effect: run filters sequentially whenever filter states or memo change
  useEffect(() => {
    if (memo.length === 0) return;

    let filtered = [...memo];

    // 1. Filter by Offer/Transaction Type
    if (offerType === "Sale") {
      filtered = filtered.filter(el => el.Rent !== "Rent");
    } else if (offerType === "Rent") {
      filtered = filtered.filter(el => el.Rent === "Rent");
    }

    // 2. Filter by Property Category
    if (propertyType !== "All") {
      filtered = filtered.filter(el => {
        const cat = el.category === "Hand" ? "Land" : el.category;
        return cat === propertyType;
      });
    }

    // 3. Filter by Village/Area Location
    if (selectedArea !== "Whole Zanzibar") {
      const normalize = (str) => str?.toLowerCase().replace(/[-\s]/g, "") || "";
      const targetAreaNormalized = normalize(selectedArea);
      filtered = filtered.filter(el => normalize(el.Area) === targetAreaNormalized);
    }

    // Update Redux state so that Objects component and Map automatically display the correct subset
    dispatch(setFirestoreData(filtered));
  }, [offerType, propertyType, selectedArea, memo, dispatch]);

  return (
    <section style={{ fontFamily: "Poppins, sans-serif", background: "#fafbfa", paddingBottom: "40px" }}>
      {/* SCHEMA */}
      <script type="application/ld+json">
        {JSON.stringify(articleStructuredData)}
      </script>

      {/* SEO */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Properties for Sale & Rent in Zanzibar | ZanziHome</title>
        <meta name="description" content="Discover houses, villas, apartments, land and commercial properties for sale or rent in Zanzibar. Get featured listings and boost your property visibility." />
        <meta property="og:url" content="https://www.zanzihome.com/properties-zanzibar" />
        <meta property="og:title" content="Properties for Sale & Rent in Zanzibar | ZanziHome" />
        <meta property="og:description" content="Browse Zanzibar real estate including beachfront villas, apartments, land and commercial properties. Featured listings available." />
        <meta property="og:image" content="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg" />
        <link rel="canonical" href="https://www.zanzihome.com/properties-zanzibar" />
      </Helmet>

      {/* Custom Styles */}
      <style>{`
        .allprops-filter-wrapper {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          border: 1px solid rgba(0,0,0,0.05);
          max-width: 1200px;
          margin: -40px auto 30px auto;
          position: relative;
          z-index: 10;
        }
        .allprops-filter-row {
          display: flex;
          flex-direction: column;
          gap: 20px;
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
        /* Hero Banner */
        .allprops-hero {
          background: linear-gradient(135deg, #013a17 0%, #0d2818 100%);
          color: #ffffff;
          padding: 60px 20px;
          text-align: center;
          position: relative;
        }
        .allprops-hero::after {
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
        .allprops-breadcrumbs {
          display: flex;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          color: #a3b899;
          margin-bottom: 12px;
        }
        .allprops-breadcrumbs a {
          color: #a3b899;
          text-decoration: none;
          transition: color 0.2s;
        }
        .allprops-breadcrumbs a:hover {
          color: #ffffff;
        }
        .allprops-hero-title {
          font-size: 38px;
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .allprops-hero-subtitle {
          font-size: 15px;
          color: #d1e2c9;
          max-width: 600px;
          margin: 10px auto 0 auto;
          font-weight: 300;
        }
        @media (min-width: 768px) {
          .allprops-filter-row {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
          }
        }
      `}</style>

      {/* Hero Header */}
      <section className="allprops-hero">
        <div className="allprops-breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Properties</span>
        </div>
        <h1 className="allprops-hero-title">
          {propertyType !== "All" || selectedArea !== "Whole Zanzibar" || offerType !== "All"
            ? `${propertyType !== "All" ? propertyType : "Properties"} ${
                offerType === "Sale" ? "for Sale" : offerType === "Rent" ? "for Rent" : "for Sale & Rent"
              } in ${selectedArea !== "Whole Zanzibar" ? selectedArea : "Zanzibar"}`
            : "Properties for Sale & Rent in Zanzibar"}
        </h1>
        <p className="allprops-hero-subtitle">
          Explore real estate in Zanzibar including houses, villas, apartments, plots and commercial properties for sale and rent.
        </p>
      </section>

      {/* MAP */}
      <div style={{ height: "340px", overflow: "hidden", marginBottom: "0" }}>
        <MapPage zoom={7} />
      </div>

      {/* NEW MODERN FILTER DASHBOARD */}
      <div className="allprops-filter-wrapper">
        <div className="allprops-filter-row">
          
          {/* Offer Type Segmented Control */}
          <div>
            <div className="filter-group-label">Offer Type</div>
            <div className="segmented-group">
              <button
                className={`segmented-btn ${offerType === "All" ? "active" : ""}`}
                onClick={() => setOfferType("All")}
              >
                All Offers
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

          {/* Property Category Tags */}
          <div>
            <div className="filter-group-label">Property Type</div>
            <div className="tags-group">
              <button
                className={`tag-btn ${propertyType === "All" ? "active" : ""}`}
                onClick={() => setPropertyType("All")}
              >
                All Types
              </button>
              {types.map((t) => (
                <button
                  key={t}
                  className={`tag-btn ${propertyType === t ? "active" : ""}`}
                  onClick={() => setPropertyType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Village Selection Dropdown */}
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
                {villages.map((village, idx) => (
                  <option key={idx} value={village}>
                    {village}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* FEATURED PROPERTIES SECTION */}
      <div style={{ marginTop: "30px" }}>
        <Popular
          title={"Featured Properties in Zanzibar"}
          images={[
            {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FIMG_3080.jpeg?alt=media&token=49589f26-6b0a-4736-98c6-396dc681dc9d",
              imgText: "Central Apartment Paje",
              adId: Number(498610417),
              type: "Apartment",
              price: "$550/month",
              size: "55",
              rooms: 2
            },
            {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2F44E71F23-2098-4D81-B2E4-116345638B9E.jpeg?alt=media&token=7714cb00-23b7-4f23-bdb1-98bcef7ecf53",
              imgText: "Beachfront plot for sale in Zanzibar",
              adId: Number(624688142),
              type: "Plot",
              price: "$120,000",
              size: "1200"
            },
            {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fmichamvi.jpg?alt=media&token=5d8e4bb0-d3e7-4253-97c0-0ee2133bf4b6",
              imgText: "Plot for sale in Michamvi Zanzibar",
              adId: Number(801410),
              type: "Plot",
              price: "$85,000",
              size: "900"
            },
            {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fyhouse2.jpg?alt=media&token=4b06691f-8afd-418f-bce7-f972cc5143a5",
              imgText: "Villa for rent in Zanzibar",
              adId: Number(338429),
              type: "Rent",
              price: "$1,800/month",
              size: "300",
              rooms: 4
            }
          ]}
        />
      </div>

      {/* PROPERTIES GRID OBJECTS */}
      <Objects />

      {/* BOOST CTA MID-LIST */}
      <div style={{ background: "#ffeeba", padding: "1.5rem", textAlign: "center", margin: "2rem auto", borderRadius: "12px", maxWidth: "1200px" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Sell or Rent Faster!</h2>
        <p style={{ marginBottom: "1rem" }}>Boost your property listing and get maximum visibility on ZanziHome.</p>
        <button onClick={() => window.location.href = "/boost-listing"} style={{ padding: "0.8rem 1.5rem", background: "#013a17", color: "white", border: "none", borderRadius: "5px", fontWeight: "600", cursor: "pointer" }}>
          Boost Your Listing
        </button>
      </div>

      {/* FAQ SECTION */}
      <Faq data={faqdata} />

      {/* SEO CONTENT */}
      <div
        style={{
          padding: "2rem 1rem",
          maxWidth: "1100px",
          margin: "0 auto",
          fontFamily: "Poppins, sans-serif"
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            marginBottom: "0.5rem",
            color: "#013a17"
          }}
        >
          Zanzibar Real Estate Listings
        </h2>

        <p
          style={{
            fontSize: "1rem",
            color: "#555",
            lineHeight: "1.8",
            maxWidth: "750px"
          }}
        >
          Explore houses, villas, apartments, land and commercial properties across Zanzibar. 
          Find your dream home or investment property quickly with ZanziHome.
        </p>

        {/* GRID */}
        <h3 style={{ marginTop: "20px" }}>Why Choose ZanziHome?</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
            marginTop: "2rem"
          }}
        >
          {[
            "Verified properties with real photos",
            "Direct contact with owners & agents",
            "Boosted listings = faster sales",
            "Full coverage of Zanzibar hotspots"
          ].map((text, i) => (
            <div
              key={i}
              style={{
                background: "white",
                padding: "1.2rem",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
                display: "flex",
                alignItems: "flex-start",
                gap: "10px"
              }}
            >
              {/* CHECK ICON */}
              <div
                style={{
                  minWidth: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "14px"
                }}
              >
                ✓
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: "0.95rem",
                  color: "#333",
                  lineHeight: "1.6"
                }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA TEXT */}
        <div
          style={{
            marginTop: "2.5rem",
            padding: "1.5rem",
            background: "#f8faf8",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
          }}
        >
          <p
            style={{
              fontSize: "1rem",
              color: "#444",
              marginBottom: "0.5rem"
            }}
          >
            Start your property search today
          </p>

          <h3
            style={{
              fontSize: "1.4rem",
              fontWeight: "700",
              color: "#013a17"
            }}
          >
            Discover why ZanziHome is the #1 real estate platform in Zanzibar
          </h3>
        </div>
      </div>

      {/* ABOVE FOOTER */}
      <div style={{ margin: "1rem 0" }}>
        <AdBanner />
      </div>
      <Abovefooter />
    </section>
  );
};

export default AllPropertiesPage;