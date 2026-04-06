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

    // 🔥 WEBSITE
    {
      "@type": "WebSite",
      "@id": "https://www.zanzihome.com/#website",
      "url": "https://www.zanzihome.com/",
      "name": "ZanziHome",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.zanzihome.com/properties?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },

    // 🔥 WEBPAGE (SUPER IMPORTANT)
    {
      "@type": "WebPage",
      "@id": "https://www.zanzihome.com/#webpage",
      "url": "https://www.zanzihome.com/",
      "name": "Real Estate Zanzibar | Buy & Rent Property",
      "description": "Find houses, villas, apartments and land for sale or rent in Zanzibar.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://www.zanzihome.com/#website"
      }
    },

    // 🔥 ORGANIZATION
    {
      "@type": "Organization",
      "@id": "https://www.zanzihome.com/#organization",
      "name": "ZanziHome",
      "url": "https://www.zanzihome.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.zanzihome.com/logo.png"
      },
      "sameAs": [
        "https://www.facebook.com/zanzihome",
        "https://www.instagram.com/zanzihome"
      ]
    },

    // 🔥 REAL ESTATE AGENT
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.zanzihome.com/#agent",
      "name": "ZanziHome Real Estate",
      "url": "https://www.zanzihome.com/",
      "areaServed": {
        "@type": "Place",
        "name": "Zanzibar"
      },
      "makesOffer": {
        "@type": "OfferCatalog",
        "name": "Properties in Zanzibar",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "House",
              "name": "Villa in Paje",
              "url": "https://www.zanzihome.com/propertys/property/498610417"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Apartment",
              "name": "Apartment in Zanzibar",
              "url": "https://www.zanzihome.com/propertys/property/619009"
            }
          }
        ]
      }
    },

    // 🔥 ITEM LIST (RANKING BOOST)
    {
      "@type": "ItemList",
      "name": "Top Properties in Zanzibar",
      "itemListOrder": "https://schema.org/ItemListOrderAscending",
      "numberOfItems": 4,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Apartment in Paje",
          "url": "https://www.zanzihome.com/propertys/property/498610417"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Beachfront Plot Zanzibar",
          "url": "https://www.zanzihome.com/propertys/property/624688142"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Plot in Michamvi",
          "url": "https://www.zanzihome.com/propertys/property/801410"
        },
         {
          "@type": "ListItem",
          "position": 4,
          "name": "Villa for rent in Paje Zanzibar",
          "url": "https://www.zanzihome.com/propertys/property/338429"
        }
      ]
    },

    // 🔥 LOCAL BUSINESS
    {
      "@type": "LocalBusiness",
      "name": "ZanziHome",
      "areaServed": "Zanzibar",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Zanzibar",
        "addressCountry": "TZ"
      },
      "telephone": "+255655912498"
    },

    // 🔥 PLACE (GEO BOOST)
    {
      "@type": "Place",
      "name": "Zanzibar",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -6.1659,
        "longitude": 39.2026
      }
    },

    // 🔥 FAQ (FULL SEO WEAPON)
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can foreigners buy property in Zanzibar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, foreigners can buy property in Zanzibar through long-term leasehold agreements up to 99 years."
          }
        },
        {
          "@type": "Question",
          "name": "Is Zanzibar good for real estate investment?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Zanzibar is a fast-growing real estate market with strong tourism demand and high rental yields."
          }
        },
        {
          "@type": "Question",
          "name": "What types of property are available in Zanzibar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can find houses, villas, apartments, land and beachfront properties for sale or rent."
          }
        },
        {
          "@type": "Question",
          "name": "Can I rent out my property in Zanzibar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, property owners can rent out their property short-term or long-term, including Airbnb rentals."
          }
        },
        {
          "@type": "Question",
          "name": "What are the best areas to buy property in Zanzibar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Popular areas include Paje, Nungwi, Kendwa, Jambiani and Stone Town."
          }
        },
        {
          "@type": "Question",
          "name": "Is Zanzibar real estate affordable?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Zanzibar offers competitive property prices compared to other beachfront markets worldwide."
          }
        }
      ]
    }

  ]
};

  return (
    <div>
      <Helmet>
          <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
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
        <meta property="og:url" content="https://www.zanzihome.com/" />
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
        <link rel="canonical" href="https://www.zanzihome.com/" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <NewFilter />
      <BannerSection />
<div style={{marginTop:'50px'}}>
     <Popular
        title={"Featured Properties in Zanzibar"}
        images={[
             {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FIMG_3080.jpeg?alt=media&token=49589f26-6b0a-4736-98c6-396dc681dc9d",
            imgText: "Central Apartment Paje",
            adId: Number(498610417),
            type: "Apartment"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2F44E71F23-2098-4D81-B2E4-116345638B9E.jpeg?alt=media&token=7714cb00-23b7-4f23-bdb1-98bcef7ecf53",
            imgText: "Beachfront plot for sale in Zanzibar",
            adId: Number(624688142),
            type: "Plot"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fmichamvi.jpg?alt=media&token=5d8e4bb0-d3e7-4253-97c0-0ee2133bf4b6",
            imgText: "Plot for sale in Michamvi Zanzibar",
            adId: Number(801410),
            type: "Plot"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fyhouse2.jpg?alt=media&token=4b06691f-8afd-418f-bce7-f972cc5143a5",
            imgText: "Villa for rent in Zanzibar",
            adId: Number(338429),
            type: "Rent"
          }
        ]}
      />
</div>
<section style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
  <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "20px", textAlign: "center" }}>
    Explore Top Zanzibar Areas
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
      textAlign: "center"
    }}
  >
    <a title="real estate Paje" href="/properties-zanzibar" style={{textDecoration:'none',color:'inherit'}}>
     <div style={{ padding: "20px", borderRadius: "10px", background: "#f9f9f9", transition: "transform 0.3s", cursor: "pointer" }}>
      <img src="https://i.ibb.co/Xxz2sDwV/real-estate-paje.webp" alt="real estate Paje" style={{ borderRadius: "8px", marginBottom: "10px", width: "100%", height: "120px", objectFit: "cover" }} />
      <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Paje</h3>
      <p style={{ fontSize: "15px", color: "#555" }}>Ideal for beachfront villas and kite-surfing rentals.</p>
    </div>
    </a>
   
    <a title="real estate Nungwi" href="/properties-zanzibar" style={{textDecoration:'none',color:'inherit'}}>
      <div style={{ padding: "20px", borderRadius: "10px", background: "#f9f9f9", transition: "transform 0.3s", cursor: "pointer" }}>
      <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&h=120" alt="real estate Nungwi" style={{ borderRadius: "8px", marginBottom: "10px", width: "100%", height: "120px", objectFit: "cover" }} />
      <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Nungwi</h3>
      <p style={{ fontSize: "15px", color: "#555" }}>Popular tourist destination with high rental demand.</p>
    </div>
    </a>
   <a title="real estate Stone Town" href="/properties-zanzibar" style={{textDecoration:'none',color:'inherit'}}>
    <div style={{ padding: "20px", borderRadius: "10px", background: "#f9f9f9", transition: "transform 0.3s", cursor: "pointer" }}>
      <img src="https://i.ibb.co/MkQqpbB1/real-estate-stone-town.jpg" alt="Real Estate Stone Town" style={{ borderRadius: "8px", marginBottom: "10px", width: "100%", height: "120px", objectFit: "cover" }} />
      <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Stone Town</h3>
      <p style={{ fontSize: "15px", color: "#555" }}>Cultural center with historic properties and charming streets.</p>
    </div>
   </a>
   
