"use client";

import React, { useState, useEffect } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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

const provider = new OpenStreetMapProvider();

// Helper component to dynamically change the map view (center/zoom)
const ChangeMapView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
};
const SingeldefaultMapMapPage = ({ Area, userCoords }) => {
  const [respData, setrespData] = useState();
  const [label, setlabel] = useState("");
  // Generate a unique key per mount instance to prevent Map container is already initialized error
  const [mapInstanceId] = useState(() => Math.random().toString(36).substring(2, 9));

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        const container = document.getElementById("zanzibar-detail-default-map");
        if (container) {
          container._leaflet_id = null;
        }
      }
    };
  }, []);

  const fecthCoordsByCity = async () => {
    try {
      const resp = await provider.search({ query: `${Area}, Zanzibar` });
      if (resp && resp.length > 0) {
        setrespData([resp[0].y, resp[0].x]);
        setlabel(resp[0].label);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fecthCoordsByCity();
  }, []);

  return (
    <div>
      {respData && (
        <>
          {Area && <h3>Location: {Area}</h3>}
          <section style={{ height: "100%", width: "100%" }} key={mapInstanceId}>
            <MapContainer
              id="zanzibar-detail-default-map"
              center={respData && respData}
              zoom={8}
              scrollWheelZoom={false}
              style={{ width: "100%", height: "240px" }}
            >
              <ChangeMapView center={respData} zoom={8} />
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={respData && respData}>
                <Popup>{`Property in ${Area}`}</Popup>
              </Marker>
            </MapContainer>
          </section>
          <p style={{ fontSize: "0.8rem" }}>Property in {label}</p>
        </>
      )}
    </div>
  );
};

export default SingeldefaultMapMapPage;
