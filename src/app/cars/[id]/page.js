import React from "react";
import VehicleDetails from "../../../views/VehicleDetails";
import { db } from "../../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

async function getVehicleDetails(id) {
  try {
    const adsRef = collection(db, "newAd");
    
    // Check both Number and String representations to be safe
    let q = query(adsRef, where("adId", "==", Number(id)));
    let querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      q = query(adsRef, where("adId", "==", String(id)));
      querySnapshot = await getDocs(q);
    }
    
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
  } catch (err) {
    console.error("Error loading vehicle details for metadata:", err);
  }
  return null;
}

export async function generateMetadata({ params }) {
  const { id } = params;
  const vehicle = await getAdDetailsOrVehicle(id);

  if (!vehicle) {
    return {
      title: "Vehicle Rental Details | ZanziHome",
      description: "Rent cars, SUVs, and motorcycles in Zanzibar.",
    };
  }

  const title = `Rent ${vehicle.Title || "Vehicle"} in Zanzibar | ZanziHome Car Rental`;
  const description = `Rent this ${vehicle.Title || "vehicle"} in Zanzibar. Priced from ${vehicle.Price || vehicle.price || "$0"}. Book your ride online today.`;
  const canonical = `https://www.zanzihome.com/cars/${id}`;

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
          url: vehicle.uri || (vehicle.url && vehicle.url[0]) || "https://images.pexels.com/photos/787472/pexels-photo-787472.jpeg",
        },
      ],
    },
  };
}

// Inline helper for generateMetadata
async function getAdDetailsOrVehicle(id) {
  return await getVehicleDetails(id);
}

export default function VehicleDetailsPageRoute() {
  return <VehicleDetails />;
}
