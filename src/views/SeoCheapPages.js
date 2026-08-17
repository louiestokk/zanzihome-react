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
      q: `How can I find cheap ${type} for sale in ${formattedArea}, Zanzibar by owner?`,
      a: `To find budget-friendly ${type} for sale directly by owner in ${formattedArea}, browse the listings on ZanziHome. You can contact owners and verified local agents directly to negotiate prices and avoid broker fees.`
    },
    {
      q: `What is the starting price for cheap real estate in ${formattedArea}?`,
      a: `In ${formattedArea}, starting prices depend on the property type. Inland land plots can start from $15,000, while basic houses and apartments can start from $60,000. Properties closer to the beach command higher starting prices.`
    },
    {
      q: `Can foreigners legally purchase affordable properties in ${formattedArea}, Zanzibar?`,
      a: `Yes, foreigners can purchase leasehold properties in approved development areas. ZanziHome lists properties with secure title registry records, making it safe for international buyers to invest.`
    },
    {
      q: `Are prices negotiable when buying cheap properties in Zanzibar?`,
      a: "Yes. Many sellers are open to reasonable offers, especially when dealing with private owners or when purchasing land plots. Working with a registered ZanziHome agent can help you secure the best rate."
    },
    {
      q: `Are there any hidden taxes when buying budget property in ${formattedArea}?`,
      a: "Standard transaction costs include the local transfer tax (typically 3%), legal fees for drafting the contract (1% to 2%), and registration fees. Always consult a local lawyer to audit the property title."
    }
  ];

  // Schema.org Structured Data
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "ZanziHome",
        "url": "https://www.zanzihome.com/",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.zanzihome.com/properties?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "name": "ZanziHome",
        "url": "https://www.zanzihome.com/",
        "logo": "https://www.zanzihome.com/logo.png"
      },
      {
        "@type": "CollectionPage",
        "name": `Cheap ${formattedType} for Sale in ${formattedArea}, Zanzibar | Budget Listings`,
        "description": `Browse affordable ${type} for sale in ${formattedArea}, Zanzibar. Filter cheap villas, homes, and land plots starting from low prices directly by owner.`,
        "url": currentUrl,
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": sortedProperties.length,
          "itemListElement": sortedProperties.slice(0, 15).map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://www.zanzihome.com/propertys/property/${item.adId}/`,
            "name": item.Title || `${formattedType} in ${formattedArea}`
          }))
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.zanzihome.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Cheap Properties",
            "item": `https://www.zanzihome.com/properties-zanzibar`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `Cheap ${formattedType} in ${formattedArea}`,
            "item": currentUrl
          }
        ]
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <main className="cheap-seo-page">
      <script
        type="application/ld+json"
        suppressHydrationWarning={true}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning={true}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      

      

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
