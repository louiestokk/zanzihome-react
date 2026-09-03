import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProperties } from "../../../lib/db";
import { villages } from "../../../utils/data";
import { getVillageSeoData, getSlug } from "../../../utils/villageSeoHelper";
import { getListingImage } from "../../../utils/areaSeoContent";
import VillagePropertiesList from "../../../components/VillagePropertiesList";
import SeoFaq from "../../../components/SeoFaq";
import MatchRequestStepper from "../../../components/MatchRequestStepper";
import Abovefooter from "../../../components/Abovefooter";

// Revalidate cache every 60 seconds to keep properties dynamic
export const revalidate = 60;

/**
 * Generate static paths for all pre-defined villages to optimize TTFB and indexability.
 */
export async function generateStaticParams() {
  return villages.map((v) => ({
    village: getSlug(v),
  }));
}

/**
 * Generate SEO Metadata dynamically based on the current village.
 */
export async function generateMetadata({ params }) {
  const { village } = params;
  const villageName = villages.find((v) => getSlug(v) === village) || village;
  const seoData = getVillageSeoData(villageName);

  if (!seoData) {
    return {
      title: "Real Estate Zanzibar",
    };
  }

  const canonicalUrl = `https://www.zanzihome.com/real-estate/${village}`;
  const properties = await getProperties();
  const normalize = (value) => value?.toLowerCase().replace(/[-\s]/g, "") || "";
  const matchingProperties = properties.filter((property) => (
    property &&
    property.paid &&
    !property.removed &&
    !["Vehicle", "Tours", "Taxi"].includes(property.adType) &&
    normalize(property.Area) === normalize(villageName)
  ));
  const metadataImage = getListingImage(matchingProperties, villageName);

  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    keywords: seoData.keywords,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      url: canonicalUrl,
      title: seoData.metaTitle,
      description: seoData.metaDescription,
      images: [
        {
          url: metadataImage,
          width: 1200,
          height: 630,
          alt: `Real Estate in ${seoData.displayName}, Zanzibar`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.metaTitle,
      description: seoData.metaDescription,
      images: [metadataImage],
    },
  };
}

