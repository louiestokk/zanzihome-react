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
  return <SeoPages initialProperties={properties} />;
}
