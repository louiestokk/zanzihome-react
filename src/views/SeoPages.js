"use client";

// src/pages/SeoPage.js

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useSelector } from "react-redux";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";

import { areas, propertyTypes } from "../utils/seoData";
import { generateSeoText, normalizePropertyType } from "../utils/generateSeoText";
import Faq from "../components/Faq";
import AdBanner from "../components/AdBanner";
import PartnerFeaturedSection from "../components/PartnerFeaturedSection";

const SeoPage = ({ initialProperties }) => {
  const { type, area } = useParams();
  const reduxData = useSelector(getFirestoreData) || [];
  const firestoreData = reduxData.length > 0 ? reduxData : (initialProperties || []);
  const [openFaq, setOpenFaq] = useState(null);

  const formattedArea =
    area
      .replace("-", " ")
      .toLowerCase()
      .trim()
      .replace(/^./, (str) => str.toUpperCase());
  const formattedType = type.toLowerCase().trim();

  const seo = generateSeoText(formattedType, formattedArea);

  const currentUrl = typeof window !== "undefined"
    ? window.location.href
    : `https://www.zanzihome.com/buy/${type}/${area}`;

  const filtered = firestoreData.filter((obj) => {
    if (!obj || !obj.paid || obj.removed) return false;

    const objType = normalizePropertyType(obj.category);
   const objArea = obj.Area
  ?.toLowerCase()
  .trim()
  .replace(/^./, (char) => char.toUpperCase());

    const matchType = objType === normalizePropertyType(type);

    // 🔥 viktig fix → includes istället för ===
    const matchArea =
      objArea === formattedArea ||
      objArea?.includes(formattedArea);

    return matchType && matchArea;
  });

  // FAQs for buying properties - SEO optimized
  const faqs = [
    {
      q: `Best ${formattedType} for sale in ${formattedArea}, Zanzibar - Where to buy?`,
      a: `ZanziHome lists the best ${formattedType} for sale in ${formattedArea}. Properties range from budget plots ($15,000-$60,000) to luxury beachfront villas ($500,000+). All listings are verified and include secure title registry. Filter by price, amenities, and beach access to find your ideal ${formattedType} in ${formattedArea}.`
    },
    {
      q: `How much does ${formattedType} cost in ${formattedArea}, Zanzibar?`,
      a: `${formattedType} prices in ${formattedArea} vary by location and size. Beachfront properties command premium prices ($300,000-$1,500,000), while inland ${formattedType} start from $80,000-$250,000. Average prices for quality properties: Modern villas $400,000, apartments $120,000, land plots $50,000-$150,000. Compare current market prices on ZanziHome.`
    },
    {
      q: `Can foreigners buy property in ${formattedArea}, Zanzibar - Legal requirements?`,
      a: `Yes! Foreigners can legally purchase ${formattedType} in ${formattedArea} under the Zanzibar Leasehold Law. You get secure 33/66/99-year government-registered leases that are renewable and inheritable. ZIPA investment programs offer residency permits for properties worth $100,000+. Always use a local lawyer to verify title and complete due diligence.`
    },
    {
      q: `What's the average ROI for ${formattedType} investment in ${formattedArea}?`,
      a: `${formattedType} in ${formattedArea} generate 10-20% annual returns through holiday rentals and long-term leasing. Beachfront villas yield 14-18%, while apartments yield 10-15%. Capital appreciation averages 8-12% yearly. Professional property managers handle rentals for 15-20% fee, enabling hands-off investment income.`
    },
    {
      q: `Are there taxes or hidden costs when buying ${formattedType} in Zanzibar?`,
      a: `Yes - standard closing costs include: 3% transfer tax, 1-2% legal fees, 1% registration fees = ~5-6% total. Strategic ZIPA investments get zero capital gains tax exemption. Non-resident rental income taxed at 15% flat rate. Always audit full costs with a local lawyer before purchasing ${formattedType} in ${formattedArea}.`
    },
    {
      q: `Best areas in Zanzibar for ${formattedType} investment - ${formattedArea} vs. others?`,
      a: `${formattedArea} is one of Zanzibar's top investment locations with strong rental demand, tourism proximity, and beach access. Compared to Stone Town (cultural), it offers better ROI. Best for investors seeking: holiday rental income, capital appreciation, and lifestyle property. Browse premium ${formattedType} in ${formattedArea} with verified agent support on ZanziHome.`
    }
  ];

  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "1rem" }}>
      {/* HEADER */}
      <h1 style={{ fontSize: "2rem", fontWeight: "700" }}>
        {seo.h1}
      </h1>

      <p style={{ marginTop: "1rem", lineHeight: "1.7", maxWidth: "800px" }}>
        {seo.content}
      </p>

      <section style={{ marginTop: "1.5rem", maxWidth: "800px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "1.25rem 1.5rem" }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "0.6rem" }}>
          {`Explore ${formattedType.toLowerCase()} options in ${formattedArea}`}
        </h2>
        <p style={{ margin: 0, lineHeight: "1.7", color: "#475569" }}>
          {`Find ${formattedType.toLowerCase()}s for sale in ${formattedArea} that match your lifestyle, investment goals, and budget. Compare beach access, price levels, and neighborhood character before choosing the right location.`}
        </p>
      </section>

      {/* RESULT COUNT */}
      <p style={{ marginTop: "1rem", color: "#555", fontSize: "14px" }}>
        {filtered.length} properties found
      </p>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
          gap: "18px",
          marginTop: "2rem"
        }}
      >
        {filtered.map((item, i) => (
          <Link
            key={i} href={`/propertys/property/${item.adId}`}
            style={{
              textDecoration: "none",
              color: "black",
              borderRadius: "12px",
              overflow: "hidden",
              background: "white",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              transition: "0.2s"
            }}
          >
            {/* IMAGE */}
            <div style={{ position: "relative" }}>
              <img
                src={item.uri || item.imagesArray?.[0] || "/images/filterBackground.jpg"}
                alt={item.Title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover"
                }}
              />

              {/* BADGE */}
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  background: "#22c55e",
                  color: "white",
                  fontSize: "11px",
                  padding: "4px 8px",
                  borderRadius: "5px",
                  fontWeight: "600"
                }}
              >
                Featured
              </span>
            </div>

            {/* CONTENT */}
            <div style={{ padding: "12px" }}>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "6px"
                }}
              >
                {item.Title}
              </h3>

              <p style={{ fontSize: "13px", color: "#666" }}>
                {item.Area}
              </p>

              <p
                style={{
                  fontWeight: "700",
                  marginTop: "6px",
                  fontSize: "15px"
                }}
              >
                ${item.Price}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <AdBanner />

      {/* PROPERTY TYPES & PRICES TABLE */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
          padding: "2rem",
          margin: "3rem auto",
          maxWidth: "1000px",
          fontFamily: "'Poppins', sans-serif"
        }}
      >
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#013a17",
            marginBottom: "1rem"
          }}
        >
          {formattedArea} Real Estate Prices & Property Types
        </h2>
        <p style={{ color: "#4b5563", fontSize: "14px", lineHeight: "1.6", marginBottom: "1.5rem" }}>
          The property market in <strong>{formattedArea}</strong> offers various investment options, ranging from entry-level plots to luxury beachfront villas. Below is an overview of the typical price ranges and expected rental yields for different property types in this region:
        </p>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "500px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e5e7eb", textAlign: "left" }}>
                <th style={{ padding: "12px 8px", fontSize: "14px", fontWeight: "600", color: "#374151" }}>Property Type</th>
                <th style={{ padding: "12px 8px", fontSize: "14px", fontWeight: "600", color: "#374151" }}>Estimated Price Range (USD)</th>
                <th style={{ padding: "12px 8px", fontSize: "14px", fontWeight: "600", color: "#374151" }}>Est. Annual Yield</th>
                <th style={{ padding: "12px 8px", fontSize: "14px", fontWeight: "600", color: "#374151" }}>Best Suited For</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px 8px", fontSize: "14px", fontWeight: "600", color: "#111827" }}>Beachfront Villa</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#4b5563" }}>$350,000 – $1,200,000+</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#059669", fontWeight: "600" }}>12% – 18%</td>
                <td style={{ padding: "12px 8px", fontSize: "13px", color: "#6b7280" }}>Luxury rental income & high-end lifestyle</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px 8px", fontSize: "14px", fontWeight: "600", color: "#111827" }}>Modern Apartment</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#4b5563" }}>$80,000 – $220,000</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#059669", fontWeight: "600" }}>10% – 15%</td>
                <td style={{ padding: "12px 8px", fontSize: "13px", color: "#6b7280" }}>Hands-off holiday rentals & solo investors</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px 8px", fontSize: "14px", fontWeight: "600", color: "#111827" }}>Inland House / Bungalow</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#4b5563" }}>$120,000 – $280,000</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#059669", fontWeight: "600" }}>8% – 12%</td>
                <td style={{ padding: "12px 8px", fontSize: "13px", color: "#6b7280" }}>Expat living & long-term residential leasing</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px 8px", fontSize: "14px", fontWeight: "600", color: "#111827" }}>Beachfront Land Plot</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#4b5563" }}>$60,000 – $250,000+</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#6b7280" }}>Appreciation</td>
                <td style={{ padding: "12px 8px", fontSize: "13px", color: "#6b7280" }}>Custom villa construction & land banking</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 8px", fontSize: "14px", fontWeight: "600", color: "#111827" }}>Commercial / Boutique Hotel</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#4b5563" }}>$450,000 – $2,500,000+</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#059669", fontWeight: "600" }}>14% – 20%</td>
                <td style={{ padding: "12px 8px", fontSize: "13px", color: "#6b7280" }}>Tourism business operators & developers</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: "1rem", fontSize: "12px", color: "#6b7280", fontStyle: "italic" }}>
          *Note: Price ranges are estimates based on current listings on ZanziHome and market reports. Beachfront proximity and size heavily influence individual pricing.
        </p>
      </div>

      {/* KEY BUYING RULES FOR FOREIGNERS */}
      <div
        style={{
          background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)",
          borderRadius: "16px",
          border: "1px solid #bbf7d0",
          padding: "2rem",
          margin: "3rem auto",
          maxWidth: "1000px",
          fontFamily: "'Poppins', sans-serif"
        }}
      >
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#013a17",
            marginBottom: "1rem"
          }}
        >
          Key Rules for Foreigners Buying Property in Zanzibar
        </h2>
        <p style={{ color: "#374151", fontSize: "14px", lineHeight: "1.6", marginBottom: "1.5rem" }}>
          Zanzibar welcomes international real estate investment under clear legal frameworks. If you are a foreign buyer looking to purchase a property in <strong>{formattedArea}</strong> or elsewhere on the island, here are the essential rules you need to know:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#0f172a", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#22c55e", fontWeight: "bold" }}>1.</span> Government Leasehold Law
            </h3>
            <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", margin: 0 }}>
              All land in Zanzibar is owned by the government. Foreigners cannot own land freehold but obtain secure, government-registered leasehold rights (typically for <strong>33, 66, or 99 years</strong>). Leases are fully renewable, transferable, and inheritable.
            </p>
          </div>

          <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#0f172a", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#22c55e", fontWeight: "bold" }}>2.</span> ZIPA Golden Visa Benefits
            </h3>
            <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", margin: 0 }}>
              Purchasing a property worth <strong>$100,000 USD or more</strong> within ZIPA-approved strategic investment projects qualifies foreign buyers for a <strong>Zanzibar Residency Permit</strong>. Benefits include zero capital gains tax, income tax reduced to 15%, and permission to live and work.
            </p>
          </div>

          <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#0f172a", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#22c55e", fontWeight: "bold" }}>3.</span> Standard Condominium Act
            </h3>
            <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", margin: 0 }}>
              The Zanzibar Condominium Act allows foreigners to fully own apartments or individual villas within managed residential complexes. You receive a separate title deed for your unit alongside shares in the common areas, which simplifies management and resale.
            </p>
          </div>

          <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#0f172a", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#22c55e", fontWeight: "bold" }}>4.</span> Due Diligence & Closing Fees
            </h3>
            <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", margin: 0 }}>
              Always hire an independent local lawyer to perform official searches at the Land Registry, verify seller identities, and crosscheck building approvals. Closing costs typically run between <strong>3% and 5%</strong> (including transfer tax, registry, and legal fees).
            </p>
          </div>
        </div>
      </div>

