import React from "react";
import Vehicle from "../../views/Vehicle";

export const metadata = {
  title: "Rent Cars and Motorcycles in Zanzibar",
  description: "Car Rental Zanzibar. Explore Zanzibar with our affordable car and motorcycle rentals. From scooters to SUVs",
  alternates: {
    canonical: "https://www.zanzihome.com/car-rental-zanzibar",
  },
  openGraph: {
    url: "https://www.zanzihome.com/car-rental-zanzibar",
    title: "Rent Cars and Motorcycles in Zanzibar",
    description: "Car Rental Zanzibar. Explore Zanzibar with our affordable car and motorcycle rentals. From scooters to SUVs",
    images: [
      {
        url: "https://images.pexels.com/photos/787472/pexels-photo-787472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ],
  },
};

export default function CarRentalPage() {
  return <Vehicle />;
}
