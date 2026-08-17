import React from "react";
import MatchRequestStepper from "../../components/MatchRequestStepper";
import Abovefooter from "../../components/Abovefooter";
import SeoFaq from "../../components/SeoFaq";

export const metadata = {
  title: "Invest in Zanzibar Real Estate | Zanzibar Investment Guide 2026",
  description: "Learn why investing in Zanzibar real estate offers high ROI, capital appreciation, and tax benefits. Read our comprehensive Zanzibar investment guide.",
  keywords: "invest in zanzibar, zanzibar real estate investment, buy property zanzibar, zanzibar property market, zanzibar ROI",
  alternates: {
    canonical: "https://www.zanzihome.com/invest-in-zanzibar",
  },
  openGraph: {
    url: "https://www.zanzihome.com/invest-in-zanzibar",
    title: "Invest in Zanzibar Real Estate | Zanzibar Investment Guide 2026",
    description: "Understand the financial benefits, capital growth rates, and investment framework of the Zanzibar property market.",
    type: "article",
    images: [
      {
        url: "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zanzibar Real Estate Investment Guide | ZanziHome",
    description: "Get detailed information about Zanzibar's tourism boom, high rental yields, and investment opportunities.",
    images: ["https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg"],
  },
};

const faqs = [
  {
    q: "Why should I invest in Zanzibar real estate?",
    a: "Zanzibar offers high rental yields (between 10% and 18% ROI annually), strong capital appreciation (averaging 12-15% year-on-year), and excellent government-sponsored tax incentives for registered projects."
  },
  {
    q: "Is property ownership safe for foreign investors in Zanzibar?",
    a: "Yes. Foreign property purchases are fully protected and secured under the Zanzibar Condominium Property Act of 2010. The Ministry of Lands registers your leasehold title deed directly in your name."
  },
  {
    q: "What types of properties are available for investment?",
    a: "Investors can choose from beachfront luxury villas, modern condominium apartments in master-planned cities like Fumba, and commercial plots of land suited for hotels or eco-resorts."
  }
];

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.zanzihome.com/invest-in-zanzibar#article",
      "isPartOf": {
        "@id": "https://www.zanzihome.com/invest-in-zanzibar#webpage"
      },
      "headline": "Invest in Zanzibar Real Estate | Zanzibar Investment Guide 2026",
      "description": "Unlock high yields, capital appreciation, and premium residency incentives by investing in Zanzibar's thriving property market.",
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

export default function InvestZanzibarPage() {
  return (
    <div className="seo-page-layout">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

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
              <div className="benefit-box" style={{ marginBottom: "15px" }}>
                <h3>High Rental Yields</h3>
                <p>Properties in popular beach areas like Paje and Nungwi average between 10% and 18% rental ROI annually.</p>
              </div>
              <div className="benefit-box" style={{ marginBottom: "15px" }}>
                <h3>Capital Growth</h3>
                <p>Zanzibar property values have grown by an average of 12-15% year-on-year over the past five years.</p>
              </div>
              <div className="benefit-box" style={{ marginBottom: "15px" }}>
                <h3>Government Incentives</h3>
                <p>Tax relief, zero capital gains tax, and residency perks are available through ZIPA registration.</p>
              </div>
              <div className="benefit-box" style={{ marginBottom: "15px" }}>
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

          <SeoFaq faqs={faqs} />
          <MatchRequestStepper />
        </main>
      </div>

      <Abovefooter />
    </div>
  );
}
