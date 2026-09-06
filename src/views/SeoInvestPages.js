// src/pages/SeoInvestPages.js

import React from "react";
import Link from "next/link";

import { areas } from "../utils/seoData";
import { generateSeoInvestText } from "../utils/generateSeoText";
import AdBanner from "../components/AdBanner";
import MatchRequestStepper from "../components/MatchRequestStepper";
import PartnerFeaturedSection from "../components/PartnerFeaturedSection";
import CoccolagoonFeaturedSection from "../components/CoccolagoonFeaturedSection";

const SeoInvestPages = ({ area, properties }) => {

  const formattedArea = area
    .replace("-", " ")
    .toLowerCase()
    .trim()
    .replace(/^./, (str) => str.toUpperCase());

  const seo = generateSeoInvestText(formattedArea);

  const filtered = properties || [];

  // FAQs for investment properties - SEO optimized
  const faqs = [
    {
      q: `Best property investment ROI in ${formattedArea}, Zanzibar - Returns comparison`,
      a: `${formattedArea} properties generate 12-20% annual ROI through holiday rentals: Luxury villas average 16-20% ($500k+ investment), modern apartments 12-15% ($100k-$200k), land appreciation 15-25% p.a. Annual occupancy 70-85%. Professional management yields net 10-17% after 15-20% manager fees. Compare to global markets - Zanzibar consistently outperforms European/Asian real estate returns.`
    },
    {
      q: `Can foreign investors legally buy property in ${formattedArea}, Zanzibar?`,
      a: `Absolutely yes! Zanzibar welcomes foreign investment with clear legal frameworks: ZIPA-approved developments, government-registered 33/66/99-year leases, Condominium Act for full unit ownership, residency permits for $100,000+ purchases. All properties on ZanziHome verified for legal compliance. Your investment is protected by Zanzibar Land Act and international treaty recognition.`
    },
    {
      q: `Why invest in ${formattedArea} over other African real estate markets?`,
      a: `${formattedArea} offers: (1) Strongest holiday rental demand in East Africa ($150-$400/night achievable), (2) Lower entry prices than Mauritius/Seychelles, (3) ZIPA tax incentives (zero capital gains tax, 15% income tax), (4) 70%+ occupancy annually, (5) Strong currency (100% repatriation guaranteed), (6) Growing tourism infrastructure. Perfect for passive income and capital growth.`
    },
    {
      q: `Can I manage my ${formattedArea} investment property remotely without visiting?`,
      a: `Yes - 80% of foreign investors use professional local property managers costing 15-20% of rental income. Manager handles: guest booking/coordination, cleaning/maintenance, tax compliance, repairs, airbnb/booking.com listings. You receive net income monthly. Cloud-based reporting systems provide transparency. Hands-off model proven profitable for international ownership.`
    },
    {
      q: `What are lease terms for foreign property purchases in ${formattedArea}?`,
      a: `All land is government-leasehold: Choose 33-year (shorter/cheaper), 66-year (standard), or 99-year (maximum) terms. Leases are fully renewable after expiry, transferable to family/heirs, mortgageable, and covered by Zanzibar Land Act protection. Effective for 50-100+ years total ownership potential. Most foreign investors choose 99-year for maximum asset longevity.`
    },
    {
      q: `What ZIPA visa & tax benefits do I get for investing in ${formattedArea}?`,
      a: `ZIPA Golden Visa (residence permit) benefits for $100,000+ properties: (1) Zero capital gains tax on investment properties, (2) 15% flat-rate non-resident income tax (vs. 30% globally), (3) 100% profit repatriation guaranteed, (4) Visa valid for entire lease duration (33-99 years), (5) Extends to spouse + children under 20. Tax savings alone justify investment in first 5 years.`
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
          {`Why invest in ${formattedArea}?`}
        </h2>
        <p style={{ margin: 0, lineHeight: "1.7", color: "#475569" }}>
          {`Property buyers in ${formattedArea} often look for a mix of rental yields, capital appreciation, and lifestyle benefits. This area continues to attract demand from holidaymakers, business buyers, and long-term investors seeking high-potential opportunities in Zanzibar.`}
        </p>
      </section>
      {/* RESULT COUNT */}
      <p style={{ marginTop: "1.5rem", color: "#6b7280", fontSize: "13.5px", fontWeight: "600" }}>
        {filtered.length} investment properties found in {formattedArea}
      </p>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
          margin: "1.5rem 0"
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
                  background: "#22c55e",
                  color: "white",
                  fontSize: "11px",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontWeight: "700",
                  textTransform: "uppercase"
                }}
              >
                Investment
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
                ${item.Price}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {formattedArea === "Pemba" && <div>
        <h2 style={{padding:'1rem',color:'#013a17'}}>Pemba Property Investments</h2>
 <CoccolagoonFeaturedSection />
      </div>}
      <AdBanner />

      {/* INVESTMENT PROPERTIES & PRICES TABLE */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
          padding: "2rem",
          margin: "3rem auto",
          maxWidth: "1000px",
          fontFamily: "'Poppins', sans-serif"
        }}
      >
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: "800",
            color: "#013a17",
            marginBottom: "1rem"
          }}
        >
          {formattedArea} Property Investment Prices & ROI
        </h2>
        <p style={{ color: "#4b5563", fontSize: "14px", lineHeight: "1.6", marginBottom: "1.5rem" }}>
          Real estate in <strong>{formattedArea}</strong> offers premium returns driven by growing holidaymaker demand. Here is a breakdown of average acquisition costs, expected holiday rental occupancy rates, and annual return on investment (ROI) in this area:
        </p>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "500px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e5e7eb", textAlign: "left" }}>
                <th style={{ padding: "12px 8px", fontSize: "14px", fontWeight: "600", color: "#374151" }}>Property Category</th>
                <th style={{ padding: "12px 8px", fontSize: "14px", fontWeight: "600", color: "#374151" }}>Avg. Investment (USD)</th>
                <th style={{ padding: "12px 8px", fontSize: "14px", fontWeight: "600", color: "#374151" }}>Avg. Occupancy</th>
                <th style={{ padding: "12px 8px", fontSize: "14px", fontWeight: "600", color: "#374151" }}>Expected Annual ROI</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px 8px", fontSize: "14px", fontWeight: "600", color: "#111827" }}>Luxury Beachfront Villa</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#4b5563" }}>$450,000 – $1,500,000</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#4b5563" }}>65% – 80%</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#059669", fontWeight: "600" }}>14% – 18%</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px 8px", fontSize: "14px", fontWeight: "600", color: "#111827" }}>Modern Holiday Apartment</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#4b5563" }}>$90,000 – $240,000</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#4b5563" }}>70% – 85%</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#059669", fontWeight: "600" }}>12% – 15%</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px 8px", fontSize: "14px", fontWeight: "600", color: "#111827" }}>Boutique Resort / Hotel</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#4b5563" }}>$600,000 – $3,000,000+</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#4b5563" }}>60% – 75%</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#059669", fontWeight: "600" }}>15% – 22%</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px 8px", fontSize: "14px", fontWeight: "600", color: "#111827" }}>Beachfront Development Land</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#4b5563" }}>$80,000 – $350,000</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#6b7280" }}>N/A (Capital Appreciation)</td>
                <td style={{ padding: "12px 8px", fontSize: "14px", color: "#059669", fontWeight: "600" }}>15% – 25% p.a.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: "1rem", fontSize: "12px", color: "#6b7280", fontStyle: "italic" }}>
          *Disclaimer: ROI estimates are based on historical performance of managed vacation rentals in {formattedArea} and current occupancy indexes. Actual performance depends on marketing, amenities, and management.
        </p>
      </div>

      {/* INVESTMENT RULES & ZIPA INCENTIVES */}
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
            fontWeight: "800",
            color: "#013a17",
            marginBottom: "1rem"
          }}
        >
          Key Rules & Benefits for Real Estate Investors in Zanzibar
        </h2>
        <p style={{ color: "#374151", fontSize: "14px", lineHeight: "1.6", marginBottom: "1.5rem" }}>
          Zanzibar offers one of the most attractive investment environments in East Africa. If you plan to deploy capital into real estate in <strong>{formattedArea}</strong>, understanding the rules and benefits is critical:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#0f172a", marginBottom: "8px" }}>
              📋 1. Secure Leasehold Structures
            </h3>
            <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", margin: 0 }}>
              All land belongs to the state. Foreigners purchase properties via government-registered leasehold agreements (usually <strong>33, 66, or 99 years</strong>). These leases are fully renewable, can be sold or mortgaged, and are protected under the Zanzibar Land Act.
            </p>
          </div>

          <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#0f172a", marginBottom: "8px" }}>
              🏝 2. ZIPA Investment Visa Benefits
            </h3>
            <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", margin: 0 }}>
              Investing in approved developments under the Zanzibar Investment Promotion Authority (ZIPA) grants foreigners a <strong>residency permit</strong> (valid for the lease duration). Residency extends to spouses and children under 20.
            </p>
          </div>

          <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#0f172a", marginBottom: "8px" }}>
              💰 3. Tax Exemptions & Profit Repatriation
            </h3>
            <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", margin: 0 }}>
              Strategic property investments are exempt from <strong>capital gains tax</strong>. Non-resident rental income is taxed at a low flat rate (usually 15%). The law also guarantees 100% repatriation of profits and capital after local tax compliance.
            </p>
          </div>

          <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#0f172a", marginBottom: "8px" }}>
              🔑 4. Hands-Off Property Management
            </h3>
            <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6", margin: 0 }}>
              Foreign owners can legally operate their properties as holiday rentals. Several professional local property managers in {formattedArea} handle guest onboarding, Airbnb listings, maintenance, and cleaning in exchange for a 15-20% fee.
            </p>
          </div>
        </div>
      </div>

      {/* STEPPER FOR CONVERSIONS */}
      <div style={{ margin: "4rem auto 2rem auto" }}>
        <MatchRequestStepper />
      </div>

      {/* FAQ ACCORDION */}
      <div style={{ maxWidth: "800px", margin: "3rem auto" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#013a17", marginBottom: "1.5rem" }}>
          Investment FAQs
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

      {/* INTERNAL LINKS – REGIONS */}
      <div style={{ marginTop: "3rem" }}>
        <h3 style={{ marginBottom: "0.8rem", fontSize: "15px", fontWeight: "700", color: "#013a17" }}>
          Explore Investment Areas in Zanzibar
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {areas.map((a) => (
            <Link
              key={a} href={`/invest/${a.toLowerCase()}`}
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
              Invest in {a}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SeoInvestPages;
