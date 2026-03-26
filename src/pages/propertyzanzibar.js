import React from "react";
import { Helmet } from "react-helmet-async";
import BannerSection from "../components/BannerSection";
import NewFilter from "../components/newfilter/NewFilter";
import Popular from "../components/Popular";
import Faq from "../components/Faq";
import { faqdata } from "../utils/faq";

const propertyzanzibar = () => {

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "ZanziHome",
      "url": "https://www.zanzihome.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.zanzihome.com/properties?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "name": "ZanziHome",
      "url": "https://www.zanzihome.com",
      "logo": "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "sameAs": [
        "https://www.facebook.com/zanzihome",
        "https://www.instagram.com/zanzihome",
        "https://twitter.com/zanzihome"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+255-655-912498",
        "contactType": "customer service",
        "areaServed": "Zanzibar"
      }
    },
    {
      "@type": "RealEstateAgent",
      "name": "ZanziHome Real Estate Zanzibar",
      "url": "https://www.zanzihome.com",
      "logo": "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "description": "Find houses, apartments, land and real estate for sale or rent in Zanzibar.",
      "areaServed": {
        "@type": "Place",
        "name": "Zanzibar"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Zanzibar Property Listings",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Beachfront Villa in Zanzibar",
              "description": "Luxury villa for sale in Stone Town, Zanzibar",
              "category": "Real Estate",
              "url": "https://www.zanzihome.com/propertys/property/392626940"
            },
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "House in Paje",
              "description": "Modern House for rent in Paje, Zanzibar",
              "category": "Real Estate",
              "url": "https://www.zanzihome.com/propertys/property/619009"
            },
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        ]
      }
    },
    {
      "@type": "LocalBusiness",
      "name": "ZanziHome Real Estate",
      "image": "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "N/A",
        "addressLocality": "Stone Town",
        "addressRegion": "Zanzibar",
        "postalCode": "00000",
        "addressCountry": "TZ"
      },
      "telephone": "+255-655-912498",
      "priceRange": "$$"
    }
  ]
};

  return (
    <div>
      {/* ✅ SCHEMA */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* ✅ SEO META */}
      <Helmet>
        <meta charSet="utf-8" />

        <title>
          Real Estate Zanzibar | Houses for Sale & Rent in Zanzibar
        </title>

        <meta
          name="description"
          content="Find the best real estate in Zanzibar. Browse houses for sale, apartments, land and rentals in Zanzibar. Buy or rent property in Zanzibar بسهولة with ZanziHome."
        />

        <meta
          name="keywords"
          content="real estate zanzibar, houses for sale zanzibar, property zanzibar, apartments zanzibar, land for sale zanzibar, rent house zanzibar"
        />

        {/* Open Graph */}
        <meta property="og:url" content="https://www.zanzihome.com" />
        <meta
          property="og:title"
          content="Real Estate Zanzibar | Houses for Sale & Rent"
        />
        <meta
          property="og:description"
          content="Browse houses, apartments and land for sale or rent in Zanzibar. Your #1 real estate platform in Zanzibar."
        />
        <meta
          property="og:image"
          content="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Real Estate Zanzibar | ZanziHome"
        />
        <meta
          name="twitter:description"
          content="Find houses, apartments and land in Zanzibar."
        />
      </Helmet>

      <NewFilter />
      <BannerSection />
<div style={{marginTop:'50px'}}>
     <Popular
        title={"Featured Properties in Zanzibar"}
        images={[
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2F44E71F23-2098-4D81-B2E4-116345638B9E.jpeg?alt=media&token=7714cb00-23b7-4f23-bdb1-98bcef7ecf53",
            imgText: "Beachfront plot for sale in Zanzibar",
            adId: Number(624688142),
            type: "Properties"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fmichamvi.jpg?alt=media&token=5d8e4bb0-d3e7-4253-97c0-0ee2133bf4b6",
            imgText: "Land for sale in Michamvi Zanzibar",
            adId: Number(801410),
            type: "Properties"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FFE741E1B-C0CF-46D2-B772-162CF9A28BBD.jpeg?alt=media&token=6144208c-93ee-46ab-9449-658234545b22",
            imgText: "Hotel property for rent in Zanzibar",
            adId: Number(382045),
            type: "Properties"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fyhouse2.jpg?alt=media&token=4b06691f-8afd-418f-bce7-f972cc5143a5",
            imgText: "Villa for rent in Zanzibar",
            adId: Number(338429),
            type: "Properties"
          }
        ]}
      />
</div>
 

      <div style={{ height: "15px" }}></div>

      <Faq data={faqdata} />

      <div style={{ height: "20px" }}></div>

      {/* ✅ SEO TEXT CONTENT */}
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <h2 className="poppins" style={{ maxWidth: "85%", margin: "1rem auto" }}>
          Real Estate in Zanzibar – Buy, Sell & Rent Properties
        </h2>

        <p
          className="sans"
          style={{
            maxWidth: "90%",
            margin: "0rem auto",
            lineHeight: "26px",
            color: "black"
          }}
        >
          ZanziHome is the leading platform for real estate in Zanzibar. 
          Discover houses for sale in Zanzibar, apartments for rent, beachfront villas, 
          land for investment and commercial properties across the island.

          Whether you are looking to buy property in Zanzibar, invest in land, 
          or find a house for rent, ZanziHome connects you with the best real estate opportunities.

          Explore popular areas such as Nungwi, Kendwa, Paje, Jambiani and Stone Town. 
          Our listings include verified properties with real photos, detailed descriptions 
          and direct contact with property owners and agents.

          Start your property search today and find your dream home in Zanzibar.
        </p>

        {/* TRUST */}
        <div style={{ margin: "2rem 0" }}>
          <h2 className="best-airmax-text">Trusted by Property Seekers</h2>
          <p>
            Based on <strong>1540+ reviews</strong>
          </p>
          <img
            src="https://www.snijpunt.com/files/thumbnails/trustpilot-logo-snijpunt.1600x680x1.png"
            alt="trustpilot"
            style={{ height: "120px", width: "300px", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default propertyzanzibar;