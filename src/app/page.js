import React from "react";
import PropertyZanzibar from "../views/propertyzanzibar";
import { getProperties } from "../lib/db";

export const metadata = {
  title: "Real Estate Zanzibar | Property for Sale & Rent in Zanzibar",
  description: "Find the best real estate in Zanzibar. Browse houses for sale, apartments, land and rentals in Zanzibar. Buy or rent property in Zanzibar with ZanziHome.",
  keywords: "real estate zanzibar, houses for sale zanzibar, property zanzibar, apartments zanzibar, land for sale zanzibar, rent house zanzibar",
  alternates: {
    canonical: "https://www.zanzihome.com/",
  },
  openGraph: {
    url: "https://www.zanzihome.com/",
    title: "Real Estate Zanzibar | Houses for Sale & Rent",
    description: "Browse houses, apartments and land for sale or rent in Zanzibar. Your #1 real estate platform in Zanzibar.",
    images: [
      {
        url: "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Zanzibar | ZanziHome",
    description: "Find houses, apartments and land in Zanzibar.",
  },
};

export default async function HomePage() {
  const properties = await getProperties();
  const listedProperties = properties.filter((property) => property && property.paid && !property.removed);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.zanzihome.com/#webpage",
        "url": "https://www.zanzihome.com/",
        "name": "Real Estate Zanzibar | Houses for Sale & Rent",
        "description": "Browse houses, apartments and land for sale or rent in Zanzibar.",
        "isPartOf": { "@id": "https://www.zanzihome.com/#website" },
        "mainEntity": { "@id": "https://www.zanzihome.com/#property-list" }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.zanzihome.com/#website",
        "name": "ZanziHome",
        "url": "https://www.zanzihome.com/"
      },
      {
        "@type": "ItemList",
        "@id": "https://www.zanzihome.com/#property-list",
        "name": "Properties in Zanzibar",
        "numberOfItems": listedProperties.length,
        "itemListElement": listedProperties.slice(0, 20).map((property, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": property.Title || "Property in Zanzibar",
          "url": `https://www.zanzihome.com/propertys/property/${property.adId}`
        }))
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PropertyZanzibar initialProperties={properties} />
    </>
  );
}