<a title="real estate Jambiani" href="/properties-zanzibar" style={{textDecoration:'none',color:'inherit'}}>
 <div style={{ padding: "20px", borderRadius: "10px", background: "#f9f9f9", transition: "transform 0.3s", cursor: "pointer" }}>
      <img src="https://i.ibb.co/DgKcK2hF/real-estate-jambiani.jpg" alt="Real Estate Jambiani" style={{ borderRadius: "8px", marginBottom: "10px", width: "100%", height: "120px", objectFit: "cover" }} />
      <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Jambiani</h3>
      <p style={{ fontSize: "15px", color: "#555" }}>Peaceful village, perfect for holiday rentals and beachfront homes.</p>
    </div>
</a>
   
<a title="real estate Kendwa" href="/properties-zanzibar" style={{textDecoration:'none',color:'inherit'}}>
  <div style={{ padding: "20px", borderRadius: "10px", background: "#f9f9f9", transition: "transform 0.3s", cursor: "pointer" }}>
      <img src="https://i.ibb.co/Nn2cSgCj/real-estate-kendwa.jpg" alt="Real Estate Kendwa" style={{ borderRadius: "8px", marginBottom: "10px", width: "100%", height: "120px", objectFit: "cover" }} />
      <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Kendwa</h3>
      <p style={{ fontSize: "15px", color: "#555" }}>Vibrant nightlife and beautiful beaches attract investors and tourists.</p>
    </div>
