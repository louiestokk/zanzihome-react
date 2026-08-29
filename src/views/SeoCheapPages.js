"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useSelector } from "react-redux";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";

import { areas, propertyTypes } from "../utils/seoData";
import { normalizePropertyType } from "../utils/generateSeoText";
import PartnerFeaturedSection from "../components/PartnerFeaturedSection";
import MatchRequestStepper from "../components/MatchRequestStepper";
import Abovefooter from "../components/Abovefooter";
import { BsCompass } from "react-icons/bs";

const SeoCheapPages = ({ initialProperties }) => {
  const { type, area } = useParams();
  const reduxData = useSelector(getFirestoreData) || [];
  const firestoreData = reduxData.length > 0 ? reduxData : (initialProperties || []);
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Format type & area for display
  const formattedArea = area
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const formattedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

  const currentUrl = typeof window !== "undefined"
    ? window.location.href
    : `https://www.zanzihome.com/cheap-plots-for-sale-in-zanzibar/${area}`;

  // Helper to parse price string to number
  const parsePrice = (priceVal) => {
    if (!priceVal) return 0;
    const clean = priceVal.toString().replace(/[^0-9.]/g, "");
    return parseFloat(clean) || 0;
  };

  // Filter listings by active status, category and area
  const filtered = firestoreData.filter((obj) => {
    if (!obj || !obj.paid || obj.removed) return false;

    // We only want sales listings since route is /cheap/:type/for-sale/:area
    if (obj.Rent === "Rent") return false;

    const objType = normalizePropertyType(obj.category);
    const objArea = obj.Area?.toLowerCase().replace(/[-\s]/g, "");

    const matchType = objType === normalizePropertyType(type);
    const matchArea = objArea === area.toLowerCase().replace(/[-\s]/g, "");

    return matchType && matchArea;
  });

  // Sort by price ascending (cheap first)
  const sortedProperties = [...filtered].sort((a, b) => {
    return parsePrice(a.Price || a.price) - parsePrice(b.Price || b.price);
  });

  // Dynamically generate FAQs
  const faqs = [
    {
      q: `Cheapest ${type} for sale in ${formattedArea}, Zanzibar - Budget prices today`,
      a: `ZanziHome lists most affordable ${type}: Inland land plots $15,000-$50,000, basic houses $60,000-$120,000, apartments $80,000-$150,000. Beachfront ${type} from $200,000. All verified for secure title. Buy direct from owners, save 10-15% commission.`
    },
    {
      q: `Affordable ${type} in ${formattedArea} Zanzibar - Best value for money`,
      a: `Budget properties offer excellent investment value: Houses $80,000-$140,000, land $20,000-$60,000, apartments $100,000-$180,000. Inland 30-40% cheaper than beach. ROI 8-12% annually. Perfect for budget-conscious first-time investors in African real estate.`
    },
    {
      q: `Can foreigners buy cheap property in ${formattedArea} as foreigner - Costs and legal?`,
      a: `Yes - legal leasehold purchases (33/66/99 years) with government registration. Closing costs ~5-6% (3% tax + 2% legal + 1% registry). No ZIPA minimum for cheap ${type}. Transparent pricing on ZanziHome, no hidden fees. Budget $100-$300 lawyer verification.`
    },
    {
      q: `Best strategy finding cheap ${type} in ${formattedArea} Zanzibar - How to save money`,
      a: "Save money: (1) Inland vs. beach (40% savings), (2) Land development (50%+ appreciation), (3) Negotiate private owners, (4) Off-season purchase (April-Sept), (5) Multiple plot discounts. Budget buyers achieve 8-15% annual returns through rentals or appreciation."
    },
    {
      q: `Cheap property investment ROI in ${formattedArea} - Budget vs. luxury returns`,
      a: "Budget ${type} ($60k-$150k) yield 10-13% ROI. Land ($20k-$50k) appreciates 12-20% yearly. Total returns match premium properties with lower capital required. Best strategy for budget-limited investors entering Zanzibar real estate for first time."
    }
  ];

  return (
    <main className="cheap-seo-page">
      

      

      {/* Hero Header */}
      <section className="cheap-hero">
        <div className="cheap-breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/properties-zanzibar">Properties</Link>
          <span>/</span>
          <span>Cheap {formattedType} in {formattedArea}</span>
        </div>
        <h1 className="cheap-hero-title">
          Cheap {formattedType} for Sale in {formattedArea}, Zanzibar
        </h1>
        <p className="cheap-hero-subtitle">
          Find affordable and budget-friendly {type} for sale by owner and verified agents. 
          Discover cheap plots, oceanfront homes, and budget villas in {formattedArea} today.
        </p>
      </section>

      <section className="cheap-container">
        {/* Main Content Grid */}
        {sortedProperties.length > 0 ? (
          <>
            <div className="results-meta-bar">
              <h2 className="results-heading">
                Cheap {formattedType} in {formattedArea} ({sortedProperties.length} found)
              </h2>
            </div>

            <div className="properties-grid">
              {sortedProperties.map((obj, i) => {
                const {
                  Area,
                  category,
                  Title,
                  Price: priceVal,
                  Size,
                  adId,
                  uri,
                  imagesArray,
                } = obj;

                const imageUrl = uri || imagesArray?.[0] || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&h=250";
                const catDisplay = category === "Hand" ? "Land" : category;

                return (
                  <div key={adId || i} className="property-card">
                    <div className="card-img-wrapper">
                      <Link href={`/propertys/property/${adId}`}>
                        <img
                          src={imageUrl}
                          alt={`Cheap property in ${Area}, Zanzibar`}
                          loading="lazy"
                          className="card-img"
                        />
                      </Link>
                      <span className="badge-cheap">Best Value</span>
                    </div>

                    <div className="card-body">
                      <div>
                        <Link href={`/propertys/property/${adId}`} style={{ textDecoration: "none" }}>
                          <h3 className="card-title">
                            {Title || `Budget ${catDisplay} in ${Area}`}
                          </h3>
                        </Link>
                        <p className="card-location">📍 {Area}, Zanzibar</p>
                      </div>

                      <div className="card-specs">
                        <span className="card-price">${priceVal}</span>
                        {Size && (
                          <span className="card-size">
                            <BsCompass style={{ color: "#013a17" }} />
                            {Size} sqm
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Empty Budget State */
          <div className="empty-box">
            <h3 className="empty-title">No budget properties listed in {formattedArea} right now</h3>
            <p className="empty-text">
              We couldn't find any active sales for cheap {type} in {formattedArea} at the moment. 
              View all affordable listings in Zanzibar or search another location.
            </p>
            <Link href="/properties-zanzibar" className="empty-link-btn">
              Browse All Listings
            </Link>
          </div>
        )}

        {/* Informational Rich Onpage SEO Text */}
        <div className="info-section">
          <h2>Affordable Real Estate & Homes in {formattedArea}, Zanzibar</h2>
          <p>
            Buying cheap real estate in {formattedArea}, Zanzibar is one of the smartest ways to enter 
            the booming East African tropical property market. As infrastructure expands and tourism 
            demand increases, buying budget-friendly villas, apartments, or plots allows investors and 
            lifestyle buyers to secure prime land before values rise further.
          </p>
          <p style={{ marginTop: "1rem" }}>
            To secure cheap properties by owner, ensure you conduct registry validation at the local 
            land ministry. ZanziHome displays detailed developer and broker listings, listing options 
            ranging from inland agricultural farmlands and residential plots to luxury beachfront apartments 
            with excellent long-term capital yield returns.
          </p>
        </div>

        {/* Zanzipalms slider integration for high exposure */}
        <PartnerFeaturedSection />

        {/* Stepper Conversion Element */}
        <div style={{ margin: "3rem 0" }}>
          <MatchRequestStepper />
        </div>

        {/* Accordion FAQs */}
        <div className="faq-box">
          <h2>Buying Cheap Properties in {formattedArea} – FAQs</h2>
          {faqs.map((f, index) => (
            <div key={index} className="faq-item">
              <button className="faq-btn" onClick={() => toggleFaq(index)}>
                <span>{f.q}</span>
                <span 
                  className="faq-arrow" 
                  style={{ transform: openFaq === index ? "rotate(180deg)" : "rotate(0)" }}
                >
                  ▼
                </span>
              </button>
              {openFaq === index && (
                <div className="faq-ans">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Cross Linking - Other categories in same town */}
        <div className="linking-section">
          <h3>Other cheap properties in {formattedArea}</h3>
          <div className="linking-flex">
            {propertyTypes.map((t) => (
              <Link
                key={t} href={`/cheap/${t.toLowerCase()}/for-sale/${area}`}
                className="linking-tag"
              >
                Cheap {t.toLowerCase()} for sale in {formattedArea}
              </Link>
            ))}
          </div>
        </div>

        {/* Cross Linking - Same category in other cities */}
        <div className="linking-section" style={{ marginTop: "24px" }}>
          <h3>Cheap {formattedType} in other parts of Zanzibar</h3>
          <div className="linking-flex">
            {areas.map((a) => (
              <Link
                key={a} href={`/cheap/${type}/for-sale/${a.toLowerCase().replace(/\s+/g, "-")}`}
                className="linking-tag"
              >
                Cheap {type} for sale in {a}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Abovefooter />
    </main>
  );
};

export default SeoCheapPages;
