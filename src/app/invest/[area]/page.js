import React from "react";
import SeoInvestPages from "../../../views/SeoInvestPages";
import { generateSeoInvestText } from "../../../utils/generateSeoText";
import { getProperties } from "../../../lib/db";

export async function generateMetadata({ params }) {
  const { area } = params;
  const formattedArea = area
    .replace("-", " ")
    .toLowerCase()
    .trim()
    .replace(/^./, (str) => str.toUpperCase());
  
  const seo = generateSeoInvestText(formattedArea);
  const canonical = `https://www.zanzihome.com/invest/${area}`;

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
  };
}

export default async function InvestAreaPageRoute() {
  const properties = await getProperties();
  return <SeoInvestPages initialProperties={properties} />;
}
