import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import MatchRequestStepper from "../components/MatchRequestStepper";
import Abovefooter from "../components/Abovefooter";

const ResidencyInvestment = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Does buying property in Zanzibar grant residency?",
      a: "Yes. In 2021, the government introduced a residency-by-investment scheme. Buying real estate in an approved project (such as Fumba Town) grants residency permits to the buyer, their spouse, and children under 18."
    },
    {
      q: "What is the minimum investment required for residency?",
      a: "The minimum property investment required to qualify for residency in Zanzibar is $100,000 USD, though approved projects have specific unit sizes and conditions."
    },
    {
      q: "What are the tax advantages of investing in Zanzibar?",
      a: "Foreign investors under ZIPA approved projects benefit from 0% capital gains tax, a 50% reduction in local income tax, and exemption from customs duties on imported materials during development."
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
        "@id": "https://www.zanzihome.com/residency-by-investment-zanzibar#article",
        "isPartOf": {
          "@id": "https://www.zanzihome.com/residency-by-investment-zanzibar#webpage"
        },
        "headline": "Zanzibar Residency by Investment & Tax Incentives Guide",
        "description": "Learn how buying a property in Zanzibar grants residency and residency permits. Explore tax breaks, golden visa options and ZIPA benefits.",
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
        "@id": "https://www.zanzihome.com/residency-by-investment-zanzibar#faq",
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
        <title>Zanzibar Residency by Investment | Golden Visa & Tax Breaks</title>
        <meta
          name="description"
          content="Discover the Zanzibar residency-by-investment program. Learn how to secure permanent residency, golden visas, and tax incentives through real estate."
        />
        <meta
          name="keywords"
          content="zanzibar residency by investment, zanzibar golden visa, tax incentives zanzibar, fumba town residency"
        />
        <link rel="canonical" href="https://www.zanzihome.com/residency-by-investment-zanzibar" />
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

        .incentives-box {
          background: #f4f7f4;
          padding: 20px;
          border-radius: 12px;
          margin: 20px 0;
          border: 1px dashed #22c55e;
        }

        .incentives-box h3 {
          margin: 0 0 12px 0;
          font-size: 17px;
          color: #013a17;
          font-weight: 700;
        }

        .incentives-box ul {
          margin: 0;
          padding-left: 20px;
        }

        .incentives-box li {
          font-size: 13.5px;
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 6px;
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
        <h1 className="seo-hero-title">Zanzibar Residency by Investment</h1>
        <p className="seo-hero-subtitle">
          How to secure your residency permit and enjoy exclusive tax benefits by purchasing properties in Zanzibar.
        </p>
      </section>

      <div className="seo-container">
        <main className="seo-main-content">
          <article className="content-card">
            <h2>The Zanzibar Residency Scheme</h2>
            <p>
              In a bid to attract foreign investment, the government of Zanzibar rolled out an official Residency by Investment (Golden Visa) program in 2021. Under this scheme, any foreign buyer investing in properties inside approved real estate projects becomes eligible for legal residency permits.
            </p>
            <p>
              This visa extends to the main investor's spouse and dependent children under the age of 18, allowing families to relocate, work, and live in Zanzibar long-term.
            </p>
          </article>

          <article className="content-card">
            <h2>ZIPA Tax Incentives</h2>
            <p>
              Besides residency, Zanzibar boasts one of the most competitive tax regimes for property owners in Africa, designed to maximize your net return on investment.
            </p>

            <div className="incentives-box">
              <h3>Exclusive Tax Relief for Foreign Buyers:</h3>
              <ul>
                <li><strong>No Capital Gains Tax:</strong> Enjoy 0% capital gains tax on the sale of your property asset.</li>
                <li><strong>Reduced Income Tax:</strong> Benefit from a flat 15% income tax rate on rental revenues.</li>
                <li><strong>No Withholding Tax:</strong> Zero withholding tax on dividends and repatriation of funds.</li>
                <li><strong>Exemption on Duties:</strong> Zero import duties on construction materials for approved projects.</li>
              </ul>
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

export default ResidencyInvestment;
