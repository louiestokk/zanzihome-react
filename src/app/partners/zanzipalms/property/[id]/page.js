import React from "react";
import ZanzipalmsDetailsPage from "../../../../../views/ZanzipalmsDetailsPage";
import { zanzipalmsStaticData } from "../../../../../utils/zanzipalmsData";

export async function generateMetadata({ params }) {
  const { id } = params;
  const property = zanzipalmsStaticData[id];

  if (!property) {
    return {
      title: "Zanzipalms Partner Property | ZanziHome",
      description: "Explore luxury partner properties in Zanzibar.",
    };
  }

  const title = `${property.title || "Partner Property"} in ${property.Area || "Zanzibar"} | Zanzipalms Partner`;
  const description = `Explore ${property.title || "luxury property"} in ${property.Area || "Zanzibar"}, Zanzibar. Priced at ${property.price || "Contact Us"}${property.bedrooms ? `, this property offers ${property.bedrooms} bedrooms` : ""}${property.size ? ` and ${property.size} sqm` : ""}. Contact us directly.`;
  const canonical = `https://www.zanzihome.com/partners/zanzipalms/property/${id}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      url: canonical,
      title,
      description,
      images: [
        {
          url: (property.images && property.images[0]) || "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg",
        },
      ],
    },
  };
}

export default function ZanzipalmsDetailsPageRoute() {
  return <ZanzipalmsDetailsPage />;
}
