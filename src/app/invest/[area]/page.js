import React from "react";
import { notFound } from "next/navigation";
import SeoInvestPages from "../../../views/SeoInvestPages";
import { generateSeoInvestText } from "../../../utils/generateSeoText";
import { getProperties } from "../../../lib/db";
import { areas } from "../../../utils/seoData";

function getAreaName(area) {
  const areaSlug = area.toLowerCase();
  return areas.find((value) => value.toLowerCase().replace(/\s+/g, "-") === areaSlug);
}

export async function generateMetadata({ params }) {
  const { area } = params;
  const areaName = getAreaName(area);
  const formattedArea = areaName || area;
  
  const seo = generateSeoInvestText(formattedArea);
  const canonical = `https://www.zanzihome.com/invest/${area}`;

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
  };
}

export default async function InvestAreaPageRoute({ params }) {
  const areaName = getAreaName(params.area);
  if (!areaName) notFound();
  const properties = await getProperties();
  const activeProperties = properties.filter((property) => property && property.paid && !property.removed && property.Area?.toLowerCase().replace(/[\s-]/g, "") === areaName.toLowerCase().replace(/[\s-]/g, ""));
  const canonical = `https://www.zanzihome.com/invest/${params.area}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical}#webpage`,
    "url": canonical,
    "name": `Real Estate Investment in ${areaName}, Zanzibar`,
    "description": `Explore investment properties and land in ${areaName}, Zanzibar.`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": activeProperties.length,
      "itemListElement": activeProperties.slice(0, 20).map((property, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": property.Title || `Property in ${areaName}`,
        "url": `https://www.zanzihome.com/propertys/property/${property.adId}`
      }))
    }
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SeoInvestPages initialProperties={properties} />
    </>
  );
}
