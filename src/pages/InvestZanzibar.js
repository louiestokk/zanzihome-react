import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import MatchRequestStepper from "../components/MatchRequestStepper";
import Abovefooter from "../components/Abovefooter";

const InvestZanzibar = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Why is Zanzibar real estate a good investment?",
      a: "Zanzibar is one of East Africa's fastest-growing tourist hubs, offering double-digit rental yields, rapid capital appreciation, and strong government incentives for foreign investors."
    },
    {
      q: "What is the typical ROI on Zanzibar rental properties?",
      a: "Average holiday rental yields in high-demand areas like Paje and Nungwi range between 10% to 18% annually, driven by year-round tourism."
    },
    {
      q: "Does Zanzibar offer tax incentives for real estate investors?",
      a: "Yes. Through the Zanzibar Investment Promotion Authority (ZIPA), strategic investments benefit from 0% capital gains tax, low corporate tax, and reduced income tax rates."
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
        "@id": "https://www.zanzihome.com/invest-in-zanzibar#article",
        "isPartOf": {
          "@id": "https://www.zanzihome.com/invest-in-zanzibar#webpage"
        },
        "headline": "Invest in Zanzibar: Ultimate Real Estate Investment Guide",
        "description": "Discover why Zanzibar is a top real estate investment destination in 2026. Learn about rental yields, ROI, and property market growth.",
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
        "@id": "https://www.zanzihome.com/invest-in-zanzibar#faq",
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
        <title>Invest in Zanzibar Real Estate | Zanzibar Investment Guide 2026</title>
        <meta
          name="description"
          content="Learn why investing in Zanzibar real estate offers high ROI, capital appreciation, and tax benefits. Read our comprehensive Zanzibar investment guide."
        />
        <meta
          name="keywords"
          content="invest in zanzibar, zanzibar real estate investment, buy property zanzibar, zanzibar property market, zanzibar ROI"
        />
        <link rel="canonical" href="https://www.zanzihome.com/invest-in-zanzibar" />
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

        .benefit-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-top: 20px;
        }

        @media (min-width: 600px) {
          .benefit-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .benefit-box {
          background: #f4f7f4;
          border-left: 4px solid #013a17;
          padding: 16px;
          border-radius: 0 8px 8px 0;
        }

        .benefit-box h3 {
          font-size: 15px;
          font-weight: 700;
          color: #013a17;
          margin: 0 0 6px 0;
        }

        .benefit-box p {
          font-size: 13px;
          color: #4b5563;
          margin: 0;
          line-height: 1.5;
        }

        /* FAQ Accordion styles */
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
        <h1 className="seo-hero-title">Invest in Zanzibar: The Ultimate Real Estate Guide</h1>
        <p className="seo-hero-subtitle">
          Unlock high yields, capital appreciation, and premium residency incentives by investing in Zanzibar's thriving property market.
        </p>
      </section>

      <div className="seo-container">
        <main className="seo-main-content">
          <article className="content-card">
            <h2>The Zanzibar Investment Opportunity</h2>
            <p>
              Zanzibar is rapidly emerging as a premier luxury real estate destination in the Indian Ocean. Driven by a stable political climate, high economic growth, and an ever-expanding tourism sector, the island represents a highly lucrative opportunity for property investors in 2026.
            </p>
            <p>
              Unlike traditional, saturated beachfront destinations worldwide, Zanzibar offers lower entry prices, pristine untouched beach locations, and exceptionally strong rental demand, making it ideal for buy-to-let investments.
            </p>

            <div className="benefit-grid">
              <div className="benefit-box">
                <h3>High Rental Yields</h3>
                <p>Properties in popular beach areas like Paje and Nungwi average between 10% and 18% rental ROI annually.</p>
              </div>
              <div className="benefit-box">
                <h3>Capital Growth</h3>
                <p>Zanzibar property values have grown by an average of 12-15% year-on-year over the past five years.</p>
              </div>
              <div className="benefit-box">
                <h3>Government Incentives</h3>
                <p>Tax relief, zero capital gains tax, and residency perks are available through ZIPA registration.</p>
              </div>
              <div className="benefit-box">
                <h3>Booming Tourism</h3>
                <p>Over 600,000 international visitors annually provide a stable holiday rental pool.</p>
              </div>
            </div>
          </article>

          <article className="content-card">
            <h2>Why Invest Now?</h2>
            <p>
              Zanzibar's government is heavily investing in infrastructure. Upgraded international airports, improved road networks, and modern utilities are turning the island into an easily accessible, year-round travel and living destination.
            </p>
            <p>
              Whether you are looking to purchase a modern beachfront apartment in Paje, a luxury villa in Kendwa, or invest in large tracts of land for commercial development, entering the market early ensures maximum returns.
            </p>
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
             <MatchRequestStepper />
        </main>
      </div>

      <Abovefooter />
    </div>
  );
};

export default InvestZanzibar;
