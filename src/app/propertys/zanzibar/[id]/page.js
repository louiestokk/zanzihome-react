import React from "react";
import { notFound } from "next/navigation";
import SingleObject from "../../../../components/SingleObject";
import { objects } from "../../../../utils/data";

export async function generateMetadata({ params }) {
  const { id } = params;
  const obj = objects.find(el => el.id === Number(id));
  
  if (!obj) {
    return {
      title: "Property Details | ZanziHome",
      description: "Explore houses, villas, and apartments for sale or rent in Zanzibar.",
    };
  }

  const title = `${obj.type} in ${obj.location} | Real Estate Zanzibar`;
  const description = `Discover this beautiful ${obj.type?.toLowerCase() || "property"} in ${obj.location}, Zanzibar. ${obj.rooms || 0} rooms, ${obj.size || 0} m², priced at $${obj.price || 0}. Contact brokers today.`;
  const canonical = `https://www.zanzihome.com/propertys/zanzibar/${id}`;
  const image = (obj.url && obj.url[0]) || "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg";

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
      type: "website",
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function SingleObjectPageRoute({ params }) {
  if (!objects.some((object) => object.id === Number(params.id))) notFound();
  return <SingleObject />;
}
