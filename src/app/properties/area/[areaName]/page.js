import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AreaPropertiesPage from "../../../../views/AreaPropertiesPage";
import CoccolagoonFeaturedSection from "../../../../components/CoccolagoonFeaturedSection";
import MatchRequestStepper from "../../../../components/MatchRequestStepper";
import PartnerFeaturedSection from "../../../../components/PartnerFeaturedSection";
import { getProperties } from "../../../../lib/db";
import { areas } from "../../../../utils/seoData";

function formatAreaName(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getAreaSlug(area) {
  return area.toLowerCase().replace(/\s+/g, "-");
}

export async function generateMetadata({ params }) {
  const { areaName } = params;
  const formattedAreaName = formatAreaName(areaName);

  const title = `Properties for Sale & Rent in ${formattedAreaName}, Zanzibar | ZanziHome`;
  const description = `Browse beachfront villas, land plots, apartments and holiday homes in ${formattedAreaName}, Zanzibar. Find your next property or investment today.`;
  const canonical = `https://www.zanzihome.com/properties/area/${areaName}`;

  return {
    title,
    description,
    keywords: `${formattedAreaName} property for sale, ${formattedAreaName} apartments, ${formattedAreaName} houses, ${formattedAreaName} real estate, zanzibar property listings`,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    alternates: {
      canonical,
    },
    openGraph: {
      url: canonical,
      title: `Real Estate in ${formattedAreaName}, Zanzibar | ZanziHome`,
      description: `Explore property listings in ${formattedAreaName}. Filter by houses, plots, apartments for sale or rent.`,
      siteName: "ZanziHome",
      images: [
        {
          url: "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg",
        },
      ],
    },
  };
}

export default async function AreaPropertiesPageRoute({ params }) {
  const validArea = areas.some((value) => value.toLowerCase().replace(/\s+/g, "-") === params.areaName.toLowerCase());
  if (!validArea) notFound();

  const properties = await getProperties();
  const formattedAreaName = formatAreaName(params.areaName);
  const canonical = `https://www.zanzihome.com/properties/area/${params.areaName}`;
  const normalize = (value) => value?.toLowerCase().replace(/[-\s]/g, "") || "";
  const activeProperties = properties.filter((property) => (
    property &&
    property.paid &&
    !property.removed &&
    !["Vehicle", "Tours", "Taxi"].includes(property.adType) &&
    normalize(property.Area) === normalize(formattedAreaName)
  ));
  const otherAreas = areas.filter((area) => getAreaSlug(area) !== params.areaName.toLowerCase());
  const faqs = [
    {
      question: `What properties are available in ${formattedAreaName}, Zanzibar?`,
      answer: `ZanziHome lists villas, houses, apartments, land plots and holiday homes in ${formattedAreaName}. Use the filters above to see current properties for sale and long-term or holiday rental options.`,
    },
    {
      question: `Is ${formattedAreaName} a good area to buy property in Zanzibar?`,
      answer: `${formattedAreaName} offers buyers a choice of lifestyle and investment properties in Zanzibar. Compare active listings, access to beaches and local services, then speak with the listing owner or agent about tenure, utilities and the property's exact location.`,
    },
    {
      question: `Can foreign buyers invest in property in ${formattedAreaName}?`,
      answer: `Foreign buyers commonly invest in Zanzibar through leasehold structures. Before committing to a property in ${formattedAreaName}, obtain independent legal advice and confirm the lease, title, approvals and any applicable ZIPA requirements.`,
    },
  ];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#webpage`,
        "url": canonical,
        "name": `Properties for Sale and Rent in ${formattedAreaName}, Zanzibar`,
        "description": `Browse current property listings in ${formattedAreaName}, Zanzibar, including villas, houses, apartments and land.`,
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": activeProperties.length,
          "itemListElement": activeProperties.slice(0, 20).map((property, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": property.Title || `${property.category || "Property"} in ${formattedAreaName}`,
            "url": `https://www.zanzihome.com/propertys/property/${property.adId}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.zanzihome.com/" },
          { "@type": "ListItem", "position": 2, "name": "Properties in Zanzibar", "item": "https://www.zanzihome.com/properties-zanzibar" },
          { "@type": "ListItem", "position": 3, "name": formattedAreaName, "item": canonical },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="area-page">
        <section className="area-hero">
          <div className="area-breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/properties-zanzibar">Properties</Link>
            <span>/</span>
            <span>{formattedAreaName}</span>
          </div>
          <h1 className="area-hero-title">Properties for sale and rent in {formattedAreaName}</h1>
          <p className="area-hero-subtitle">
            Explore rental listings, plots, villas and premium real estate investment opportunities in {formattedAreaName}, Zanzibar.
          </p>
        </section>
        <AreaPropertiesPage areaName={params.areaName} initialProperties={activeProperties} />
        <div style={{ marginBottom: "40px" }}>
        <section className="area-seo-content" aria-labelledby="area-guide-title">
          <div className="area-seo-grid">
            <article className="area-seo-article">
              <p className="area-seo-eyebrow">Area guide</p>
              <h2 id="area-guide-title">Property in {formattedAreaName}, Zanzibar</h2>
          <p>
            Explore property for sale and rent in {formattedAreaName}, Zanzibar. This page brings together current villas, houses, apartments, beachfront opportunities and land plots, so you can compare locations and contact advertisers directly.
          </p>
          <p>
            Whether you are searching for a holiday home, a long-term rental or a Zanzibar real estate investment, review the listing details carefully. Ask about the exact location, road access, utilities, tenure and relevant approvals before making a decision.
          </p>

              <div className="area-seo-divider" />
              <h2>Buy, rent and invest in {formattedAreaName}</h2>
              <p>Start with the property type that best matches your plans.</p>
              <div className="area-seo-link-grid">
                <Link href={`/buy/villa/${params.areaName}`} className="area-seo-action-link">Villas for sale</Link>
                <Link href={`/buy/land/${params.areaName}`} className="area-seo-action-link">Land for sale</Link>
                <Link href={`/rent/apartment/${params.areaName}`} className="area-seo-action-link">Apartments for rent</Link>
              </div>

              <div className="area-seo-divider" />
              <h2>Questions about property in {formattedAreaName}?</h2>
              <div className="area-seo-faqs">
                {faqs.map((faq) => (
                  <div key={faq.question} className="area-seo-faq">
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </article>

            <nav className="area-seo-area-nav" aria-label="Other Zanzibar property areas">
              <p className="area-seo-eyebrow">Browse by location</p>
              <h2>Other areas in Zanzibar</h2>
              <p>Compare listings across Zanzibar's most searched locations.</p>
              <ul className="area-seo-area-list">
                {otherAreas.map((area) => (
                  <li key={area}>
                    <Link href={`/properties/area/${getAreaSlug(area)}`}>Property in {area}</Link>
                  </li>
                ))}
              </ul>
              <Link href="/properties-zanzibar" className="area-seo-all-link">View all Zanzibar properties</Link>
            </nav>
          </div>
        </section>
        </div>
        {formattedAreaName === "Pemba" && (
          <div>
            <h2 style={{ padding: "1rem", color: "#013a17" }}>Pemba Property Investments</h2>
            <CoccolagoonFeaturedSection />
          </div>
        )}
        <PartnerFeaturedSection />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px 40px 15px" }}>
          <MatchRequestStepper />
        </div>
      </main>
    </>
  );
}
