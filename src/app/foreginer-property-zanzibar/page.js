import React from "react";
import MatchRequestStepper from "../../components/MatchRequestStepper";
import Abovefooter from "../../components/Abovefooter";
import SeoFaq from "../../components/SeoFaq";

export const metadata = {
  title: "Foreigner Property Purchase in Zanzibar | Legal Guidelines",
  description: "Comprehensive legal guidelines for foreigners buying property in Zanzibar. Learn about Condominium laws, 99-year leaseholds, purchase processes, and ZIPA residency permit eligibility.",
  keywords: "buying property in zanzibar as a foreigner, zanzibar foreign property ownership, condominium act zanzibar, zipa residency permit property, buy villa zanzibar foreign investor, zanzibar property leasehold, zanzibar real estate foreign buyers",
  alternates: {
    canonical: "https://www.zanzihome.com/foreginer-property-zanzibar",
  },
  openGraph: {
    url: "https://www.zanzihome.com/foreginer-property-zanzibar",
    title: "Foreigner Property Purchase in Zanzibar | Legal Guidelines",
    description: "Detailed legal framework, acquisition costs, taxes, and ZIPA residency permit roadmap for international buyers in Zanzibar.",
    type: "article",
    images: [
      {
        url: "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foreigner Property Purchase in Zanzibar | ZanziHome Guide",
    description: "Explore step-by-step guides on Condominium acts, residency permit incentives, and purchasing costs for foreigners buying real estate in Zanzibar.",
    images: ["https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg"],
  },
};

const faqs = [
  {
    q: "What is the minimum investment required for a residency permit in Zanzibar?",
    a: "Under the new ZIPA (Zanzibar Investment Promotion Authority) guidelines, foreigners who purchase property worth $100,000 or more in an approved condominium project are eligible for a residence permit. For commercial or large scale investments, the threshold may be higher."
  },
  {
    q: "What taxes do foreigners pay when buying property in Zanzibar?",
    a: "When purchasing property, foreign buyers typically pay a 3% stamp duty and a 5% transfer tax. If selling, capital gains or withholding tax may apply. We highly recommend conducting full due diligence with a local Zanzibar lawyer."
  },
  {
    q: "Can I buy land directly as a foreigner in Zanzibar?",
    a: "Direct land ownership (freehold) is reserved exclusively for Tanzanian citizens. Foreigners can legally acquire and secure land/properties through long-term, renewable government leases (up to 99 years) or by buying units in registered condominium developments."
  },
  {
    q: "How do I transfer funds to Zanzibar for a property purchase?",
    a: "Funds must be transferred via international wire transfer (SWIFT) directly to the seller's escrow or commercial bank account in Tanzania/Zanzibar. You will need to retain the transfer confirmation documents for ZIPA registration and title verification."
  },
  {
    q: "Can I rent out my property to tourists as a foreigner?",
    a: "Yes. Foreigners can legally lease their properties. However, if you rent to short-term tourists, you must obtain a license from the Zanzibar Commission for Tourism (ZCT) and ensure all local hospitality taxes are paid."
  }
];

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.zanzihome.com/foreginer-property-zanzibar#article",
      "isPartOf": {
        "@id": "https://www.zanzihome.com/foreginer-property-zanzibar#webpage"
      },
      "headline": "Foreigner Property Purchase in Zanzibar | Legal Guidelines & Residency",
      "description": "The ultimate guide for foreigners buying real estate in Zanzibar. Learn about Condominium laws, residency permits, ZIPA tax incentives, and the purchase process.",
      "image": "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg",
      "datePublished": "2026-01-15T09:00:00+03:00",
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
      "@id": "https://www.zanzihome.com/foreginer-property-zanzibar#faq",
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

export default function ForeignerPage() {
  return (
    <div className="seo-page-layout">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Header */}
      <section className="seo-hero">
        <h1 className="seo-hero-title">Zanzibar Property Guidelines for Foreigners</h1>
        <p className="seo-hero-subtitle">
          Your comprehensive step-by-step roadmap to legally, safely, and securely purchasing real estate in Zanzibar.
        </p>
      </section>

      {/* Main Content Container */}
      <div className="seo-container">
        <main className="seo-main-content">
          
          <article className="content-card">
            <h2>The Legal Framework for Foreign Buyers</h2>
            <p>
              Zanzibar is a semi-autonomous region of Tanzania with its own specific property laws. 
              Historically, foreign property ownership was highly restricted. However, the introduction of the 
              <strong> Zanzibar Condominium Property Act of 2010</strong> and new investment acts have created a highly secure 
              legal pathway for international buyers to own residential and commercial units.
            </p>
            <p>
              Under current legislation, foreigners can purchase, lease, rent, inherit, and sell properties. 
              These properties are registered directly in the buyer's name or through a local/foreign-owned corporate entity.
            </p>
          </article>

          <article className="content-card">
            <h2>Step-by-Step Purchase Process</h2>
            <p>
              Buying property in Zanzibar follows a structured process to ensure full legal transfer and compliance:
            </p>
            <ol className="law-list" style={{ paddingLeft: "20px", marginBottom: "20px" }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Property Selection & Reservation:</strong> 
                Once you select a villa, apartment, or plot, a reservation agreement is signed, and a booking fee is paid to hold the unit.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Legal Due Diligence:</strong> 
                Your appointed legal counsel verifies the developer's ownership, land registration, building permits, and environmental approvals.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Sale & Purchase Agreement (SPA):</strong> 
                The SPA is drafted and reviewed, detailing the payment milestones, completion dates, and specifications. Both parties sign this in the presence of a notary public.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Payment Milestones:</strong> 
                Payments are made according to construction progress or structural transfer milestones, usually via secure SWIFT bank transfers.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Title Deed Registration:</strong> 
                Upon final payment, the Ministry of Lands, Housing, and Water Development registers the unit leasehold deed directly in your name.
              </li>
            </ol>
          </article>

          <article className="content-card">
            <h2>ZIPA Benefits & Golden Visa Residency</h2>
            <p>
              The Revolutionary Government of Zanzibar encourages foreign real estate investment by offering substantial 
              tax incentives and residency benefits through the <strong>Zanzibar Investment Promotion Authority (ZIPA)</strong>:
            </p>
            <ul className="law-list">
              <li><strong>Residence Permit:</strong> Purchasing property with a value of at least $100,000 in approved projects grants the investor, spouse, and dependents residency rights.</li>
              <li><strong>Tax Exemption:</strong> 50% exemption on local income tax on rental yields from the property.</li>
              <li><strong>Repatriation of Capital:</strong> 100% foreign exchange repatriation is legally guaranteed, allowing you to move profits out of the country freely.</li>
              <li><strong>No Capital Gains Tax:</strong> Favorable capital tax exemptions for registered foreign property owners.</li>
            </ul>
          </article>

          <article className="content-card">
            <h2>Acquisition Costs, Taxes & Fees</h2>
            <p>
              When budgeting for your property purchase in Zanzibar, ensure you account for the following additional costs:
            </p>
            <table style={{ width: "100%", borderCollapse: "collapse", margin: "15px 0", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                  <th style={{ padding: "8px", fontWeight: "600" }}>Fee Type</th>
                  <th style={{ padding: "8px", fontWeight: "600" }}>Rate / Amount</th>
                  <th style={{ padding: "8px", fontWeight: "600" }}>Payer</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "8px" }}>Stamp Duty</td>
                  <td style={{ padding: "8px" }}>3% of Property Value</td>
                  <td style={{ padding: "8px" }}>Buyer</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "8px" }}>Transfer Tax</td>
                  <td style={{ padding: "8px" }}>5% of Property Value</td>
                  <td style={{ padding: "8px" }}>Buyer</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "8px" }}>Legal & Notary Fees</td>
                  <td style={{ padding: "8px" }}>1% – 2% of Property Value</td>
                  <td style={{ padding: "8px" }}>Buyer</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "8px" }}>ZIPA Registration Fee</td>
                  <td style={{ padding: "8px" }}>Varies by project type</td>
                  <td style={{ padding: "8px" }}>Developer / Buyer</td>
                </tr>
              </tbody>
            </table>
          </article>

          <SeoFaq faqs={faqs} />

        </main>
      </div>

      <div style={{ padding: "0 15px 40px 15px" }}>
        <MatchRequestStepper />
      </div>
      <Abovefooter />
    </div>
  );
}
