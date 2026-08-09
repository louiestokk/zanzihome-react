import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { Helmet } from "react-helmet-async";
import { areas, propertyTypes } from "../utils/seoData";
import PartnerFeaturedSection from "../components/PartnerFeaturedSection";
import MatchRequestStepper from "../components/MatchRequestStepper";
import Abovefooter from "../components/Abovefooter";
import { BsCompass } from "react-icons/bs";

const SeoCheapPages = () => {
  const { type, area } = useParams();
  const firestoreData = useSelector(getFirestoreData) || [];
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

    const objType = obj.category?.toLowerCase().trim();
    const objArea = obj.Area?.toLowerCase().replace(/[-\s]/g, "");

    const matchType = objType === type.toLowerCase().trim();
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
        "url": window.location.href,
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
            "item": window.location.href
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
      <Helmet>
        <title>{`Cheap ${formattedType} for Sale in ${formattedArea}, Zanzibar by Owner`}</title>
        <meta
          name="description"
          content={`Looking for cheap ${type} for sale in ${formattedArea}, Zanzibar? Discover budget beachfront villas, apartments, plots, and houses starting from low prices on ZanziHome.`}
        />
        <meta
          name="keywords"
          content={`cheap ${type} for sale in ${formattedArea}, budget property ${formattedArea}, cheap house zanzibar by owner, affordable villa ${formattedArea} zanzibar`}
        />
        <link rel="canonical" href={window.location.href} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Cheap ${formattedType} for Sale in ${formattedArea}, Zanzibar by Owner`} />
        <meta
          property="og:description"
          content={`Find budget-friendly beachfront villas, land plots, houses, and apartments in ${formattedArea}, Zanzibar. Contact owners directly.`}
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg" />

        {/* JSON-LD Schemas */}
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <style>{`
        .cheap-seo-page {
          font-family: 'Poppins', sans-serif;
          color: #1f2937;
          background: #fafbfa;
          padding-bottom: 60px;
        }

        .cheap-hero {
          background: linear-gradient(135deg, #022c12 0%, #013a17 100%);
          color: #ffffff;
          padding: 70px 20px;
          text-align: center;
          position: relative;
        }

        .cheap-hero::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 24px;
          background: #fafbfa;
          clip-path: ellipse(60% 100% at 50% 100%);
        }

        .cheap-breadcrumbs {
          display: flex;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          color: #a3b899;
          margin-bottom: 12px;
        }
        
        .cheap-breadcrumbs a {
          color: #a3b899;
          text-decoration: none;
        }
        
        .cheap-breadcrumbs a:hover {
          color: #ffffff;
        }

        .cheap-hero-title {
          font-size: 34px;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .cheap-hero-subtitle {
          font-size: 15px;
          color: #d1e2c9;
          max-width: 650px;
          margin: 12px auto 0 auto;
          font-weight: 300;
          line-height: 1.5;
        }

        .cheap-container {
          max-width: 1200px;
          margin: 40px auto 0 auto;
          padding: 0 16px;
        }

        .results-meta-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .results-heading {
          font-size: 18px;
          font-weight: 700;
          color: #013a17;
          margin: 0;
        }

        /* Properties Cards Grid */
        .properties-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 50px;
        }

        .property-card {
          border-radius: 16px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .property-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 30px rgba(0,0,0,0.08);
          border-color: rgba(1, 58, 23, 0.15);
        }

        .card-img-wrapper {
          position: relative;
          height: 190px;
          overflow: hidden;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .property-card:hover .card-img {
          transform: scale(1.06);
        }

        .badge-cheap {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #ef4444;
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 6px;
          text-transform: uppercase;
        }

        .card-body {
          padding: 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-title {
          font-size: 15.5px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 6px 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 44px;
        }

        .card-location {
          font-size: 12.5px;
          color: #6b7280;
          margin-bottom: 12px;
        }

        .card-specs {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid #f3f4f6;
          margin-top: 10px;
        }

        .card-price {
          font-size: 16px;
          font-weight: 800;
          color: #013a17;
        }

        .card-size {
          font-size: 12px;
          color: #4b5563;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Empty State */
        .empty-box {
          background: #ffffff;
          border-radius: 16px;
          padding: 60px 20px;
          text-align: center;
          border: 1px solid rgba(0,0,0,0.05);
          max-width: 600px;
          margin: 40px auto;
        }

        .empty-title {
          font-size: 20px;
          font-weight: 700;
          color: #013a17;
          margin-bottom: 8px;
        }

        .empty-text {
          font-size: 14px;
          color: #6b7280;
          max-width: 400px;
          margin: 0 auto 24px auto;
          line-height: 1.5;
        }

        .empty-link-btn {
          display: inline-block;
          background: #013a17;
          color: #ffffff;
          padding: 12px 30px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.2s;
        }

        .empty-link-btn:hover {
          background: #0d2818;
        }

        /* Onpage Informational Content */
        .info-section {
          background: #ffffff;
          border-radius: 16px;
          padding: 30px;
          border: 1px solid rgba(0,0,0,0.05);
          margin-bottom: 40px;
          line-height: 1.7;
        }

        .info-section h2 {
          font-size: 22px;
          font-weight: 800;
          color: #013a17;
          margin: 0 0 12px 0;
        }

        /* FAQ Styling */
        .faq-box {
          max-width: 850px;
          margin: 50px auto;
        }

        .faq-box h2 {
          font-size: 22px;
          font-weight: 800;
          color: #013a17;
          margin-bottom: 20px;
          text-align: center;
        }

        .faq-item {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          margin-bottom: 12px;
          overflow: hidden;
        }

        .faq-btn {
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 16px;
          font-size: 14.5px;
          font-weight: 700;
          color: #013a17;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          outline: none;
        }

        .faq-arrow {
          transition: transform 0.3s ease;
        }

        .faq-ans {
          padding: 0 16px 16px 16px;
          font-size: 13.5px;
          color: #4b5563;
          line-height: 1.6;
        }

        /* Cross Linking Grid */
        .linking-section {
          margin-top: 40px;
          border-top: 1px solid #e5e7eb;
          padding-top: 30px;
        }

        .linking-section h3 {
          font-size: 15px;
          font-weight: 700;
          color: #013a17;
          margin-bottom: 12px;
        }

        .linking-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .linking-tag {
          background: #f3f4f6;
          color: #4b5563;
          padding: 6px 14px;
          border-radius: 30px;
          font-size: 11.5px;
          font-weight: 600;
          text-decoration: none;
          border: 1px solid #e5e7eb;
          transition: all 0.2s;
        }

        .linking-tag:hover {
          background: #013a17;
          color: #ffffff;
          border-color: #013a17;
        }

        @media (max-width: 768px) {
          .cheap-hero {
            padding: 50px 20px;
          }
          .cheap-hero-title {
            font-size: 26px;
          }
          .info-section {
            padding: 20px;
          }
        }
      `}</style>

      {/* Hero Header */}
      <section className="cheap-hero">
        <div className="cheap-breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/properties-zanzibar">Properties</Link>
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
                      <Link to={`/propertys/property/${adId}`}>
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
                        <Link to={`/propertys/property/${adId}`} style={{ textDecoration: "none" }}>
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
            <Link to="/properties-zanzibar" className="empty-link-btn">
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
                key={t}
                to={`/cheap/${t.toLowerCase()}/for-sale/${area}`}
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
                key={a}
                to={`/cheap/${type}/for-sale/${a.toLowerCase().replace(/\s+/g, "-")}`}
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
