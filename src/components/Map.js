"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useRouter, useSearchParams } from "next/navigation";

import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { useSelector } from "react-redux";
import L from "leaflet";

// Fix Leaflet default marker icons not loading in Next.js builds
if (typeof window !== "undefined") {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });
}

// Helper component to dynamically change the map view (center/zoom)
const ChangeMapView = ({ center, zoom }) => {
  const map = useMap();
  React.useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
};

const MapComp = ({ zoom }) => {
  const firebaseData = useSelector(getFirestoreData);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Generate a unique key per mount instance to prevent Map container is already initialized error
  const [mapInstanceId] = React.useState(() => Math.random().toString(36).substring(2, 9));

  React.useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        const container = document.getElementById("zanzibar-all-map");
        if (container) {
          container._leaflet_id = null;
        }
      }
    };
  }, []);

  // Read query coordinates to center and zoom in on a specific property
  const qLat = searchParams.get("lat");
  const qLng = searchParams.get("lng");

  let centerCoords = [-6.0084, 39.2401]; // Default Zanzibar coordinates
  let zoomLevel = zoom ? zoom : 9;

  if (qLat && qLng && !isNaN(Number(qLat)) && !isNaN(Number(qLng))) {
    centerCoords = [Number(qLat), Number(qLng)];
    zoomLevel = 15; // Closer zoom for single property view
  }

  return (
    <div className="map-holder" key={mapInstanceId}>
      <MapContainer
        id="zanzibar-all-map"
        center={centerCoords}
        zoom={zoomLevel}
        scrollWheelZoom={false}
        className="map-container"
      >
        <ChangeMapView center={centerCoords} zoom={zoomLevel} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {firebaseData &&
          firebaseData?.map((el, index) => {
            let coords = [0, 0];
            if (el.Adress === "Michamvi" || el.Area === "Michamvi")
              coords = [-6.1448, 39.4948];
            if (el.Adress === "Bwejuu" || el.Area === "Bwejuu")
              coords = [-6.2376, 39.5304];
            if (el.Adress === "Jambiani" || el.Area === "Jambiani")
              coords = [-6.3158, 39.5446];
            if (el.Adress === "Pemba" || el.Area === "Pemba")
              coords = [-5.0979, 39.7756];

            const coooordss = [Number(el.lat), Number(el.lng)];
            if (!coooordss.includes(NaN)) {
              coords = coooordss;
            }
            if (coooordss[0] === 0 && coooordss[1] === 0) {
              coords = coooordss;
            }

            // Skip rendering markers without valid coordinates
            if (coords[0] === 0 && coords[1] === 0) return null;

            return (
              <Marker
                position={coords}
                key={index}
                eventHandlers={{
                  click: () => {
                    router.push(`/propertys/property/${el.adId}`);
                  }
                }}
              >
                <Popup>
                  <div style={{ fontFamily: "sans-serif", padding: "2px" }}>
                    <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: "700" }}>{el.Title}</h4>
                    <p style={{ margin: "0 0 6px 0", fontSize: "11px", color: "#6b7280" }}>{el.Area}</p>
                    <p style={{ margin: 0, fontSize: "13px", fontWeight: "700", color: "#013a17" }}>${el.Price}</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};

export default MapComp;