</a>
<a title="real estate Bwejuu" href="/properties-zanzibar" style={{textDecoration:'none',color:'inherit'}}>
   <div style={{ padding: "20px", borderRadius: "10px", background: "#f9f9f9", transition: "transform 0.3s", cursor: "pointer" }}>
      <img src="https://i.ibb.co/mFqDnf6L/real-estate-bwejuu.webp" alt="Real Estate Bwejuu" style={{ borderRadius: "8px", marginBottom: "10px", width: "100%", height: "120px", objectFit: "cover" }} />
      <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Bwejuu</h3>
      <p style={{ fontSize: "15px", color: "#555" }}>Quiet area, ideal for families and long-term rentals.</p>
    </div>
</a>
 
  </div>
</section>
<section style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
  <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "20px"}}>
    Your Ultimate Guide to Real Estate in Zanzibar
  </h2>

  <p style={{ lineHeight: "26px", color: "#333", marginBottom: "20px" }}>
    Zanzibar is one of the fastest-growing real estate markets in East Africa. 
    With its pristine beaches, rich culture, and growing tourism, the island offers 
    unique opportunities for both investors and homebuyers. Whether you are looking 
    for a beachfront villa, a cozy apartment, or a plot for long-term development, 
    Zanzibar has it all.
  </p>

  <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "15px" }}>
    Why Invest in Zanzibar Property?
  </h3>
  <ul style={{ lineHeight: "1.8", color: "#555", marginBottom: "20px" }}>
    <li>Strong tourism growth creating high rental demand and solid ROI.</li>
    <li>Affordable property prices compared to other beach destinations worldwide.</li>
    <li>Variety of property types: villas, apartments, plots, commercial properties.</li>
    <li>Government initiatives supporting foreign investment and long-term leases.</li>
    <li>Beautiful landscapes and vibrant culture attracting holidaymakers year-round.</li>
  </ul>

  <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "15px" }}>
    Popular Areas to Buy Property
  </h3>
  <p style={{ lineHeight: "26px", color: "#333", marginBottom: "20px" }}>
    Each area in Zanzibar has its own charm and investment potential:
  </p>

  <ul style={{ lineHeight: "1.8", color: "#555", marginBottom: "20px" }}>
    <li><strong>Paje:</strong> Famous for kite surfing, beach bars, and vibrant vacation rentals.</li>
    <li><strong>Nungwi:</strong> Bustling tourist hotspot with stunning sunsets and premium villas.</li>
    <li><strong>Stone Town:</strong> UNESCO World Heritage Site, perfect for historic properties and boutique hotels.</li>
    <li><strong>Jambiani:</strong> Calm fishing village with relaxed lifestyle and beachfront cottages.</li>
    <li><strong>Kendwa:</strong> Ideal for nightlife lovers and luxury holiday homes.</li>
    <li><strong>Bwejuu:</strong> Family-friendly, quiet beaches, and long-term rental potential.</li>
    <li><strong>Michamvi:</strong> Emerging area with good value plots and development opportunities.</li>
    <li><strong>Fumba:</strong> Eco-friendly community with growing real estate projects.</li>
    <li><strong>Kizimkazi:</strong> Known for dolphins, peaceful beaches, and villa investments.</li>
  </ul>

  <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "15px" }}>
    Tips for Buyers
  </h3>
  <p style={{ lineHeight: "26px", color: "#333", marginBottom: "20px" }}>
    Before purchasing a property in Zanzibar:
  </p>
  <ul style={{ lineHeight: "1.8", color: "#555", marginBottom: "20px" }}>
    <li>Check lease terms if you are a foreign buyer; most properties allow up to 99-year leases.</li>
    <li>Consider proximity to beaches, amenities, and tourist hotspots.</li>
    <li>Work with verified agents to ensure safe and legal transactions.</li>
    <li>Plan for property management if you intend to rent out your investment.</li>
    <li>Research upcoming infrastructure projects for long-term value growth.</li>
  </ul>

  <p style={{ lineHeight: "26px", color: "#333", marginTop: "20px" }}>
    With the right guidance, investing in Zanzibar property can be a rewarding venture. 
    ZanziHome connects you with verified listings, trusted agents, and expert advice to make 
    your property journey smooth and successful.
  </p>
