import React, { Suspense } from "react";
import AllPropertiesPage from "../../views/AllPropertiesPage";
import { getProperties } from "../../lib/db";

export const metadata = {
  title: "Properties for Sale & Rent in Zanzibar | ZanziHome",
  description: "Discover houses, villas, apartments, land and commercial properties for sale or rent in Zanzibar. Get featured listings and boost your property visibility.",
  alternates: {
    canonical: "https://www.zanzihome.com/properties-zanzibar",
  },
  openGraph: {
    url: "https://www.zanzihome.com/properties-zanzibar",
    title: "Properties for Sale & Rent in Zanzibar | ZanziHome",
    description: "Browse Zanzibar real estate including beachfront villas, apartments, land and commercial properties. Featured listings available.",
    images: [
      {
        url: "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg",
      },
    ],
  },
};

export default async function PropertiesZanzibarPage() {
  const properties = await getProperties();
  return (
    <Suspense fallback={<div>Loading properties...</div>}>
      <AllPropertiesPage initialProperties={properties} />
    </Suspense>
  );
}