<div
  style={{
    maxWidth: "1000px",
    margin: "4rem auto",
    padding: "1.5rem",
    textAlign: "center"
  }}
>
  <h2
    style={{
      fontSize: "2rem",
      fontWeight: "700",
      marginBottom: "0.5rem"
    }}
  >
    Why Choose ZanziHome?
  </h2>

  <p
    style={{
      maxWidth: "700px",
      margin: "0 auto 2rem auto",
      color: "#555",
      lineHeight: "1.7"
    }}
  >
    ZanziHome is one of the fastest-growing real estate platforms in Zanzibar,
    helping buyers, investors, and sellers connect with the best property
    opportunities on the island.
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "18px"
    }}
  >
    {[
      {
        title: "Largest Selection",
        text: "Explore one of the biggest collections of houses, land, apartments, and beachfront properties in Zanzibar."
      },
      {
        title: "Verified Listings",
        text: "We focus on quality by working with trusted sellers and agents to ensure reliable property listings."
      },
      {
        title: "Easy to Use",
        text: "Search, filter, and discover properties quickly with our simple and powerful platform."
      },
      {
        title: "Perfect for Investors",
        text: "Find high-potential investment opportunities in one of Africa’s fastest-growing real estate markets."
      }
    ].map((item, i) => (
      <div
        key={i}
        style={{
          background: "white",
          padding: "1.2rem",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
          textAlign: "left",
          transition: "0.2s"
        }}
      >
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            marginBottom: "0.5rem"
          }}
        >
          ✔ {item.title}
        </h3>

        <p
          style={{
            fontSize: "0.85rem",
            color: "#666",
            lineHeight: "1.6"
          }}
        >
          {item.text}
        </p>
      </div>
    ))}
  </div>