</section>
        <section style={{ marginTop: 20,marginLeft:16 }}>
        <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>House for sale in Zanzibar</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 }}>
          <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/house/paje"
          >
            House for sale Paje
          </a>
           <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/house/jambiani"
          >
            House for sale Jambiani
          </a>
            <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/house/nungwi"
          >
            House for sale Nungwi
          </a>
            <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/house/stone-town"
          >
            House for sale Stone Town
          </a>
               <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/house/bwejuu"
          >
            House for sale Bwejuu
          </a>
            <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/house/michamvi"
          >
            House for sale Michamvi
          </a>
        </div>
      </section>
         <section style={{ marginTop: 40,marginLeft:16 ,marginBottom:'60px'}}>
        <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>Apartments in Zanzibar</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 }}>
          <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/apartment/kizimkazi"
          >
            Apartments in Kizimkazi
          </a>
           <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/apartment/jambiani"
          >
            Apartments in Jambiani
          </a>
            <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/apartment/nungwi"
          >
            Apartments in Nungwi
          </a>
            <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/apartment/stone-town"
          >
             Apartments in Stone Town
          </a>
               <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/apartment/fumba"
          >
             Apartments in Fumba
          </a>
            <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/apartment/michamvi"
          >
             Apartments in Michamvi
          </a>
        </div>
      </section>
       <div style={{ background: "#ffeeba", padding: "1.5rem", textAlign: "center", margin: "3rem 0", borderRadius: "8px" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Advertise your property 🚀</h2>
        <p style={{ marginBottom: "1rem",lineHeight:'24px' }}>Do you have a house, apartment, plot or business to sell or rent out? List it on ZanziHome and reach thousands of active buyers and renters searching for properties in Zanzibar every day.</p>
        <a href="/checkout" style={{textDecoration:'none',color:'inherit'}}>
          <button style={{ padding: "0.8rem 1.5rem", background: "#013a17", color: "white", border: "none", borderRadius: "5px", fontWeight: "600", cursor: "pointer" }}>
          Add your property
        </button>
        </a>
      </div>
 <div style={{width:'100%',textAlign:'center',padding:'1rem',marginTop:'40px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
<h2>Why Zanzibar Property is an Attractive Investment</h2>
<p style={{marginTop:'0.3rem',lineHeight:'26px',maxWidth:'92%'}}>
  Zanzibar’s real estate market has seen strong growth due to increasing tourism,
  infrastructure improvements, and rising demand for holiday homes and rentals.
  Unlike many other beachfront destinations, prices remain relatively affordable
  while offering solid rental income potential.
</p>
 </div>
 <div style={{width:'100%',textAlign:'center',padding:'1rem',marginTop:'1rem',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
  <h2>Property Prices in Zanzibar — What to Expect</h2>
<p style={{marginTop:'0.3rem',lineHeight:'26px',maxWidth:'92%'}}>
  Prices vary by location, size and type of property. In central areas like
  Stone Town and Nungwi, land and villas command premium pricing due to
  proximity to beaches and amenities. Plots in up‑and‑coming areas like Michamvi
  offer value for long‑term investors.
</p>
 </div>
   
       <Faq data={faqdata} />
      <div style={{ textAlign: "center", marginTop: "60px" }}>
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