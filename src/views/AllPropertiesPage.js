"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BiMap } from "react-icons/bi";
import Objects from "../components/Objects";
import Popular from "../components/Popular";
import dynamic from "next/dynamic";
const MapPage = dynamic(() => import("./MapPage"), { ssr: false });
import Faq from "../components/Faq";
import Abovefooter from "../components/Abovefooter";
import AdBanner from "../components/AdBanner";
import MatchRequestStepper from "../components/MatchRequestStepper";
import PartnerFeaturedSection from "../components/PartnerFeaturedSection";
import CoccolagoonFeaturedSection from "../components/CoccolagoonFeaturedSection";
import { setFirestoreData, setFilteredData, getRawFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { villages } from "../utils/data";
import { faqdata } from "../utils/faq";

const types = ["House", "Apartment", "Land", "Business"];

const AllPropertiesPage = ({ initialProperties }) => {
  const searchParams = useSearchParams();
  const initialOffer = searchParams.get("offer") || "All";
  const initialType = searchParams.get("type") || "All";
  const initialArea = searchParams.get("area") || "Whole Zanzibar";

  const [offerType, setOfferType] = useState(initialOffer); // All, Sale, Rent
  const [propertyType, setPropertyType] = useState(initialType); // All, House, Apartment, Land, Business
  const [selectedArea, setSelectedArea] = useState(initialArea);
  const dispatch = useDispatch();
  const reduxData = useSelector(getRawFirestoreData) || [];
  const firestoreData = reduxData.length > 0 ? reduxData : (initialProperties || []);

  // Fallback API fetch if Redux data is empty
  useEffect(() => {
    if (firestoreData.length === 0) {
      const fetchFirestoreData = async () => {
        try {
          const res = await fetch("/api/properties");
          if (!res.ok) throw new Error("API response error");
          const newData = await res.json();
          dispatch(setFirestoreData(newData));
        } catch (err) {
          console.error("Error fetching Firestore data via API in AllPropertiesPage:", err);
        }
      };
      fetchFirestoreData();
    }
  }, [firestoreData.length, dispatch]);

  // Sync state with URL search parameters
  useEffect(() => {
    setOfferType(initialOffer);
    setPropertyType(initialType);
    setSelectedArea(initialArea);
  }, [initialOffer, initialType, initialArea]);

  // Filter effect: run filters sequentially whenever filter states or raw data change
  useEffect(() => {
    if (firestoreData.length === 0) return;

    let filtered = [...firestoreData];

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
    dispatch(setFilteredData(filtered));
  }, [offerType, propertyType, selectedArea, firestoreData, dispatch]);

  return (
    <section style={{ fontFamily: "Poppins, sans-serif", background: "#fafbfa", paddingBottom: "40px" }}>
      {/* Hero Header */}
      <section className="allprops-hero">
        <div className="allprops-breadcrumbs">
          <Link href="/">Home</Link>
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
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2F1788375016732_restaurant-for-sale-paje-zanzibar.png?alt=media&token=1d9d45ac-b546-42eb-a09e-57b4ba735338",
              imgText: "Established Fast-Food Restaurant for Sale in Prime Paje Location",
              adId: Number(621136943),
              type: "Business",
              price: "from $35,000",
              size: "50",
              rooms:'2'
            },
                {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2F1786204061318_aura-garden-view-02.webp?alt=media&token=39c6be93-b47f-4c44-ab69-b038e1bb247e",
              imgText: "HIgh ROI Beachfront living in Paje ",
              adId: Number(788913793),
              type: "Apartments",
              price: "$95-210,000",
              size: "46-110",
              rooms:'1 to 3'
            },
                                 {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fplot-sale-paje.jpeg?alt=media&token=ee3a2c2a-c6cc-4926-a81c-393e7133b65c",
              imgText: "PRIME ROADSIDE INVESTMENT LAND FOR SALE – PAJE–JAMBIANI",
              adId: Number(218752271),
              type: "Plot",
              price: "$395.000",
              size: "6451",
              rooms:0
            },
                             {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fbusiness-jambiani.webp?alt=media&token=ea61d850-ed15-441f-97f8-4c3b892a7885",
              imgText: "COMMERCIAL & HOSPITALITY INVESTMENT PROPERTY – JAMBIANI",
              adId: Number(363634436),
              type: "Business",
              price: "$600.000",
              size: "8365",
              rooms:0
            },
                           {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fhotel-sale.png?alt=media&token=d80f1357-8e5c-4d73-a3e3-1591e8f18ad0",
              imgText: "Luxury Coastal Hotel Investment in Prime Beach District, Kendwa",
              adId: Number(373041655),
              type: "Hotel",
              price: "$875.000",
              size: "3000",
              rooms:0
            },
                            {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fplot-bwejuu.webp?alt=media&token=453e385d-9703-4821-9b62-4a97a3256311",
              imgText: "5,000 SQM Fantastic Prime Land in Bwejuu",
              adId: Number(491630589),
              type: "Plot",
              price: "$50.000",
              size: "5000",
              rooms:0
            },
                            {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FMakunduchi-plot.webp?alt=media&token=5b87d631-9a9e-4b7e-a606-0c84379cd5c5",
              imgText: "Prime Cliff-Front Ocean Land | Makunduchi",
              adId: Number(905192344),
              type: "Plot",
              price: "$550.000",
              size: "8500",
              rooms:0
            },
                              {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FIMG_4279.png?alt=media&token=da47d065-946b-4dc8-9fc3-5d5253927640",
              imgText: "Oceanview Land with Private Shoreline in Kidoti, Nungwi",
              adId: Number(414112080),
              type: "Plot",
              price: "$795.000",
              size: "10000",
              rooms:0
            },
                                {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FIMG_4280.png?alt=media&token=9ebb9592-6099-4a14-833a-9f09df191161",
              imgText: "Roadside Development Plot Near the Coast, Shungi",
              adId: Number(165083046),
              type: "Plot",
              price: "$600.000",
              size: "16000",
              rooms:0
            },
                      {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FIMG_0552.jpeg?alt=media&token=68935c61-785b-4baa-9016-65023f295afa",
              imgText: "HIgh ROI Beachfront living in Paje",
              adId: Number(788913793),
              type: "Apartments",
              price: "$210,000",
              size: "110",
              rooms: 3
            },
               {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FIMG_0965.jpeg?alt=media&token=4d3a0942-323f-4499-aede-38a458858827",
              imgText: "Prime Investment Plot - DONGWE",
              adId: Number(64383849),
              type: "Plot",
              price: "$275,000",
              size: "11000",
              rooms: 0
            },
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
      {/* <CoccolagoonFeaturedSection /> */}
      <PartnerFeaturedSection />
      {/* BOOST CTA MID-LIST */}
  

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
      <div style={{ maxWidth: "1200px", margin: "2rem auto", padding: "0 15px" }}>
        <MatchRequestStepper />
      </div>
      <Abovefooter />
    </section>
  );
};

export default AllPropertiesPage;