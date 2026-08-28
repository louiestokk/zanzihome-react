import React from "react";
import { notFound } from "next/navigation";
import SingelFirebaseObject from "../../../../components/SingelFirebaseObject";
import { db } from "../../../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

async function getAdDetails(adId) {
  try {
    const adsRef = collection(db, "newAd");
    
    // Check both Number and String representations to be safe
    let q = query(adsRef, where("adId", "==", Number(adId)));
    let querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      q = query(adsRef, where("adId", "==", String(adId)));
      querySnapshot = await getDocs(q);
    }
    
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
  } catch (err) {
    console.error("Error loading ad details for metadata:", err);
  }
  return null;
}

export async function generateMetadata({ params }) {
  const { adId } = params;
  const ad = await getAdDetails(adId);
  
  if (!ad) {
    return {
      title: "Property Details | ZanziHome",
      description: "Explore houses, villas, and apartments for sale or rent in Zanzibar.",
    };
  }

  const title = `${ad.Title || "Property"} in ${ad.Area || "Zanzibar"} | Real Estate ${ad.Area || "Zanzibar"}`;
  const description = `Looking for ${ad.category?.toLowerCase() || "property"} in ${ad.Area || "Zanzibar"}? Explore ${ad.Title} with ${ad.Rooms || 0} rooms, ${ad.Size || 0} m², priced at $${ad.Price || ad.price || 0}. View photos, map location, and contact brokers.`;
  const canonical = `https://www.zanzihome.com/propertys/property/${adId}`;
  const image = ad.uri || (ad.url && ad.url[0]) || "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg";

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

export default async function SingelFirebaseObjectPageRoute({ params }) {
  const { adId } = params;
  const ad = await getAdDetails(adId);
  if (!ad) notFound();
  return <SingelFirebaseObject adId={adId} />;
}
