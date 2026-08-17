import React from "react";
import MatchRequestStepper from "../../components/MatchRequestStepper";
import Abovefooter from "../../components/Abovefooter";
import SeoFaq from "../../components/SeoFaq";

export const metadata = {
  title: "Zanzibar Residency by Investment | Golden Visa & Tax Breaks",
  description: "Discover the Zanzibar residency-by-investment program. Learn how to secure permanent residency, golden visas, and tax incentives through real estate.",
  keywords: "zanzibar residency by investment, zanzibar golden visa, tax incentives zanzibar, fumba town residency",
  alternates: {
    canonical: "https://www.zanzihome.com/residency-by-investment-zanzibar",
  },
  openGraph: {
    url: "https://www.zanzihome.com/residency-by-investment-zanzibar",
    title: "Zanzibar Residency by Investment | Golden Visa & Tax Breaks",
    description: "Learn the rules, processes, and investment limits for acquiring a residency visa through Zanzibar property purchases.",
    type: "article",
    images: [
      {
        url: "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zanzibar Property Residency Permit Guide | ZanziHome",
    description: "Unlock long-term residency and tax exemptions for you and your family by buying real estate in Zanzibar.",
    images: ["https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg"],
  },
};

const faqs = [
  {
    q: "How does the residency-by-investment scheme work in Zanzibar?",
    a: "Foreigners who purchase a residential unit (apartment, villa, or condo) valued at $100,000 or more in approved strategic projects are eligible to apply for a resident permit. This permit allows the buyer and their family to reside in Zanzibar legally."
  },
  {
    q: "Are my spouse and children covered by the permit?",
    a: "Yes. The residence permit applies to the primary investor, their spouse, and up to four dependent children under the age of 18."
  },
  {
    q: "What tax benefits do I get as a resident investor?",
    a: "Zanzibar offers highly favorable tax breaks, including 0% capital gains tax on property sales, a flat 15% income tax rate on rental yields, and zero withholding tax on fund repatriation."
  }
];

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.zanzihome.com/residency-by-investment-zanzibar#article",
      "isPartOf": {
        "@id": "https://www.zanzihome.com/residency-by-investment-zanzibar#webpage"
      },
      "headline": "Zanzibar Residency by Investment | Golden Visa & Tax Breaks",
      "description": "Learn how to obtain Zanzibar residency through property investment, including tax breaks and strategic condominium projects.",
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

export default function ResidencyInvestmentPage() {
  return (
    <div className="seo-page-layout">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

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
              <ul style={{ paddingLeft: "20px" }}>
                <li style={{ marginBottom: "10px" }}><strong>No Capital Gains Tax:</strong> Enjoy 0% capital gains tax on the sale of your property asset.</li>
                <li style={{ marginBottom: "10px" }}><strong>Reduced Income Tax:</strong> Benefit from a flat 15% income tax rate on rental revenues.</li>
                <li style={{ marginBottom: "10px" }}><strong>No Withholding Tax:</strong> Zero withholding tax on dividends and repatriation of funds.</li>
                <li style={{ marginBottom: "10px" }}><strong>Exemption on Duties:</strong> Zero import duties on construction materials for approved projects.</li>
              </ul>
            </div>
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
