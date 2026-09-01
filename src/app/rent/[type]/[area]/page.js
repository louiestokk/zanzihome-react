import React from "react";
import { notFound } from "next/navigation";
import SeoRentPages from "../../../../views/SeoRentPages";
import { generateSeoRentText, matchesSeoPropertyType, normalizePropertyType } from "../../../../utils/generateSeoText";
import { getProperties } from "../../../../lib/db";
import { areas, propertyTypes } from "../../../../utils/seoData";
import { getListingImage } from "../../../../utils/areaSeoContent";

function isValidSeoRoute(type, area) {
  const validType = propertyTypes.some((value) => normalizePropertyType(value) === normalizePropertyType(type));
  const validArea = areas.some((value) => value.toLowerCase().replace(/\s+/g, "-") === area.toLowerCase());
  return validType && validArea;
}

export async function generateMetadata({ params }) {
  const { type, area } = params;
  const formattedArea = area
    .replace("-", " ")
    .toLowerCase()
    .trim()
    .replace(/^./, (str) => str.toUpperCase());
  const formattedType = normalizePropertyType(type);
  
  const seo = generateSeoRentText(formattedType, formattedArea);
  const canonical = `https://www.zanzihome.com/rent/${type}/${area}`;
  const properties = await getProperties();
  const metadataImage = getListingImage(
    properties.filter((property) => (
      property &&
      property.paid &&
      !property.removed &&
      property.Rent === "Rent" &&
      matchesSeoPropertyType(property, formattedType) &&
      property.Area?.toLowerCase().replace(/[\s-]/g, "") === formattedArea.toLowerCase().replace(/[\s-]/g, "")
    )),
    area
  );

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: "ZanziHome",
      images: [
        {
          url: metadataImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [metadataImage],
    },
  };
}

export default async function RentPropertyTypeAreaPageRoute({ params }) {
  if (!isValidSeoRoute(params.type, params.area)) notFound();
  const properties = await getProperties();

  // Format parameters for schema generation
  const formattedArea = params.area
    .replace("-", " ")
    .toLowerCase()
    .trim()
    .replace(/^./, (str) => str.toUpperCase());
  const formattedType = normalizePropertyType(params.type);
  const seo = generateSeoRentText(formattedType, formattedArea);
  const canonical = `https://www.zanzihome.com/rent/${params.type}/${params.area}`;

  // Filter properties for this specific type and area (rent only)
  const filtered = properties.filter((obj) => {
    if (!obj || !obj.paid || obj.removed || obj.Rent !== "Rent") return false;
    const objArea = obj.Area?.toLowerCase().trim().replace(/^./, (char) => char.toUpperCase());
    const matchType = matchesSeoPropertyType(obj, formattedType);
    const matchArea = objArea === formattedArea || objArea?.includes(formattedArea);
    return matchType && matchArea;
  });

  // Generate JSON-LD Schema on server
  const mainSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "ZanziHome",
        "url": "https://www.zanzihome.com/",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.zanzihome.com/properties?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "name": "ZanziHome",
        "url": "https://www.zanzihome.com/",
        "logo": "https://www.zanzihome.com/logo.png"
      },
      {
        "@type": "RealEstateAgent",
        "name": "ZanziHome Real Estate",
        "url": canonical,
        "areaServed": {
          "@type": "Place",
          "name": "Zanzibar"
        },
        "description": seo.description
      },
      {
        "@type": "CollectionPage",
        "name": seo.title,
        "description": seo.description,
        "url": canonical,
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": filtered.length,
          "itemListElement": filtered.slice(0, 20).map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://www.zanzihome.com/propertys/property/${item.adId}/`,
            "name": item.Title || `${formattedType} for Rent in ${formattedArea}`
          }))
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.zanzihome.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": `Rent in Zanzibar`,
            "item": `https://www.zanzihome.com/properties-zanzibar?offer=Rent`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${formattedType} for Rent in ${formattedArea}`,
            "item": canonical
          }
        ]
      }
    ]
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How to rent a ${formattedType} in ${formattedArea}, Zanzibar?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `To rent a ${formattedType} in ${formattedArea}, browse the verified listings on ZanziHome, select your preferred property, and contact the listing agent directly. Long-term residential leases, corporate rentals, and short-term vacation rentals are all available.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the cost of renting a ${formattedType} in ${formattedArea}, Zanzibar?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Rental costs in ${formattedArea} depend on the location, size, and proximity to the beach. Long-term rentals typically range from $500 to $1,500+ per month, while short-term vacation villas command premium rates during high tourism seasons.`
        }
      },
      {
        "@type": "Question",
        "name": `Can foreigners rent houses or villas long term in ${formattedArea}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, foreigners can legally rent properties long-term in Zanzibar. Standard tenancy contracts are drafted in English, and leases can span from a few months to several years."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mainSchema) }}
        suppressHydrationWarning={true}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        suppressHydrationWarning={true}
      />
      <SeoRentPages
        area={params.area}
        properties={filtered}
        type={params.type}
      />
    </>
  );
}
