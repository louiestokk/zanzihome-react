"use client";

// src/pages/SeoRentPages.js

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useSelector } from "react-redux";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";

import { areas, propertyTypes } from "../utils/seoData";
import { generateSeoRentText, normalizePropertyType } from "../utils/generateSeoText";
import AdBanner from "../components/AdBanner";
import MatchRequestStepper from "../components/MatchRequestStepper";
import PartnerFeaturedSection from "../components/PartnerFeaturedSection";

const SeoRentPages = ({ initialProperties }) => {
  const { type, area } = useParams();
  const reduxData = useSelector(getFirestoreData) || [];
  const firestoreData = reduxData.length > 0 ? reduxData : (initialProperties || []);
  const [openFaq, setOpenFaq] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formattedArea = area
    .replace("-", " ")
    .toLowerCase()
    .trim()
    .replace(/^./, (str) => str.toUpperCase());
  const formattedType = type.toLowerCase().trim();

  const seo = generateSeoRentText(formattedType, formattedArea);

  const currentUrl = typeof window !== "undefined"
    ? window.location.href
    : `https://www.zanzihome.com/rent/${type}/${area}`;

  const filtered = firestoreData.filter((obj) => {
    if (!obj || !obj.paid || obj.removed) return false;

    // Must be a rental property
    if (obj.Rent !== "Rent") return false;

    const objType = normalizePropertyType(obj.category);
    const objArea = obj.Area
      ?.toLowerCase()
      .trim()
      .replace(/^./, (char) => char.toUpperCase());

    const matchType = objType === normalizePropertyType(type);
    const matchArea = objArea === formattedArea || objArea?.includes(formattedArea);

    return matchType && matchArea;
  });

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
        "@type": "RealEstateAgent",
        "name": "ZanziHome Real Estate",
        "url": currentUrl,
        "areaServed": {
          "@type": "Place",
          "name": "Zanzibar"
        },
        "description": seo.description
      },
      {
        "@type": "CollectionPage",
        "name": seo.title,
        "description": seo.description,
        "url": currentUrl,
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": filtered.length,
          "itemListElement": filtered.slice(0, 20).map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://www.zanzihome.com/propertys/property/${item.adId}/`,
            "name": item.Title
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
            "name": `Rent in Zanzibar`,
            "item": `https://www.zanzihome.com/properties-zanzibar?offer=Rent`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${formattedType} for Rent in ${formattedArea}`,
            "item": currentUrl
          }
        ]
      }
    ]
  };

  const faqs = [
    {
      q: `How to rent a ${formattedType} in ${formattedArea}, Zanzibar?`,
      a: `To rent a ${formattedType} in ${formattedArea}, browse the verified listings on ZanziHome, select your preferred property, and contact the listing agent directly. Long-term residential leases, corporate rentals, and short-term vacation rentals are all available.`
    },
    {
      q: `What is the cost of renting a ${formattedType} in ${formattedArea}, Zanzibar?`,
      a: `Rental costs in ${formattedArea} depend on the location, size, and proximity to the beach. Long-term rentals typically range from $500 to $1,500+ per month, while short-term vacation villas command premium rates during high tourism seasons.`
    },
    {
      q: `Can foreigners rent houses or villas long term in ${formattedArea}?`,
      a: "Yes, foreigners can legally rent properties long-term in Zanzibar. Standard tenancy contracts are drafted in English, and leases can span from a few months to several years."
    },
    {
      q: `Are utilities included in long-term rentals in ${formattedArea}?`,
      a: "Typically, long-term rentals exclude electricity (LUKU) and high-speed internet, which are paid separately by the tenant. Short-term rentals or serviced apartments usually include water, cleaning services, and basic utilities."
    },
    {
      q: `Is a security deposit required for renting in ${formattedArea}?`,
      a: "Yes. Most landlords in Zanzibar require a security deposit equivalent to 1 or 2 months' rent, which is refundable upon lease termination. In addition, rent is often paid 3, 6, or 12 months in advance."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "1.5rem" }}>
      {isMounted && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        </>
      )}
      

      {/* HEADER */}
      <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#013a17", marginBottom: "1rem", letterSpacing: "-0.5px" }}>
        {seo.h1}
      </h1>

      <p style={{ marginTop: "1rem", lineHeight: "1.7", color: "#4b5563", maxWidth: "800px", fontSize: "14.5px" }}>
        {seo.content}
      </p>

      {/* RESULT COUNT */}
      <p style={{ marginTop: "1.5rem", color: "#6b7280", fontSize: "13.5px", fontWeight: "600" }}>
        {filtered.length} rental properties found in {formattedArea}
      </p>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
          marginTop: "1.5rem"
        }}
      >
        {filtered.map((item, i) => (
          <Link
            key={i} href={`/propertys/property/${item.adId}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              borderRadius: "16px",
              overflow: "hidden",
              background: "white",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.05)",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.04)";
            }}
          >
            {/* IMAGE */}
            <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
              <img
                src={item.uri || item.imagesArray?.[0]}
                alt={item.Title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  background: "#013a17",
                  color: "white",
                  fontSize: "11px",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontWeight: "700",
                  textTransform: "uppercase"
                }}
              >
                For Rent
              </span>
            </div>

            {/* CONTENT */}
            <div style={{ padding: "16px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "700", margin: "0 0 6px 0", color: "#1f2937" }}>
                {item.Title}
              </h3>
              <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 10px 0" }}>
                {item.Area}
              </p>
              <p style={{ fontWeight: "800", fontSize: "16px", color: "#013a17", margin: 0 }}>
                ${item.Price}/night
              </p>
            </div>
          </Link>
        ))}
      </div>

      <AdBanner />

      {/* STEPPER FOR CONVERSIONS */}
      <div style={{ margin: "4rem auto 2rem auto" }}>
        <MatchRequestStepper />
      </div>

      {/* FAQ ACCORDION */}
      <div style={{ maxWidth: "800px", margin: "3rem auto" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#013a17", marginBottom: "1.5rem" }}>
          Frequently Asked Questions
        </h2>
        {faqs.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              marginBottom: "12px",
              overflow: "hidden"
            }}
          >
            <button
              onClick={() => toggleFaq(index)}
              style={{
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                padding: "16px",
                fontSize: "14.5px",
                fontWeight: "700",
                color: "#013a17",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                outline: "none"
              }}
            >
              <span>{item.q}</span>
              <span style={{ transition: "transform 0.3s", transform: openFaq === index ? "rotate(180deg)" : "rotate(0)" }}>
                ▼
              </span>
            </button>
            {openFaq === index && (
              <div style={{ padding: "0 16px 16px 16px", fontSize: "13.5px", color: "#4b5563", lineHeight: "1.6" }}>
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <PartnerFeaturedSection />

      {/* INTERNAL LINKS – SAME AREA */}
      <div style={{ marginTop: "3rem" }}>
        <h3 style={{ marginBottom: "0.8rem", fontSize: "15px", fontWeight: "700", color: "#013a17" }}>
          Other properties in {formattedArea}
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {propertyTypes.map((t) => (
            <Link
              key={t} href={`/rent/${t}/${area}`}
              style={{
                background: "#f3f4f6",
                color: "#4b5563",
                padding: "8px 14px",
                borderRadius: "30px",
                fontSize: "12px",
                fontWeight: "600",
                textDecoration: "none",
                border: "1px solid #e5e7eb"
              }}
            >
              {t} for rent in {formattedArea}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SeoRentPages;
