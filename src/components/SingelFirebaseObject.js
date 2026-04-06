import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import SingelObjectInfo from "./SingelObjectInfo";
import Brokers from "./Brokers";
import { useUserContext } from "../user_context";
import { useSelector } from "react-redux";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import Karusell from "./Karusell";
import SingelPageMap from "./SingelPageMap";
import SingeldefaultMapMapPage from "./SingeldefaultMapMapPage";
import AdBanner from "./AdBanner";
import Abovefooter from "./Abovefooter";
import { Helmet } from "react-helmet-async";
import { pageData } from "../pages/guides/data";

const SingelFirebaseObject = () => {
  const location = useLocation();
  const firestoreData = useSelector(getFirestoreData);
  const { saved, setSaved, user, loginWithRedirect } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [recivied, setRecivied] = useState(false);
  const { adId } = useParams();

  const selectedObjects = firestoreData.filter((object) =>
    location.pathname.includes(object.adId)
  );
  const currentObject = selectedObjects[0];
  const Area = currentObject?.Area;
const currentUrl = typeof window !== "undefined" ? window.location.href : "";
const faqs = [
  {
    q: `How to buy property in ${Area}?`,
    a: "Browse listings, contact agents, and complete the legal process with assistance from local experts."
  },
  {
    q: `Can foreigners buy property in ${Area}, Zanzibar?`,
    a: "Yes, foreigners can buy property through leasehold agreements approved by the Zanzibar government."
  },
  {
    q: `Can I rent in ${Area}?`,
    a: "Yes, both rental and sale properties are available across Zanzibar."
  },
  {
    q: `Is ${Area} a good investment area?`,
    a: `${Area} is one of the most attractive locations in Zanzibar with strong tourism demand and rental income potential.`
  },
  {
    q: `What is the average price of property in ${Area}?`,
    a: "Prices vary depending on property type, location and proximity to the beach."
  }
];
console.log(currentUrl)
const [openIndex, setOpenIndex] = useState(null);
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1rem" }}>
      {selectedObjects.map((object) => {
        const {
          Name,
          Email,
          Phone,
          Sell,
          Rent,
          Area,
          category,
          Title,
          Text,
          Price,
          adId,
          Size,
          lat,
          lng,
          Rooms,
          uri,
          imagesArray,
        } = object;
        return (
          <div
            key={adId}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              overflow: "hidden",
              marginBottom: "2rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              fontFamily: "Arial, sans-serif",
            }}
          >
           <Helmet>
  {/* Basic Meta */}
  <title>{`${Title} in ${Area} | Real Estate ${Area} Zanzibar`}</title>
  <meta
    name="description"
    content={`Looking for ${category?.toLowerCase()} in ${Area}, Zanzibar? Explore ${Title} with ${Rooms} rooms, ${Size} m², priced at $${Price}. View photos, map location, and contact brokers now.`}
  />
 <link rel="canonical" href={currentUrl} />

  {/* Open Graph */}
  <meta property="og:title" content={`${Title} in ${Area} | ZanziHome`} />
  <meta property="og:description" content={`Explore this ${category?.toLowerCase()} in ${Area}, Zanzibar. ${Rooms} rooms, ${Size} m², priced at $${Price}. Contact brokers today.`} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={currentUrl} />
  <meta property="og:image" content={imagesArray?.[0] || uri} />
  <meta property="og:site_name" content="ZanziHome" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${Title} in ${Area} | ZanziHome`} />
  <meta name="twitter:description" content={`Discover ${Title} in ${Area}, Zanzibar. ${Rooms} rooms, ${Size} m², $${Price}. Browse photos and contact brokers.`} />
  <meta name="twitter:image" content={imagesArray?.[0] || uri} />
  <meta name="twitter:site" content="@ZanziHome" />

  {/* JSON-LD Structured Data */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "name": "ZanziHome",
          "url": "https://www.zanzihome.com/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.zanzihome.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "WebPage",
          "name": `${Title} in ${Area}`,
          "url": currentUrl,
          "description": Text,
          "breadcrumb": {
            "@id": `${window.location.href}#breadcrumb`
          },
          "mainEntity": {
            "@type": "SingleFamilyResidence",
            "name": Title,
            "description": Text,
            "url": currentUrl,
            "image": imagesArray || [uri],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": Area,
              "addressCountry": "TZ"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": lat ? Number(lat) : null,
              "longitude": lng ? Number(lng) : null
            },
            "numberOfRooms": Rooms,
            "floorSize": {
              "@type": "QuantitativeValue",
              "value": Size,
              "unitCode": "MTK"
            },
            "offers": {
              "@type": "Offer",
              "price": Price,
              "priceCurrency": "USD",
              "url": currentUrl,
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "RealEstateAgent",
                "name": Name,
                "telephone": Phone,
                "email": Email
              }
            }
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${window.location.href}#breadcrumb`,
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.zanzihome.com/" },
            { "@type": "ListItem", "position": 2, "name": "Properties in Zanzibar", "item": "https://www.zanzihome.com/properties-zanzibar" },
            { "@type": "ListItem", "position": 3, "name": Title, "item": window.location.href }
          ]
        },
        {
          "@type": "ItemList",
          "name": `Other properties in ${Area}`,
          "itemListElement": firestoreData
            .filter(p => p.Area === Area && p.adId !== adId && p.adType !== 'Vehicle')
            .slice(0, 6)
            .map((p, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `https://www.zanzihome.com/propertys/property/${p.adId}/`,
              "name": p.Title
            }))
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": `How to buy property in ${Area}, Zanzibar?`,
              "acceptedAnswer": { "@type": "Answer", "text": `Browse available listings, contact brokers, and arrange viewings through ZanziHome.` }
            },
            {
              "@type": "Question",
              "name": `Can I rent ${category?.toLowerCase()} in ${Area}?`,
              "acceptedAnswer": { "@type": "Answer", "text": `Yes, ZanziHome lists both rental and sale properties in ${Area}, Zanzibar.` }
            }
          ]
        }
      ]
    })}
  </script>
