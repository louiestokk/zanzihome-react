import React from "react";
import RentalOwner from "../../views/RentalOwner";

export const metadata = {
  title: "Rental Owner Services | ZanziHome",
  description: "List and manage your rental properties in Zanzibar with ZanziHome.",
  alternates: {
    canonical: "https://www.zanzihome.com/rental-owner",
  },
};

export default function RentalOwnerPage() {
  return <RentalOwner />;
}
