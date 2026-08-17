import React from "react";
import BoostListing from "../../views/BoostListing";

export const metadata = {
  title: "Boost Property Listings & Ads | ZanziHome",
  description: "Choose a premium boost package to sell or rent out your property in Zanzibar faster. Get featured badges and top-ranking search priority.",
  alternates: {
    canonical: "https://www.zanzihome.com/boost-listing",
  },
};

export default function BoostListingPage() {
  return <BoostListing />;
}