</Helmet>

            {/* Image / Carousel */}
            <div style={{ position: "relative" }}>
              {imagesArray && imagesArray.length > 1 ? (
                <Karusell imagesArray={imagesArray} uri={uri} />
              ) : (
                <img
                  src={uri}
                  alt={`Property in ${Area}`}
                  title={`Property in ${Area}`}
                  style={{ width: "100%", height: "300px", objectFit: "cover" }}
                />
              )}
              {/* Heart Save Button */}
              <button
                onClick={(e) => {
                  if (user?.nickname) {
                    e.currentTarget.children[0].classList.toggle("fill-hjarta");
                    setSaved(!saved);
                    localStorage.setItem("zanzihomeSaved", adId);
                  } else {
                    e.currentTarget.textContent = "Login to save";
                  }
                }}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  display: "flex",
                  alignItems: "center",
                  background: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.5rem 0.75rem",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
              >
                <AiFillHeart
                  className="hjarta"
                  style={{ marginRight: "0.5rem", color: "#ef4444" }}
                />
                Save
              </button>
            </div>

            {/* Info Section */}
            <div style={{ padding: "1rem" }}>
              <h1 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>
                {category === "Hand" ? "Plot" : category} in {Area}
              </h1>
              <p style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#111827", marginBottom: "0.5rem" }}>
                {Title}
              </p>
              <button
                style={{
                  background: "#22c55e",
                  color: "white",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginBottom: "1rem",
                }}
              >
                See on map
              </button>
              <h3 style={{ fontSize: "1.5rem", color: "#16a34a" }}>
                {Sell === null && Rent === null ? `$${Price}.00` : `$${Price}/month`}
              </h3>
            </div>

            {/* Facts */}
            <div
              style={{
                display: "flex",
                borderTop: "1px solid #e5e7eb",
                borderBottom: "1px solid #e5e7eb",
                padding: "1rem",
                background: "#f9fafb",
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>Type</p>
                <p>{category === "Hand" ? "Land" : category}</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>Size</p>
                <p>{Size} m²</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>Rooms</p>
                <p>{Rooms}</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>Price</p>
                <p>{Sell === null && Rent === null ? `$${Price}.00` : `$${Price}/month`}</p>
              </div>
            </div>

            {/* Description */}
            <div style={{ padding: "1rem" }}>
              <SingelObjectInfo
                info={Text}
                showModal={showModal}
                setShowModal={setShowModal}
                recivied={recivied}
              />
            </div>

            {/* Brokers */}
            <div style={{ padding: "1rem" }}>
              <Brokers contact={Name} agency={Name} number={Phone} email={Email} />
            </div>

            {/* Boost Banner */}
            <div style={{ background: "#ffeeba", padding: "1.5rem", textAlign: "center", margin: "2rem 0", borderRadius: "8px" }}>
              <h2 style={{ marginBottom: "0.5rem" }}>Sell or Rent Faster!</h2>
              <p style={{ marginBottom: "1rem" }}>Boost your property listing and get maximum visibility on ZanziHome.</p>
              <button onClick={() => window.location.href = "/contact"} style={{ padding: "0.8rem 1.5rem", background: "#013a17", color: "white", border: "none", borderRadius: "5px", fontWeight: "600", cursor: "pointer" }}>
                Boost Your Listing
              </button>
            </div>

            {/* Map */}
            <div style={{ padding: "1rem" }}>
              <SingelPageMap Area={Area} userCoords={[Number(lat), Number(lng)]} Title={Title} />
            </div>
          </div>
        );
      })}

      {/* 🔥 RELATED PROPERTIES GRID */}
      <div style={{ marginTop: "3rem" }}>
        <h2 style={{ fontSize: "30px", fontWeight: "800", marginBottom: "20px" }}>
          More homes in {Area}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {firestoreData
            .filter(p => p.Area === Area && p.adId !== adId && p.adType !== "Vehicle")
            .slice(0, 6)
            .map(p => (
              <a
                key={p.adId}
                href={`/propertys/property/${p.adId}`}
                style={{
                  textDecoration: "none",
                  color: "#111",
                  borderRadius: "14px",
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  transition: "all 0.25s ease",
                  display: "block",
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.12)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)";
                }}
              >
                <div style={{ position: "relative", height: "180px" }}>
                  <img
                    src={p.imagesArray?.[0] || p.uri}
                    alt={p.Title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "10px",
                      background: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {p.category}
                  </div>
                </div>
                <div style={{ padding: "14px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "6px" }}>
                    {p.Title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#666" }}>
                    {p.Area} • {p.Rooms} rooms • {p.Size} m²
                  </p>
                  <p style={{ marginTop: "8px", fontWeight: "700", fontSize: "16px", color: "#0b8b3a" }}>
                    ${p.Price}
                  </p>
                </div>
              </a>
            ))}
        </div>
      </div>
            <div style={{height:'30px'}}></div>
      {/* 🔥 PROPERTY TYPE LINKS */}
      <h2 style={{ fontSize: "26px", fontWeight: "700", margin: "30px 0 15px 0" }}>
        Browse by property type in {Area}
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "40px" }}>
        {["apartment", "house", "plot"].map(type => (
          <a
            key={type}
            href={`/buy/${type}/${Area?.toLowerCase().replace(/\s+/g, "-")}`}
            style={{
              padding: "10px 18px",
              borderRadius: "30px",
              background: "#f3f4f6",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
              color: "#111",
              transition: "0.3s",
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "#0b8b3a";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "#f3f4f6";
              e.currentTarget.style.color = "#111";
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} in {Area}
          </a>
        ))}
      </div>

      {/* 🔥 TOP ZANZIBAR AREAS GRID */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "20px", textAlign: "center" }}>
          Explore Top Zanzibar Areas
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            textAlign: "center",
          }}
        >
          {[
            { title: "Paje", img: "https://i.ibb.co/Xxz2sDwV/real-estate-paje.webp", desc: "Ideal for beachfront villas and kite-surfing rentals." },
            { title: "Nungwi", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&h=120", desc: "Popular tourist destination with high rental demand." },
            { title: "Stone Town", img: "https://i.ibb.co/MkQqpbB1/real-estate-stone-town.jpg", desc: "Cultural center with historic properties and charming streets." },
            { title: "Jambiani", img: "https://i.ibb.co/DgKcK2hF/real-estate-jambiani.jpg", desc: "Peaceful village, perfect for holiday rentals and beachfront homes." },
            { title: "Kendwa", img: "https://i.ibb.co/Nn2cSgCj/real-estate-kendwa.jpg", desc: "Vibrant nightlife and beautiful beaches attract investors and tourists." },
            { title: "Bwejuu", img: "https://i.ibb.co/mFqDnf6L/real-estate-bwejuu.webp", desc: "Quiet area, ideal for families and long-term rentals." },
          ].map(area => (
            <div key={area.title} onClick={() => window.location.href = "/properties-zanzibar"} style={{ padding: "20px", borderRadius: "10px", background: "#f9f9f9", transition: "transform 0.3s", cursor: "pointer" }}>
              <img src={area.img} alt={area.title} style={{ borderRadius: "8px", marginBottom: "10px", width: "100%", height: "120px", objectFit: "cover" }} />
              <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>{area.title}</h3>
              <p style={{ fontSize: "15px", color: "#555" }}>{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 SEO TEXT */}
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "10px" }}>
          Property in {Area}, Zanzibar
        </h2>
        <p style={{ lineHeight: "26px", color: "#444" }}>
          Looking for property in {Area}? Discover apartments, houses and land for sale or rent in one of Zanzibar’s most attractive areas. 
          {Area} offers strong investment opportunities, growing tourism demand and excellent rental potential. 
          Explore similar listings, compare prices and find your perfect home in Zanzibar today.
        </p>
      </div>

      {/* Page Content / Guide */}
     <div style={{ marginTop: "2rem", position: "relative", borderRadius: "8px", overflow: "hidden",height:'100%' }}>
  {/* Bakgrundsbild */}
  <img
    src="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg"
    alt="buy property in Zanzibar"
    style={{ width: "100%", height: "440px", objectFit: "cover" }}
  />
<div style={{ marginTop: "3rem", maxWidth: "800px", marginInline: "auto" }}>
  <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "20px", textAlign: "center" }}>
    Frequently Asked Questions
  </h2>

  {faqs.map((faq, i) => (
    <div
      key={i}
      style={{
        borderBottom: "1px solid #e5e7eb",
        padding: "15px 0",
        cursor: "pointer"
      }}
      onClick={() => setOpenIndex(openIndex === i ? null : i)}
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h3 style={{ fontSize: "16px", fontWeight: "600" }}>
          {faq.q}
        </h3>
        <span style={{ fontSize: "20px" }}>
          {openIndex === i ? "−" : "+"}
        </span>
      </div>

      {openIndex === i && (
        <p style={{
          marginTop: "10px",
          color: "#555",
          lineHeight: "1.6",
          fontSize: "14px"
        }}>
          {faq.a}
        </p>
      )}
    </div>
  ))}
</div>
  {/* Overlay med text och knapp */}
  <div style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "440px",
    background: "rgba(0, 0, 0, 0.4)", // semi-transparent bakgrund
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    padding: "20px",
    textAlign: "center"
  }}>
    <h2 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "0.5rem" }}>
      Guide: Buy property in {Area} Zanzibar
    </h2>
    <p style={{ fontSize: "1rem", lineHeight: "1.4", maxWidth: "600px", marginBottom: "1rem" }}>
      {pageData?.underImgText}
    </p>
    <a href="/buy-property-zanzibar" style={{ textDecoration: "none" }}>
      <button
        style={{
          background: "#22c55e",
          color: "white",
          border: "none",
          padding: "0.8rem 1.6rem",
          borderRadius: "6px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
        }}
        onMouseOver={e => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.35)";
        }}
        onMouseOut={e => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
        }}
      >
        Read the guide
      </button>
    </a>
  </div>
</div>

      <Abovefooter />
    </div>
  );
};

export default SingelFirebaseObject;