import React from "react";
import { notFound } from "next/navigation";
import SeoPages from "../../../../views/SeoPages";
import { generateSeoText, normalizePropertyType } from "../../../../utils/generateSeoText";
import { getProperties } from "../../../../lib/db";
import { areas, propertyTypes } from "../../../../utils/seoData";

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
  
  const seo = generateSeoText(formattedType, formattedArea);
  const canonical = `https://www.zanzihome.com/buy/${type}/${area}`;

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
          url: "https://images.pexels.com/photos/2724078/pexels-photo-2724078.jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["https://images.pexels.com/photos/2724078/pexels-photo-2724078.jpeg"],
    },
    other: {
      "geo.region": "TZ-ZN",
      "geo.placename": "Zanzibar",
    },
  };
}

export default async function BuyPropertyTypeAreaPage({ params }) {
  if (!isValidSeoRoute(params.type, params.area)) notFound();
  const properties = await getProperties();

  // Format parameters for schema generation
  const formattedArea = params.area
    .replace("-", " ")
    .toLowerCase()
    .trim()
    .replace(/^./, (str) => str.toUpperCase());
  const formattedType = normalizePropertyType(params.type);
  const seo = generateSeoText(formattedType, formattedArea);
  const canonical = `https://www.zanzihome.com/buy/${params.type}/${params.area}`;

  // Filter properties for this specific type and area
  const filtered = properties.filter((obj) => {
    if (!obj || !obj.paid || obj.removed) return false;
    const objType = normalizePropertyType(obj.category);
    const objArea = obj.Area?.toLowerCase().trim().replace(/^./, (char) => char.toUpperCase());
    const matchType = objType === formattedType;
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
          "target": `https://www.zanzihome.com/properties?search={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "name": "ZanziHome",
        "url": "https://www.zanzihome.com/",
        "logo": "https://www.zanzihome.com/logo.png",
        "sameAs": [
          "https://www.facebook.com/zanzihome",
          "https://www.instagram.com/zanzihome"
        ]
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
            "name": item.Title || `${formattedType} in ${formattedArea}`
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
            "name": `${formattedType} in Zanzibar`,
            "item": `https://www.zanzihome.com/buy/${params.type}/`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${formattedType} in ${formattedArea}`,
            "item": canonical
          }
        ]
      }
    ]
  };

  // FAQ Schema (can be generated from CMS or static data)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Can foreigners buy property in ${formattedArea}, Zanzibar?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, foreigners can buy property in ${formattedArea}, Zanzibar through secure leasehold structures (typically 33 to 99 years) which are fully protected and renewable. Zanzibari laws promote foreign investments, especially in designated resort zones approved by ZIPA.`
        }
      },
      {
        "@type": "Question",
        "name": `Is ${formattedArea} a good place to invest in real estate?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, ${formattedArea} is one of the hot spots for real estate in Zanzibar. It offers high rental yields (often between 10% and 18% annually) driven by strong tourist traffic, high holiday occupancy rates, and significant capital growth.`
        }
      },
      {
        "@type": "Question",
        "name": `What types of properties are for sale in ${formattedArea}, Zanzibar?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `A wide variety of properties are available in ${formattedArea}, including beachfront villas, modern apartments, undeveloped land plots, hotels, and commercial listings. You can browse them on ZanziHome.`
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
      <SeoPages
        area={params.area}
        properties={filtered}
        type={params.type}
      />
    </>
  );
}
