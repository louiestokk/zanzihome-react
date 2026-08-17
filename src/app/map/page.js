import React from "react";
import dynamic from "next/dynamic";

const MapPageClient = dynamic(() => import("../../views/MapPage"), {
  ssr: false,
  loading: () => <div style={{ height: "500px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>Loading Interactive Map...</div>,
});

export const metadata = {
  title: "Interactive Property Map | ZanziHome",
  description: "Browse houses, villas, and apartments for sale or rent on our interactive map of Zanzibar.",
  alternates: {
    canonical: "https://www.zanzihome.com/map",
  },
};

export default function MapPageRoute() {
  return <MapPageClient />;
}
