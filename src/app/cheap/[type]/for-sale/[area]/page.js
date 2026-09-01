import React from "react";
import { notFound } from "next/navigation";
import SeoCheapPages from "../../../../../views/SeoCheapPages";
import { getProperties } from "../../../../../lib/db";
import { matchesSeoPropertyType, normalizePropertyType } from "../../../../../utils/generateSeoText";
import { areas, propertyTypes } from "../../../../../utils/seoData";
import { getAreaSeoProfile, getListingImage } from "../../../../../utils/areaSeoContent";

function isValidCheapRoute(type, area) {
  const validType = propertyTypes.some((value) => normalizePropertyType(value) === normalizePropertyType(type));
  const validArea = areas.some((value) => value.toLowerCase().replace(/\s+/g, "-") === area.toLowerCase());
  return validType && validArea;
}

export async function generateMetadata({ params }) {
  const { type, area } = params;
  
  const formattedArea = area
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const normalizedType = normalizePropertyType(type);
  const displayType = normalizedType === "hand" ? "land" : normalizedType;
  const formattedType = displayType.charAt(0).toUpperCase() + displayType.slice(1).toLowerCase();

  const title = `Cheap ${formattedType} for Sale in ${formattedArea}, Zanzibar | By Owner`;
  const areaProfile = getAreaSeoProfile(area);
  const description = `Browse affordable ${displayType} for sale in ${formattedArea}, Zanzibar. ${areaProfile.overview}`;
  const canonical = `https://www.zanzihome.com/cheap/${type}/for-sale/${area}`;
  const properties = await getProperties();
  const metadataImage = getListingImage(
    properties.filter((property) => (
      property &&
      property.paid &&
      !property.removed &&
      property.Rent !== "Rent" &&
      matchesSeoPropertyType(property, normalizedType) &&
      property.Area?.toLowerCase().replace(/[\s-]/g, "") === formattedArea.toLowerCase().replace(/[\s-]/g, "")
    )),
    area
  );

  return {
    title,
    description,
    keywords: `${formattedType.toLowerCase()} for sale in ${formattedArea}, cheap ${formattedType.toLowerCase()} in ${formattedArea}, ${formattedArea} property deals, buy ${formattedType.toLowerCase()} in zanzibar`,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      title,
      description,
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
      title,
      description,
      images: [metadataImage],
    },
  };
}

export default async function CheapPropertyTypeAreaPageRoute({ params }) {
  if (!isValidCheapRoute(params.type, params.area)) notFound();
  const properties = await getProperties();

  // Format parameters
  const formattedArea = params.area
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  const normalizedType = normalizePropertyType(params.type);
  const displayType = normalizedType === "hand" ? "land" : normalizedType;
  const canonical = `https://www.zanzihome.com/cheap/${params.type}/for-sale/${params.area}`;

  // Filter cheap properties (sale only, lower price range)
  const sortedProperties = properties
    .filter((obj) => {
      if (!obj || !obj.paid || obj.removed || obj.Rent === "Rent") return false;
      const objArea = obj.Area?.toLowerCase().trim().replace(/^./, (char) => char.toUpperCase());
      const matchType = matchesSeoPropertyType(obj, normalizedType);
      const matchArea = objArea === formattedArea || objArea?.includes(formattedArea);
      return matchType && matchArea;
    })
    .sort((a, b) => (a.Price || 0) - (b.Price || 0)); // Sort by price ascending

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
        "@type": "CollectionPage",
        "name": `Cheap ${displayType.charAt(0).toUpperCase() + displayType.slice(1)} for Sale in ${formattedArea}, Zanzibar | Budget Listings`,
        "description": `Browse affordable ${displayType} for sale in ${formattedArea}, Zanzibar. Filter cheap villas, homes, and land plots starting from low prices directly by owner.`,
        "url": canonical,
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": sortedProperties.length,
          "itemListElement": sortedProperties.slice(0, 15).map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://www.zanzihome.com/propertys/property/${item.adId}/`,
            "name": item.Title || `${displayType.charAt(0).toUpperCase() + displayType.slice(1)} in ${formattedArea}`
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
            "name": "Cheap Properties",
            "item": `https://www.zanzihome.com/properties-zanzibar`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `Cheap ${displayType.charAt(0).toUpperCase() + displayType.slice(1)} in ${formattedArea}`,
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
        "name": `How can I find cheap ${displayType} for sale in ${formattedArea}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Browse ZanziHome's listings filtered by price in ${formattedArea}. We display ${displayType} from both individual owners and real estate agents. Use our price filters to find affordable options.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the cheapest ${displayType} price in ${formattedArea}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Land plots in ${formattedArea} can start as low as $15,000 depending on location and size. Beachfront properties command higher prices, while inland properties are typically more affordable.`
        }
      },
      {
        "@type": "Question",
        "name": `Are cheap properties in ${formattedArea} good investments?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes. Affordable land in ${formattedArea} has significant capital appreciation potential. Many investors purchase cheap plots and develop them or resell at higher prices as the area develops.`
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
      <SeoCheapPages
        area={params.area}
        properties={sortedProperties}
        type={params.type}
      />
    </>
  );
}
