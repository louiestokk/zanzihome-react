import React from "react";
import MatchRequestStepper from "../../components/MatchRequestStepper";
import Abovefooter from "../../components/Abovefooter";
import SeoFaq from "../../components/SeoFaq";

export const metadata = {
  title: "Can Foreigners Buy Property in Zanzibar? Ownership Guide 2026",
  description: "Comprehensive guide on foreign property ownership in Zanzibar. Learn about 99-year leaseholds, condominium laws, and buying properties legally.",
  keywords: "can foreigners buy property in zanzibar, foreign ownership zanzibar real estate, zanzibar property leasehold, condominium law zanzibar",
  alternates: {
    canonical: "https://www.zanzihome.com/foreign-property-ownership-zanzibar",
  },
  openGraph: {
    url: "https://www.zanzihome.com/foreign-property-ownership-zanzibar",
    title: "Can Foreigners Buy Property in Zanzibar? Ownership Guide 2026",
    description: "Detailed legal framework, leasehold rules, and purchasing requirements for international real estate investors in Zanzibar.",
    type: "article",
    images: [
      {
        url: "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zanzibar Foreign Property Ownership Guide | ZanziHome",
    description: "Learn how foreigners buy property under the Zanzibar Condominium Act and secure long-term leasehold deeds.",
    images: ["https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg"],
  },
};

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
      "dateModified": "2026-08-13T16:00:00+03:00",
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

export default function ForeignOwnershipPage() {
  return (
    <div className="seo-page-layout">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

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

          <SeoFaq faqs={faqs} />
        </main>
      </div>
      
      <div style={{ padding: "0 15px" }}>
        <MatchRequestStepper />
      </div>
      <Abovefooter />
    </div>
  );
}
