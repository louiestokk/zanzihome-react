import React from "react";
import { notFound } from "next/navigation";
import SeoCheapPages from "../../../../../views/SeoCheapPages";
import { getProperties } from "../../../../../lib/db";
import { normalizePropertyType } from "../../../../../utils/generateSeoText";
import { areas, propertyTypes } from "../../../../../utils/seoData";

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
  const description = `Browse affordable ${displayType} for sale in ${formattedArea}, Zanzibar. Filter cheap villas, homes, and land plots starting from low prices directly by owner.`;
  const canonical = `https://www.zanzihome.com/cheap/${type}/for-sale/${area}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      images: [
        {
          url: "https://images.pexels.com/photos/2724078/pexels-photo-2724078.jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://images.pexels.com/photos/2724078/pexels-photo-2724078.jpeg"],
    },
  };
}

export default async function CheapPropertyTypeAreaPageRoute({ params }) {
  if (!isValidCheapRoute(params.type, params.area)) notFound();
  const properties = await getProperties();
  return <SeoCheapPages initialProperties={properties} />;
}
