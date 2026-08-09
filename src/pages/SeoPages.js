// src/pages/SeoPage.js

import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { Helmet } from "react-helmet-async";
import { areas, propertyTypes } from "../utils/seoData";
import { generateSeoText } from "../utils/generateSeoText";
import Faq from "../components/Faq";
import AdBanner from "../components/AdBanner";
import PartnerFeaturedSection from "../components/PartnerFeaturedSection";

const SeoPage = () => {
  const { type, area } = useParams();
  const firestoreData = useSelector(getFirestoreData);

const formattedArea =
  area
    .replace("-", " ")
    .toLowerCase()
    .trim()
    .replace(/^./, (str) => str.toUpperCase());
  const formattedType = type.toLowerCase().trim();

  const seo = generateSeoText(formattedType, formattedArea);

  const filtered = firestoreData.filter((obj) => {
    if (!obj || !obj.paid || obj.removed) return false;

    const objType = obj.category?.toLowerCase().trim();
   const objArea = obj.Area
  ?.toLowerCase()
  .trim()
  .replace(/^./, (char) => char.toUpperCase());

    const matchType = objType === formattedType;

    // 🔥 viktig fix → includes istället för ===
    const matchArea =
      objArea === formattedArea ||
      objArea?.includes(formattedArea);

    return matchType && matchArea;
  });
  const faqs = [
    {
      q: `Can foreigners buy property in ${formattedArea}, Zanzibar?`,
      a: `Yes, foreigners can buy property in ${formattedArea}, Zanzibar through secure leasehold structures (typically 33 to 99 years) which are fully protected and renewable. Zanzibari laws promote foreign investments, especially in designated resort zones approved by ZIPA.`
    },
    {
      q: `Is ${formattedArea} a good place to invest in real estate?`,
      a: `Yes, ${formattedArea} is one of the hot spots for real estate in Zanzibar. It offers high rental yields (often between 10% and 18% annually) driven by strong tourist traffic, high holiday occupancy rates, and significant capital growth.`
    },
    {
      q: `What types of properties are for sale in ${formattedArea}, Zanzibar?`,
      a: `A wide variety of properties are available in ${formattedArea}, including beachfront villas, modern apartments, undeveloped land plots, hotels, and commercial listings. You can browse them on ZanziHome.`
    },
    {
      q: `How much does a property cost in ${formattedArea}, Zanzibar?`,
      a: `Prices in ${formattedArea} vary. Beachfront villas range from $250,000 to over $1M, while apartments can start from $80,000 and inland land plots can start as low as $15,000 depending on proximity to the ocean.`
    },
    {
      q: `Are there additional transaction costs when buying property in ${formattedArea}?`,
      a: "Yes. Buyers should expect around 3% to 5% in additional costs. This includes local transfer taxes, legal fees (usually 1% to 2% for a local lawyer), and agency registration fees."
    },
    {
      q: `Do I need a local bank account to buy real estate in Zanzibar?`,
      a: "No, a local bank account is not strictly required. Most transactions are made via international wire transfers in USD directly to the seller's escrow or legal representative account."
    },
    {
      q: `Can I get a residency permit by investing in property in ${formattedArea}?`,
      a: "Yes, under the ZIPA framework, foreign investors purchasing properties in approved projects with a minimum value (typically starting at $100,000) are eligible to apply for Zanzibar residency permits."
    },
    {
      q: `Is it safe to buy land plots in ${formattedArea}?`,
      a: "Yes, it is safe if you perform proper due diligence. This includes conducting land registry searches, verifying ownership certificates, checking government zoning plans, and hiring a reputable lawyer."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "ZanziHome",
        "url": "https://www.zanzihome.com/",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `https://www.zanzihome.com/properties?search={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "name": "ZanziHome",
        "url": "https://www.zanzihome.com/",
        "logo": "https://www.zanzihome.com/logo.png",
        "sameAs": [
          "https://www.facebook.com/",
          "https://www.instagram.com/"
        ]
      },
      {
        "@type": "RealEstateAgent",
        "name": "ZanziHome Real Estate",
        "url": window.location.href,
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
        "url": window.location.href,
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
            "name": `${formattedType} in Zanzibar`,
            "item": `https://www.zanzihome.com/buy/${formattedType}/`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${formattedType} in ${formattedArea}`,
            "item": window.location.href
          }
        ]
      }
    ]
  };

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
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "1rem" }}>
      
      {/* SEO */}
    <Helmet>
  {/* BASIC */}
  <meta charSet="utf-8" />

  {/* TITLE */}
  <title>{seo.title}</title>

  {/* PRIMARY META */}
  <meta name="description" content={seo.description} />
  <meta name="keywords" content={`${formattedType} in ${formattedArea}, property Zanzibar, real estate Zanzibar, buy property Zanzibar, rent property Zanzibar`} />

  {/* CANONICAL (SUPER IMPORTANT) */}
  <link rel="canonical" href={window.location.href} />

  {/* INDEXING */}
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="googlebot" content="index, follow" />

  {/* MOBILE */}
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  {/* OPEN GRAPH (FACEBOOK) */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content={seo.title} />
  <meta property="og:description" content={seo.description} />
  <meta property="og:url" content={window.location.href} />
  <meta property="og:image" content="https://images.pexels.com/photos/2724078/pexels-photo-2724078.jpeg" />
  <meta property="og:site_name" content="ZanziHome" />

  {/* TWITTER */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={seo.title} />
  <meta name="twitter:description" content={seo.description} />
  <meta name="twitter:image" content="https://images.pexels.com/photos/2724078/pexels-photo-2724078.jpeg" />

  {/* GEO SEO (UNDERSKATTAT) */}
  <meta name="geo.region" content="TZ-ZN" />
  <meta name="geo.placename" content="Zanzibar" />

  {/* EXTRA SEO SIGNALS */}
  <meta name="author" content="ZanziHome" />
  <meta name="language" content="en" />
  <meta name="revisit-after" content="1 days" />

  {/* SCHEMA */}
  <script type="application/ld+json">
    {JSON.stringify(schema)}
  </script>
  <script type="application/ld+json">
  {JSON.stringify(faqSchema)}
</script>
</Helmet>

      {/* HEADER */}
      <h1 style={{ fontSize: "2rem", fontWeight: "700" }}>
        {seo.h1}
      </h1>

      <p style={{ marginTop: "1rem", lineHeight: "1.7", maxWidth: "800px" }}>
        {seo.content}
      </p>

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
            key={i}
            to={`/propertys/property/${item.adId}`}
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
                src={item.uri || item.imagesArray?.[0]}
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
              key={t}
              to={`/buy/${t}/${area}`}
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
              key={a}
              to={`/buy/${type}/${a.toLowerCase()}`}
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