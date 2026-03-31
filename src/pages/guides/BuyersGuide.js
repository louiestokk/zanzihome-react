// src/pages/BuyersGuide.js
import React from "react";
import { pageData } from "./data";
import { Helmet } from "react-helmet-async";
import { areas, propertyTypes } from "../../utils/seoData";

const BuyersGuide = () => {
  const formattedDate = new Date("2023-04-04T09:25:01.340Z").toISOString();

  // Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": "Buy Property Zanzibar | ZanziHome",
        "url": "https://www.zanzihome.com/buy-property-zanzibar/",
        "description": pageData.underImgText,
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.zanzihome.com/" },
            { "@type": "ListItem", "position": 2, "name": "Buy Property Zanzibar", "item": "https://www.zanzihome.com/buy-property-zanzibar/" }
          ]
        }
      },
      {
        "@type": "Article",
        "headline": "Guide: Buy property in Zanzibar",
        "description": pageData.underImgText,
        "author": { "@type": "Person", "name": "Louie Stokk" },
        "datePublished": formattedDate,
        "image": "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can foreigners buy property in Zanzibar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, foreigners can buy property in Zanzibar, usually through leasehold agreements approved by ZIPA."
            }
          },
          {
            "@type": "Question",
            "name": "What is the property buying process in Zanzibar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It involves working with a local agent, obtaining a certificate of no objection, paying stamp duty fees, and signing the sales agreement."
            }
          }
        ]
      }
    ]
  };

  // Create all internal links dynamically
const topAreas = ["Paje", "Nungwi", "Jambiani", "Stone Town", "Kendwa"];
const topTypes = ["house", "villa", "apartment", "land", "beachfront"];

const internalLinks = [];
topAreas.forEach((area) =>
  topTypes.forEach((type) => {
    internalLinks.push({
      href: `/buy/${type.toLowerCase()}/${area.toLowerCase().replace(/\s+/g, "-")}`,
      label: `${type} in ${area}`
    });
  })
);

  return (
    <main className="poppins" style={{ margin: "2rem auto", maxWidth: "1100px", padding: "0 1rem" }}>
      {/* SEO */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Buy property Zanzibar - ZanziHome | Real Estate Zanzibar</title>
        <meta name="description" content={pageData.underImgText} />
        <link rel="canonical" href="https://www.zanzihome.com/buy-property-zanzibar/" />

        {/* Open Graph */}
        <meta property="og:title" content="Buy property Zanzibar - ZanziHome" />
        <meta property="og:description" content={pageData.underImgText} />
        <meta property="og:image" content="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg" />
        <meta property="og:url" content="https://www.zanzihome.com/buy-property-zanzibar/" />
        <meta property="og:type" content="article" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Buy property Zanzibar - ZanziHome" />
        <meta name="twitter:description" content={pageData.underImgText} />
        <meta name="twitter:image" content="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg" />

        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Header */}
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{pageData.pageTitel}</h1>

      <div style={{ position: "relative", marginBottom: "1rem" }}>
        <img
          src="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg"
          alt="buy property in Zanzibar"
          loading="lazy"
          style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "8px" }}
        />
        <article style={{ position: "absolute", top: "20%", left: "2%" }}>
          <h4 style={{ background: "white", padding: "0.5rem 1rem", borderRadius: "6px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
            {pageData.whitebannerText}
          </h4>
          <button
            onClick={() => (window.location.href = "/")}
            style={{ marginTop: "0.5rem", background: "black", color: "white", fontWeight: "bold", padding: "0.5rem 1rem", borderRadius: "5px", cursor: "pointer" }}
          >
            {pageData.btntext}
          </button>
        </article>
      </div>

      <p style={{ fontSize: "0.9rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>{pageData.underImgText}</p>
      {/* Sections */}
      {[{ title: pageData.titleOne, text: pageData.textOne }, { title: pageData.titleTwo, text: pageData.textTwo }].map((section, i) => (
        <div key={i} style={{ marginBottom: "1.5rem" }}>
          <h3>{section.title}</h3>
          <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>{section.text}</p>
        </div>
      ))}
 <div style={{ background: "#ffeeba", padding: "1.5rem", textAlign: "center", margin: "2rem 0", borderRadius: "8px" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Advertise your property 🚀</h2>
        <p style={{ marginBottom: "1rem" }}>Do you have a house, apartment, plot or business to sell or rent out? List it on ZanziHome and reach thousands of active buyers and renters searching for properties in Zanzibar every day.</p>
        <button onClick={() => window.location.href = "/contact"} style={{ padding: "0.8rem 1.5rem", background: "#013a17", color: "white", border: "none", borderRadius: "5px", fontWeight: "600", cursor: "pointer" }}>
          Add your property
        </button>
      </div>
      {/* Step-by-step Guide */}
      <div style={{ marginBottom: "2rem" }}>
        <h3>Step-by-step guide to purchasing property in Zanzibar</h3>
        <ol style={{ lineHeight: "1.7", marginLeft: "1rem" }}>
          <li>Identify a reputable local real estate agent or lawyer.</li>
          <li>Research the local real estate market for suitable properties.</li>
          <li>Contact the seller and negotiate terms.</li>
          <li>Obtain a certificate of no objection from ZIPA.</li>
          <li>Sign a Sales Agreement and pay deposit (10%).</li>
          <li>Hire a surveyor to verify property boundaries.</li>
          <li>Get an official valuation report from a licensed valuer.</li>
          <li>Apply for a Land Lease.</li>
          <li>Pay 5% stamp duty to Zanzibar Revenue Board.</li>
          <li>Complete the purchase by transferring ownership.</li>
        </ol>
        <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
          Following these steps ensures a safe and legal purchase for foreigners.
        </p>
      </div>

      {/* Internal Links to 99 Pages */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.5rem", marginBottom: "3rem" }}>
        {internalLinks.map((link, i) => (
          <a
            key={i}
            href={link.href}
            style={{ padding: "0.5rem 0.75rem", background: "#22c55e", color: "white", borderRadius: "6px", fontSize: "0.85rem", textAlign: "center", textDecoration: "none" }}
          >
            {link.label}
          </a>
        ))}
      </div>
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

export default BuyersGuide;