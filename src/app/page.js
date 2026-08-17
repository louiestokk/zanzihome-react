import React from "react";
import PropertyZanzibar from "../views/propertyzanzibar";
import { getProperties } from "../lib/db";

export const metadata = {
  title: "Real Estate Zanzibar | Houses for Sale & Rent in Zanzibar",
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
  return <PropertyZanzibar initialProperties={properties} />;
}