</div>

      {/* INTERNAL LINKS – SAME AREA */}
      <div style={{ marginTop: "2rem" }}>
        <h3 style={{marginBottom:'0.3rem'}}>Other properties in {area}</h3>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {propertyTypes.map((t) => (
            <Link
              key={t} href={`/buy/${t}/${area}`}
              style={{
                background: "#5c5a5a",
                padding: "6px 10px",
                borderRadius: "6px",
                fontSize: "12px"
              }}
            >
              {t} in {area}
            </Link>
          ))}
        </div>
      </div>

      {/* INTERNAL LINKS – SAME TYPE */}
      <div style={{ marginTop: "2rem" }}>
        <h3 style={{marginBottom:'0.3rem'}}>More {type} in Zanzibar</h3>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {areas.map((a) => (
            <Link
              key={a} href={`/buy/${type}/${a.toLowerCase()}`}
              style={{
                background: "#5c5a5a",
                padding: "6px 10px",
                borderRadius: "6px",
                fontSize: "12px"
              }}
            >
              {type} in {a}
            </Link>
          ))}
        </div>
      </div>
<div style={{ maxWidth: "900px", margin: "3rem auto", padding: "1rem" }}>
  <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
    Frequently Asked Questions – Buying {formattedType} in {formattedArea}
  </h2>

  {faqs.map((item, index) => (
    <details
      key={index}
      style={{
        marginBottom: "10px",
        borderRadius: "8px",
        padding: "12px",
        background: "#f9fafb",
        cursor: "pointer"
      }}
    >
      <summary
        style={{
          fontWeight: "600",
          fontSize: "1rem",
          outline: "none"
        }}
      >
        {item.q}
      </summary>
      <p
        style={{
          marginTop: "10px",
          fontSize: "0.9rem",
          lineHeight: "1.6",
          color: "#444"
        }}
      >
        {item.a}
      </p>
    </details>
  ))}
