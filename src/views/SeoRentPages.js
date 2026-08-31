// src/pages/SeoRentPages.js

import React from "react";
import Link from "next/link";

import { areas, propertyTypes } from "../utils/seoData";
import { generateSeoRentText, normalizePropertyType } from "../utils/generateSeoText";
import AdBanner from "../components/AdBanner";
import MatchRequestStepper from "../components/MatchRequestStepper";
import PartnerFeaturedSection from "../components/PartnerFeaturedSection";
import CoccolagoonFeaturedSection from "../components/CoccolagoonFeaturedSection";

const SeoRentPages = ({ area, properties, type }) => {

  const formattedArea = area
    .replace("-", " ")
    .toLowerCase()
    .trim()
    .replace(/^./, (str) => str.toUpperCase());
  const formattedType = type.toLowerCase().trim();

  const seo = generateSeoRentText(formattedType, formattedArea);

  const filtered = properties || [];

  // FAQs for rental properties - SEO optimized
  const faqs = [
    {
      q: `Best ${formattedType} rentals in ${formattedArea}, Zanzibar - Find yours today`,
      a: `ZanziHome lists premium ${formattedType} rentals in ${formattedArea} with monthly rates from $500-$5,000+ depending on size and location. Furnished apartments near beaches run $1,500-$3,000/month. All properties verified by agents. Book directly to save money and get flexible lease terms. Perfect for expats, digital nomads, and tourists seeking long-term or seasonal rentals.`
    },
    {
      q: `What's the average rental price for ${formattedType} in ${formattedArea}, Zanzibar?`,
      a: `${formattedType} rental prices in ${formattedArea}: Modern furnished apartments $1,200-$2,800/month, beachfront villas $2,500-$6,000/month, basic houses $800-$1,500/month. Prices fluctuate seasonally (high Oct-Mar). Budget properties inland cost 30-40% less. Compare options on ZanziHome to find the best value for your budget.`
    },
    {
      q: `Can foreigners rent long-term in ${formattedArea}, Zanzibar - Visa & legal requirements?`,
      a: `Yes! Foreigners can rent long-term ${formattedType} in ${formattedArea} without restrictions. Most landlords welcome international tenants on 6-36 month leases. Typical requirements: passport copy, security deposit (1-2 months rent), reference letter. All rentals on ZanziHome are legal and compliant. Perfect for expat relocation and long-term stays.`
    },
    {
      q: `Are utilities included in rental prices for ${formattedType} in ${formattedArea}?`,
      a: `Usually not included - utilities (water, electricity, internet) average $50-$150/month separately. Some furnished premium rentals include utilities. Always clarify in the lease what's included. Landlords typically pay water/electric directly to authorities, with renters reimbursing based on usage. Budget accordingly when calculating total housing costs.`
    },
    {
      q: `Best lease terms for renting ${formattedType} in Zanzibar - Flexibility & options?`,
      a: `Lease periods available: Short-term (1-3 months ideal for tourists), Mid-term (6-12 months best for expats), Long-term (2-3 years for permanent relocation). Most ZanziHome landlords offer flexible negotiations, especially for reliable tenants. Month-to-month leases available at premium rates. Book your ${formattedType} in ${formattedArea} with clear contract terms.`
    },
    {
      q: `Furnished vs. unfurnished rentals in ${formattedArea} - Which is better value?`,
      a: `Furnished rentals cost 20-30% more but include furniture, kitchen basics, linens, and appliances - ideal for expats arriving without belongings. Unfurnished rentals cheaper but require full setup ($3,000-$8,000 initial investment). Choose furnished for convenience, unfurnished for long-term savings. Both available on ZanziHome for ${formattedArea}.`
    }
  ];

  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "1.5rem" }}>
      

      {/* HEADER */}
      <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#013a17", marginBottom: "1rem", letterSpacing: "-0.5px" }}>
        {seo.h1}
      </h1>

      <p style={{ marginTop: "1rem", lineHeight: "1.7", color: "#4b5563", maxWidth: "800px", fontSize: "14.5px" }}>
        {seo.content}
      </p>

      <section style={{ marginTop: "1.5rem", maxWidth: "800px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "1.25rem 1.5rem" }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "0.6rem", color: "#013a17" }}>
          {`Find the right ${formattedType.toLowerCase()} rental in ${formattedArea}`}
        </h2>
        <p style={{ margin: 0, lineHeight: "1.7", color: "#475569" }}>
          {`Explore ${formattedType.toLowerCase()} rentals in ${formattedArea} suited for holiday stays, remote working, or long-term living with strong local demand and convenient access to beaches and amenities.`}
        </p>
      </section>

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
          >
            {/* IMAGE */}
            <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
              <img
                src={item.uri || item.imagesArray?.[0] || "/images/filterBackground.jpg"}
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

      {formattedArea === "Pemba" && (
        <div>
          <h2 style={{ padding: "1rem", color: "#013a17" }}>Pemba Property Investments</h2>
          <CoccolagoonFeaturedSection />
        </div>
      )}

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
          <details
            key={index}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              marginBottom: "12px",
              overflow: "hidden"
            }}
          >
            <summary
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
              <span>
                ▼
              </span>
            </summary>
            <div style={{ padding: "0 16px 16px 16px", fontSize: "13.5px", color: "#4b5563", lineHeight: "1.6" }}>
              {item.a}
            </div>
          </details>
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
