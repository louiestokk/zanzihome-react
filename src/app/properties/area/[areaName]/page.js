import React from "react";
import { notFound } from "next/navigation";
import AreaPropertiesPage from "../../../../views/AreaPropertiesPage";
import { getProperties } from "../../../../lib/db";
import { areas } from "../../../../utils/seoData";

export async function generateMetadata({ params }) {
  const { areaName } = params;
  const formattedAreaName = areaName
    .replace("-", " ")
    .toLowerCase()
    .trim()
    .replace(/^./, (str) => str.toUpperCase());

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
  return <AreaPropertiesPage initialProperties={properties} />;
}