</div>
<div style={{ maxWidth: "900px", margin: "3rem auto" }}>
  <h2>Living & Investing in {formattedArea}, Zanzibar</h2>

  <p style={{ lineHeight: "1.7" }}>
    {formattedArea} is one of the most attractive locations in Zanzibar for real estate investment.
    Known for its beautiful beaches, growing tourism and strong rental demand, the area offers
    excellent opportunities for both lifestyle buyers and investors.
  </p>

  <p style={{ lineHeight: "1.7" }}>
    Whether you're looking to buy {formattedType}, land for development or a rental property,
    {formattedArea} continues to attract international buyers searching for property in Zanzibar.
  </p>
</div>
<div style={{ maxWidth: "900px", margin: "3rem auto" }}>
  <h2 style={{marginBottom:'0.3rem'}}>Zanzibar Real Estate Market Trends</h2>

  <p style={{lineHeight:'1.7'}}>
    The real estate market in Zanzibar has seen strong growth over recent years,
    driven by tourism and international investment. Demand for beachfront properties,
    villas and land plots continues to increase, especially in areas like {formattedArea}.
  </p>

  <p>
    Investors are increasingly looking for rental income opportunities, making Zanzibar
    one of the most promising emerging markets for real estate in East Africa.
  </p>
</div>
      <PartnerFeaturedSection />

      <div style={{ margin: "2rem 0",padding:'1rem',textAlign:'center',maxWidth:'1000px' }}>
        <h2 className="best-airmax-text">Trusted by Our Clients</h2>
        <p style={{lineHeight:'26px',marginTop:'0.5rem'}}>
          Join over <strong>1,540 satisfied clients</strong> who have found their ideal property in Zanzibar with ZanziHome. Our platform is your ultimate guide to <strong>Zanzibar real estate</strong>, offering both local and international buyers a reliable, user-friendly marketplace.
        </p>
        <img
          src="https://www.snijpunt.com/files/thumbnails/trustpilot-logo-snijpunt.1600x680x1.png"
          alt="Trustpilot reviews ZanziHome – properties for sale and rent in Zanzibar"
          style={{ height: "120px", width: "300px", objectFit: "cover" }}
        />
      </div>
    </main>
  );
};

export default SeoPage;