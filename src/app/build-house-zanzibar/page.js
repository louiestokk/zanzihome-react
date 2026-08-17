import React from "react";
import MatchRequestStepper from "../../components/MatchRequestStepper";
import Abovefooter from "../../components/Abovefooter";
import SeoFaq from "../../components/SeoFaq";

export const metadata = {
  title: "Building a House in Zanzibar | Construction Guide & Costs 2026",
  description: "Planning to build a home in Zanzibar? Discover the construction costs, lease regulations, building permissions, and step-by-step guidelines for foreigners.",
  keywords: "build a house in zanzibar, construction cost zanzibar, build villa zanzibar, building permit zanzibar, zanzibar real estate developer",
  alternates: {
    canonical: "https://www.zanzihome.com/build-house-zanzibar",
  },
  openGraph: {
    url: "https://www.zanzihome.com/build-house-zanzibar",
    title: "Building a House in Zanzibar | Construction Guide & Costs 2026",
    description: "Learn about the cost, construction guidelines, and regulations for building a home in Zanzibar.",
    type: "article",
    images: [
      {
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&h=630",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zanzibar House Construction Guide | ZanziHome",
    description: "Discover the costs, permissions, and architectural steps to build a house in Zanzibar.",
    images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&h=630"],
  },
};

const faqs = [
  {
    q: "Can a foreigner build a house in Zanzibar?",
    a: "Yes. Foreigners cannot own land outright (all land is government-owned), but you can legally acquire a long-term leasehold agreement, typically for 33, 66, or 99 years, and own any building constructed on that land."
  },
  {
    q: "How much does it cost to build a house in Zanzibar?",
    a: "Construction costs vary by quality and location. A basic structural shell costs $300 - $500 per sqm. A standard mid-range finish costs $600 - $900 per sqm, while premium luxury or beachfront villas cost between $1,000 and $1,500+ per sqm."
  },
  {
    q: "What is the 60-meter rule in Zanzibar?",
    a: "Under the Zanzibar Environmental Management Act (ZEMA), permanent structures are prohibited within 60 meters of the ocean's high-water mark to preserve the coastline and marine ecosystems."
  },
  {
    q: "How long does it take to get a building permit in Zanzibar?",
    a: "Getting a building permit (Kibali cha Ujenzi) usually takes between 1 and 3 months, assuming your architectural plans and environmental approvals (ZEMA) are in order."
  },
  {
    q: "Do I need a borehole for water when building?",
    a: "In coastal or rural Zanzibar, municipal water supply can be inconsistent. Most developers and homeowners drill a private borehole, install storage tanks, and implement filtration systems for a secure water supply."
  }
];

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.zanzihome.com/build-house-zanzibar#article",
      "isPartOf": {
        "@id": "https://www.zanzihome.com/build-house-zanzibar#webpage"
      },
      "headline": "Building a House in Zanzibar | Construction Guide & Costs 2026",
      "description": "Discover where to buy real estate in Zanzibar. Compare beach properties, cities, and condominium developments.",
      "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&h=630",
      "datePublished": "2026-01-01T08:00:00+03:00",
      "dateModified": "2026-08-13T20:00:00+03:00",
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
      "@id": "https://www.zanzihome.com/build-house-zanzibar#faq",
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

export default function BuildHousePage() {
  return (
    <div className="seo-page-layout">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <section className="seo-hero">
        <h1 className="seo-hero-title">Building a House in Zanzibar</h1>
        <p className="seo-hero-subtitle">
          Your complete 2026 guide to construction costs, legal requirements, building permits, and tropical architecture.
        </p>
      </section>

      <div className="seo-container">
        <main className="seo-main-content">
          <article className="content-card">
            <h2>The Dream of Building in Zanzibar</h2>
            <p>
              Building your own custom villa in Zanzibar is an incredibly rewarding alternative to buying a pre-existing property. It allows you to design a tropical home custom-tailored to your lifestyle, maximize passive cooling, and often build at a lower cost basis than purchasing an established luxury property.
            </p>
            <p>
              However, building in a tropical island environment comes with unique challenges. From logistics and import custom duties to environmental rules and local land leasehold regulations, understanding the process is key to a successful project.
            </p>
          </article>

          <article className="content-card">
            <h2>Estimated Construction Costs (2026)</h2>
            <p>
              Construction costs in Zanzibar vary widely depending on the choice of building materials, finishing standards, and location (beachfront vs. inland). Below is an overview of average construction costs per square meter (sqm):
            </p>
            
            <div className="benefit-grid">
              <div className="benefit-box" style={{ marginBottom: "15px" }}>
                <h3>Basic Shell Build</h3>
                <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#16a34a", margin: "5px 0" }}>$300 - $500 / sqm</p>
                <p>Includes structural foundations, columns, brickwork, and basic concrete slab roof. No finishes or utility fittings.</p>
              </div>
              <div className="benefit-box" style={{ marginBottom: "15px" }}>
                <h3>Standard Finished Villa</h3>
                <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#16a34a", margin: "5px 0" }}>$600 - $900 / sqm</p>
                <p>Includes complete plastering, standard tiling, bathrooms, kitchen, water/electric wiring, doors, and windows.</p>
              </div>
              <div className="benefit-box" style={{ marginBottom: "15px" }}>
                <h3>Premium / Beachfront Luxury</h3>
                <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#16a34a", margin: "5px 0" }}>$1,000 - $1,500+ / sqm</p>
                <p>Includes high-end imported fittings, bespoke local hardwood doors, smart systems, swimming pool, and structural marine-grade reinforcement.</p>
              </div>
            </div>
            <p style={{ fontStyle: "italic", fontSize: "0.85rem", marginTop: "10px", color: "#6b7280" }}>
              Note: Beachfront projects usually face higher logistics costs for transporting materials like cement and aggregate, and require rust-resistant marine-grade concrete reinforcements.
            </p>
          </article>

          <article className="content-card">
            <h2>Legal Framework & Land Leaseholds</h2>
            <p>
              Under Tanzanian and Zanzibari law, all land is owned by the government. Foreigners cannot own land freehold, but they can own the physical structure and have full legal usage of the land through a registered **Leasehold Agreement**.
            </p>
            <ul>
              <li><strong>Lease Duration:</strong> Usually registered for 33, 66, or 99 years, with options to renew.</li>
              <li><strong>Verification:</strong> Before purchasing a lease, always verify the land's title deeds (Hati) at the Ministry of Lands, checking for boundaries, ownership disputes, and unpaid land taxes.</li>
              <li><strong>Investment Perks (ZIPA):</strong> If your construction is an investment project (such as building rental villas, commercial real estate, or a hotel), registering your project through the <strong>Zanzibar Investment Promotion Authority (ZIPA)</strong> unlocks duty-free material imports, tax holidays, and corporate tax benefits.</li>
            </ul>
          </article>

          <article className="content-card">
            <h2>Required Building Permissions & Permits</h2>
            <p>
              To ensure your building project is legal and structurally sound, you must secure the following permissions before breaking ground:
            </p>
            <ol>
              <li><strong>Building Permit (Kibali cha Ujenzi):</strong> Issued by the local municipal or district council after reviewing architectural, structural, electrical, and plumbing blueprints.</li>
              <li><strong>Environmental Clearance (ZEMA):</strong> The Zanzibar Environmental Management Authority must inspect the site. For beachfront builds, the strict <strong>60-meter high-water line rule</strong> must be respected.</li>
              <li><strong>CRB Contractor Registration:</strong> Your main contractor must be licensed with the Zanzibar Contractors Registration Board (CRB) to carry out construction activities.</li>
            </ol>
          </article>

          <article className="content-card">
            <h2>Tropical Architectural Design Tips</h2>
            <p>
              Designing for Zanzibar's warm and humid maritime climate requires smart architectural solutions. Building a sustainable home that minimizes energy costs is both eco-friendly and cost-effective:
            </p>
            <ul>
              <li><strong>Passive Cooling:</strong> Design high ceilings, large windows, and open-plan living areas aligned with the prevailing trade winds (Kusi and Kaskazi) to maximize cross-ventilation.</li>
              <li><strong>Outdoor Living:</strong> Plan for large verandas, patios, and outdoor pavilions to extend your living space while shielding from the tropical sun and seasonal rains.</li>
              <li><strong>Local Materials:</strong> Incorporate local materials like natural coral stone, terrazzo, mvule hardwood, and traditional makuti (palm leaves thatch) or high-quality clay roof tiles which stay cooler than metal sheets.</li>
            </ul>
          </article>

          <SeoFaq faqs={faqs} />
          <MatchRequestStepper />
        </main>
      </div>

      <Abovefooter />
    </div>
  );
}