export default async function VillageRealEstatePage({ params }) {
  const { village } = params;

  // Resolve slug back to proper name in villages registry
  const villageName = villages.find((v) => getSlug(v) === village) || null;

  if (!villageName) {
    notFound();
  }

  const seoData = getVillageSeoData(villageName);
  const otherVillages = villages.filter((v) => v !== villageName);
  const allProperties = await getProperties();

  // Filter listings matching the current village
  const normalize = (str) => str?.toLowerCase().replace(/[-\s]/g, "") || "";
  const targetNormalized = normalize(villageName);
  const matchingProperties = allProperties.filter((obj) => {
    const isProperty = !["Vehicle", "Tours", "Taxi"].includes(obj.adType);
    const isPaidAndActive = obj.paid && !obj.removed;
    return isProperty && isPaidAndActive && normalize(obj.Area) === targetNormalized;
  });

  // Calculate live average price statistics if listings exist
  const propertiesWithPrice = matchingProperties.filter((p) => p.Price && typeof p.Price === "number" && p.Price > 0);
  const averagePrice = propertiesWithPrice.length > 0
    ? Math.round(propertiesWithPrice.reduce((sum, p) => sum + p.Price, 0) / propertiesWithPrice.length)
    : null;

  // Build JSON-LD Structured Data Schema
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://www.zanzihome.com/real-estate/${village}#webpage`,
        "url": `https://www.zanzihome.com/real-estate/${village}`,
        "name": seoData.metaTitle,
        "description": seoData.metaDescription,
        "breadcrumb": {
          "@id": `https://www.zanzihome.com/real-estate/${village}#breadcrumb`
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.zanzihome.com/real-estate/${village}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.zanzihome.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Properties",
            "item": "https://www.zanzihome.com/properties-zanzibar"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": seoData.displayName,
            "item": `https://www.zanzihome.com/real-estate/${village}`
          }
        ]
      },
      {
        "@type": "RealEstateAgent",
        "@id": "https://www.zanzihome.com/#organization",
        "name": "ZanziHome",
        "url": "https://www.zanzihome.com/",
        "logo": "https://www.zanzihome.com/logo.png",
        "areaServed": [
          {
            "@type": "Place",
            "name": `${seoData.displayName}, Zanzibar`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `https://www.zanzihome.com/real-estate/${village}#faq`,
        "mainEntity": seoData.faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      }
    ]
  };

  // Add ItemList Schema if there are properties matching the village
  if (matchingProperties.length > 0) {
    schemaData["@graph"].push({
      "@type": "ItemList",
      "@id": `https://www.zanzihome.com/real-estate/${village}#itemlist`,
      "name": `Real Estate Listings in ${seoData.displayName}`,
      "numberOfItems": matchingProperties.length,
      "itemListElement": matchingProperties.slice(0, 20).map((prop, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": prop.Title || `${prop.category || "Property"} in ${seoData.displayName}`,
        "url": `https://www.zanzihome.com/propertys/property/${prop.adId}`
      }))
    });
  }

  // Related areas ItemList to reinforce internal linking/topical relevance
  schemaData["@graph"].push({
    "@type": "ItemList",
    "@id": `https://www.zanzihome.com/real-estate/${village}#related-areas`,
    "name": "Other Zanzibar Real Estate Areas",
    "itemListElement": otherVillages.map((v, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": `Real Estate in ${v}`,
      "url": `https://www.zanzihome.com/real-estate/${getSlug(v)}`
    }))
  });

  return (
    <main className="area-page">
      {/* Dynamic JSON-LD SEO Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Header */}
      <section className="area-hero">
        <div className="area-breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/properties-zanzibar">Properties</Link>
          <span>/</span>
          <span>{seoData.displayName}</span>
        </div>
        <h1 className="area-hero-title">{seoData.h1}</h1>
        <p className="area-hero-subtitle">
          Discover properties for sale and rent in {seoData.displayName}, Zanzibar. Find beachfront land plots, apartments, and vacation villas.
        </p>
      </section>

      {/* Dynamic SEO Article and Sidebar layout */}
      <section className="area-content-container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px", margin: "20px 0" }}>
          
          {/* Main Informative Column */}
          <article style={{ background: "#ffffff", padding: "30px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 4px 20px rgba(0,0,0,0.01)" }}>
            
            {/* Local Introduction */}
            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#013a17", marginBottom: "15px" }}>
              About {seoData.displayName}, Zanzibar
            </h2>
            <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "25px" }}>
              {seoData.introduction}
            </p>

            {/* Real Estate Market Conditions */}
            <h3 style={{ fontSize: "19px", fontWeight: "700", color: "#013a17", marginBottom: "12px" }}>
              Property Market Overview
            </h3>
            <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "25px" }}>
              {seoData.marketOverview}
              {averagePrice && (
                <span style={{ display: "block", marginTop: "10px", fontWeight: "600", color: "#22c55e" }}>
                  💡 Live Market Indicator: The average listing price for active properties in {seoData.displayName} is currently around ${averagePrice.toLocaleString()}.
                </span>
              )}
            </p>

            <h3 style={{ fontSize: "19px", fontWeight: "700", color: "#013a17", marginBottom: "12px" }}>
              Buying Property in {seoData.displayName}
            </h3>
            <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "25px" }}>
              {seoData.buyingGuide}
            </p>

            {/* Typical Prices Table (Pris exempel) */}
            <h3 style={{ fontSize: "19px", fontWeight: "700", color: "#013a17", marginBottom: "12px" }}>
              Property Prices & Investment Examples
            </h3>
            <div style={{ overflowX: "auto", marginBottom: "25px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f3f4f6", borderBottom: "2px solid #e5e7eb" }}>
                    <th style={{ padding: "12px", color: "#374151", fontWeight: "700" }}>Property Category</th>
                    <th style={{ padding: "12px", color: "#374151", fontWeight: "700" }}>Typical Price Range</th>
                    <th style={{ padding: "12px", color: "#374151", fontWeight: "700" }}>Market Status</th>
                  </tr>
                </thead>
                <tbody>
                  {seoData.priceTable.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "12px", fontWeight: "600", color: "#013a17" }}>{row.category}</td>
                      <td style={{ padding: "12px", color: "#059669", fontWeight: "600" }}>{row.priceRange}</td>
                      <td style={{ padding: "12px", color: "#6b7280" }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Ownership Guide */}
            <h3 style={{ fontSize: "19px", fontWeight: "700", color: "#013a17", marginBottom: "12px" }}>
              Zanzibar Property Ownership & Legal Info
            </h3>
            <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "25px" }}>
              All land in Zanzibar belongs to the government. Foreigners can easily buy property and acquire land through long-term leases (usually 33, 66, or 99 years) which are legally renewable. If you buy within a ZIPA-approved strategic development (e.g. condominium status), you can also qualify for residency benefits. We recommend conducting a full title deed search at the Land Registry before finalizing any transaction.
            </p>

            {/* Highlights List */}
            <h3 style={{ fontSize: "19px", fontWeight: "700", color: "#013a17", marginBottom: "12px" }}>
              Key Highlights of {seoData.displayName}
            </h3>
            <ul style={{ paddingLeft: "20px", marginBottom: "10px", lineHeight: "1.8", color: "#374151" }}>
              {seoData.localHighlights.map((hl, idx) => (
                <li key={idx} style={{ marginBottom: "8px", fontSize: "14px" }}>
                  <strong>{hl}</strong>
                </li>
              ))}
            </ul>

          </article>
        </div>

        {/* Live Properties Listings Section */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#013a17", marginTop: "40px", marginBottom: "10px" }}>
          Available Listings in {seoData.displayName}
        </h2>
        <p style={{ fontSize: "15px", color: "#6b7280", marginBottom: "20px" }}>
          Browse verified villas, apartments, residential lands, and commercial plots currently available in {seoData.displayName}.
        </p>

        <VillagePropertiesList initialProperties={allProperties} villageName={villageName} />

        {/* Localized FAQ Accordion */}
        <div style={{ marginTop: "50px", background: "#ffffff", padding: "30px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)" }}>
          <SeoFaq faqs={seoData.faqs.map((f) => ({ q: f.q, a: f.a }))} />
        </div>

        {/* Internal linking to all other Zanzibar areas for SEO discovery */}
        <div style={{ marginTop: "40px", background: "#ffffff", padding: "30px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#013a17", marginBottom: "15px" }}>
            Explore Real Estate in Other Zanzibar Areas
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {otherVillages.map((v) => (
              <Link
                key={v}
                href={`/real-estate/${getSlug(v)}`}
                style={{
                  fontSize: "13px",
                  color: "#013a17",
                  background: "#f3f4f6",
                  padding: "8px 14px",
                  borderRadius: "20px",
                  textDecoration: "none",
                }}
              >
                Real Estate in {v}
              </Link>
            ))}
          </div>
        </div>

      </section>

      {/* Match Request Stepper and Abovefooter */}
      <div style={{ maxWidth: "1200px", margin: "40px auto 0 auto", padding: "0 16px" }}>
        <MatchRequestStepper />
      </div>

      <Abovefooter />
    </main>
  );
}
