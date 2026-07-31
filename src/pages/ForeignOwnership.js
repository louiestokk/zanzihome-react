import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import MatchRequestStepper from "../components/MatchRequestStepper";
import Abovefooter from "../components/Abovefooter";

const ForeignOwnership = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Can foreigners legally buy and own property in Zanzibar?",
      a: "Yes. Foreigners can legally buy, own, rent, and sell properties in Zanzibar under the Zanzibar Condominium Act of 2010. Ownership is structured via long-term, renewable leaseholds (typically 99 years) which are fully secured."
    },
    {
      q: "What is the difference between freehold and leasehold in Zanzibar?",
      a: "All land in Zanzibar belongs to the government. Freehold land is reserved solely for Tanzanian citizens. Foreigners obtain security of ownership through leasehold agreements, which function similarly to leaseholds in London or Dubai."
    },
    {
      q: "Do I need a local partner to buy property in Zanzibar?",
      a: "No. Foreign investors can buy and own properties 100% in their own name or through a foreign-owned company. No local partner is required."
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
        "@id": "https://www.zanzihome.com/foreign-property-ownership-zanzibar#article",
        "isPartOf": {
          "@id": "https://www.zanzihome.com/foreign-property-ownership-zanzibar#webpage"
        },
        "headline": "Can Foreigners Buy Property in Zanzibar? Ownership Laws & Guides",
        "description": "Learn the legal rules for foreign property ownership in Zanzibar. Discover the Zanzibar Condominium Act, leasehold terms, and buying processes.",
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
        "@id": "https://www.zanzihome.com/foreign-property-ownership-zanzibar#faq",
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
        <title>Can Foreigners Buy Property in Zanzibar? Ownership Guide 2026</title>
        <meta
          name="description"
          content="Comprehensive guide on foreign property ownership in Zanzibar. Learn about 99-year leaseholds, condominium laws, and buying properties legally."
        />
        <meta
          name="keywords"
          content="can foreigners buy property in zanzibar, foreign ownership zanzibar real estate, zanzibar property leasehold, condominium law zanzibar"
        />
        <link rel="canonical" href="https://www.zanzihome.com/foreign-property-ownership-zanzibar" />
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

        .law-list {
          margin: 20px 0;
          padding-left: 20px;
        }

        .law-list li {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.8;
          margin-bottom: 8px;
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
        <h1 className="seo-hero-title">Foreign Property Ownership in Zanzibar</h1>
        <p className="seo-hero-subtitle">
          An essential legal guide for international investors looking to securely buy and own real estate in Zanzibar.
        </p>
      </section>

      <div className="seo-container">
        <main className="seo-main-content">
          <article className="content-card">
            <h2>Understanding the Condominium Act</h2>
            <p>
              In 2010, the Revolutionary Government of Zanzibar enacted the Condominium Property Act. This landmark legislation officially opened the Zanzibar property market to global investors, allowing foreigners to legally acquire units (villas, apartments, and commercial spaces) in designated developments.
            </p>
            <p>
              Under this law, foreigners enjoy secure ownership rights, which are registered with the government. This means you have the absolute legal right to live in, rent out, inherit, or sell your property.
            </p>
          </article>

          <article className="content-card">
            <h2>Key Facts about Leasehold Structure</h2>
            <p>
              All land in Tanzania, including Zanzibar, is constitutionally owned by the government. Here is how foreign ownership works in practice:
            </p>
            
            <ul className="law-list">
              <li><strong>Leasehold Duration:</strong> Foreign buyers receive a leasehold title deed, usually for 99 years, which is fully renewable.</li>
              <li><strong>Secure Registration:</strong> The leasehold title deed is registered at the Ministry of Lands, protecting your assets legally.</li>
              <li><strong>Inheritance Rights:</strong> Your property leasehold can be fully inherited by heirs or sold to other foreign/local buyers without restrictions.</li>
              <li><strong>100% Ownership:</strong> No local sponsorship or partner is required. The deed is registered 100% in your name or your company's name.</li>
            </ul>
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

export default ForeignOwnership;
