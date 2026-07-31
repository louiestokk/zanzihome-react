import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import MatchRequestStepper from "../components/MatchRequestStepper";
import Abovefooter from "../components/Abovefooter";

const BestAreas = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Where is the best place to buy property in Zanzibar?",
      a: "The best area depends on your goals. For high rental yields and tourism, Paje and Nungwi are unmatched. For peace and tranquility, Jambiani and Matemwe are ideal. For historic value, Stone Town is top."
    },
    {
      q: "Is Paje better than Nungwi for rental ROI?",
      a: "Both offer excellent returns, but Paje is highly popular for kite-surfing and active holidaymakers, keeping rental occupancy high year-round. Nungwi is home to large commercial beach resorts and attracts high-end luxury tourism."
    },
    {
      q: "What is Fumba Town?",
      a: "Fumba Town is a modern, eco-friendly masterplanned community located on the west coast, offering secure infrastructure, apartments, villas, and direct residency permits for foreign buyers."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.zanzihome.com/best-areas-buy-property-zanzibar#article",
        "isPartOf": {
          "@id": "https://www.zanzihome.com/best-areas-buy-property-zanzibar#webpage"
        },
        "headline": "Best Areas to Buy Property in Zanzibar: Investment Guide",
        "description": "Discover where to buy property in Zanzibar. Explore area breakdowns for Paje, Nungwi, Jambiani, Fumba and Stone Town real estate.",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&h=630",
        "datePublished": "2026-01-01T08:00:00+03:00",
        "dateModified": "2026-07-31T20:30:00+03:00",
        "author": {
          "@type": "Organization",
          "name": "ZanziHome"
        },
        "publisher": {
          "@type": "Organization",
          "name": "ZanziHome",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.zanzihome.com/logo.png"
          }
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.zanzihome.com/best-areas-buy-property-zanzibar#faq",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <div className="seo-page-layout">
      <Helmet>
        <title>Best Areas to Buy Property in Zanzibar | Where to Invest 2026</title>
        <meta
          name="description"
          content="Explore the best areas to buy property in Zanzibar. Discover the top locations for high ROI and beautiful beaches including Paje, Nungwi, Jambiani & Fumba."
        />
        <meta
          name="keywords"
          content="best areas to buy property in zanzibar, where to invest in zanzibar, paje beach property, nungwi real estate, buy land zanzibar"
        />
        <link rel="canonical" href="https://www.zanzihome.com/best-areas-buy-property-zanzibar" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <style>{`
        .seo-page-layout {
          font-family: 'Poppins', sans-serif;
          background: #fafbfa;
          color: #1f2937;
        }

        .seo-hero {
          background: linear-gradient(135deg, #013a17 0%, #0d2818 100%);
          color: #ffffff;
          padding: 60px 20px;
          text-align: center;
          position: relative;
        }

        .seo-hero-title {
          font-size: 36px;
          font-weight: 800;
          margin: 0 0 12px 0;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .seo-hero-subtitle {
          font-size: 15px;
          color: #d1e2c9;
          max-width: 700px;
          margin: 0 auto;
          font-weight: 300;
          line-height: 1.6;
        }

        .seo-container {
          max-width: 1200px;
          margin: 40px auto;
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        @media (min-width: 768px) {
          .seo-container {
            flex-direction: row;
            align-items: flex-start;
          }
          .seo-main-content {
            flex: 1.8;
          }
          .seo-sidebar {
            flex: 1.2;
            position: sticky;
            top: 100px;
          }
        }

        .content-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          border: 1px solid rgba(0,0,0,0.05);
          margin-bottom: 24px;
        }

        .content-card h2 {
          font-size: 22px;
          font-weight: 700;
          color: #013a17;
          margin: 0 0 16px 0;
        }

        .content-card p {
          font-size: 14.5px;
          line-height: 1.7;
          color: #4b5563;
          margin: 0 0 16px 0;
        }

        .content-card p:last-child {
          margin-bottom: 0;
        }

        .area-breakdown {
          margin: 20px 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .area-item {
          border-left: 4px solid #22c55e;
          padding-left: 16px;
        }

        .area-item h3 {
          font-size: 16px;
          font-weight: 700;
          color: #013a17;
          margin: 0 0 4px 0;
        }

        .area-item p {
          font-size: 13.5px;
          color: #4b5563;
          line-height: 1.5;
          margin: 0;
        }

        .faq-section {
          margin-top: 30px;
        }

        .faq-item {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 12px;
          overflow: hidden;
          transition: all 0.3s;
        }

        .faq-question {
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 18px;
          font-size: 14.5px;
          font-weight: 700;
          color: #013a17;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          outline: none;
        }

        .faq-answer {
          padding: 0 18px 18px 18px;
          font-size: 13.5px;
          color: #4b5563;
          line-height: 1.6;
        }

        .faq-chevron {
          transition: transform 0.3s;
          color: #013a17;
        }
      `}</style>

      <section className="seo-hero">
        <h1 className="seo-hero-title">Best Areas to Buy Property in Zanzibar</h1>
        <p className="seo-hero-subtitle">
          An in-depth guide comparing Zanzibar's top real estate regions, beaches, and investment hotspots.
        </p>
      </section>

      <div className="seo-container">
        <main className="seo-main-content">
          <article className="content-card">
            <h2>Where Should You Buy Real Estate?</h2>
            <p>
              Different regions in Zanzibar offer distinct lifestyles and ROI potentials. Depending on whether you are looking for maximum rental yields from tourists, a peaceful retirement haven, or commercial land, choosing the correct location is essential.
            </p>

            <div className="area-breakdown">
              <div className="area-item">
                <h3>Paje & Jambiani (South-East Coast)</h3>
                <p>The epicentre of tourism activity. Famous for white sands, kite-surfing, and vibrant holiday bungalows. Extremely high rental occupancy rates year-round (up to 80%).</p>
              </div>

              <div className="area-item">
                <h3>Nungwi & Kendwa (North Coast)</h3>
                <p>Zanzibar's famous non-tidal swimming beaches. Home to premium high-end hotels, active nightlife, and luxury private villas. Excellent capital appreciation.</p>
              </div>

              <div className="area-item">
                <h3>Fumba Peninsula (West Coast)</h3>
                <p>Ideal for families and expat residency. Fumba Town is a modern, eco-friendly city project offering stable infrastructure, security, and residency status.</p>
              </div>

              <div className="area-item">
                <h3>Kiwengwa & Matemwe (East Coast)</h3>
                <p>Beautiful, quiet stretches of beachfront. Kiwengwa is popular for large-scale Italian resorts, while Matemwe is known for premium dive sites and boutique villas.</p>
              </div>
            </div>
          </article>

          <div className="faq-section">
            <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#013a17", marginBottom: "20px" }}>
              Frequently Asked Questions
            </h2>
            <div className="faq-wrapper">
              {faqs.map((faq, index) => (
                <div className="faq-item" key={index}>
                  <button className="faq-question" onClick={() => toggleFaq(index)}>
                    <span>{faq.q}</span>
                    <span className="faq-chevron" style={{ transform: openFaq === index ? "rotate(180deg)" : "rotate(0)" }}>
                      ▼
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="faq-answer">
                      <p style={{ margin: 0 }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
   <MatchRequestStepper />
      <Abovefooter />
    </div>
  );
};

export default BestAreas;
