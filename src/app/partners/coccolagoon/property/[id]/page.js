import React from "react";
import { notFound } from "next/navigation";
import CoccolagoonDetailsPage from "../../../../../views/CoccolagoonDetailsPage";
import { getCoccolagoonPropertyById } from "../../../../../utils/coccolagoonData";

export async function generateMetadata({ params }) {
  const { id } = params;
  const property = getCoccolagoonPropertyById(id);

  if (!property) {
    return {
      title: "Cocco Lagoon Partner Property | ZanziHome",
      description: "Explore luxury partner properties in Zanzibar.",
    };
  }

  const title = `${property.title} in ${property.Area} | Cocco Lagoon Partner`;
  const description = `Explore the ${property.title} at Cocco Lagoon Resort & Spa on Pemba Island, Zanzibar. Priced from ${property.price}, ${property.size} m², ${property.rooms} bedroom(s). Contact us directly.`;
  const canonical = `https://www.zanzihome.com/partners/coccolagoon/property/${id}`;

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
          url: property.url,
        },
      ],
    },
  };
}

export default function CoccolagoonDetailsPageRoute({ params }) {
  if (!getCoccolagoonPropertyById(params.id)) notFound();
  return <CoccolagoonDetailsPage />;
}
