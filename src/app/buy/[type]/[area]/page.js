import React from "react";
import SeoPages from "../../../../views/SeoPages";
import { generateSeoText, normalizePropertyType } from "../../../../utils/generateSeoText";
import { getProperties } from "../../../../lib/db";

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
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      title: seo.title,
      description: seo.description,
      url: canonical,
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

export default async function BuyPropertyTypeAreaPage() {
  const properties = await getProperties();
  return <SeoPages initialProperties={properties} />;
}
