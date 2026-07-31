import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useHistory, useLocation } from "react-router-dom";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { useSelector } from "react-redux";

const MapComp = ({ zoom }) => {
  const firebaseData = useSelector(getFirestoreData);
  const history = useHistory();
  const location = useLocation();

  // Read query coordinates to center and zoom in on a specific property
  const queryParams = new URLSearchParams(location.search);
  const qLat = queryParams.get("lat");
  const qLng = queryParams.get("lng");

  let centerCoords = [-6.0084, 39.2401]; // Default Zanzibar coordinates
  let zoomLevel = zoom ? zoom : 9;

  if (qLat && qLng && !isNaN(Number(qLat)) && !isNaN(Number(qLng))) {
    centerCoords = [Number(qLat), Number(qLng)];
    zoomLevel = 15; // Closer zoom for single property view
  }

  return (
    <div className="map-holder">
      <MapContainer
        center={centerCoords}
        zoom={zoomLevel}
        scrollWheelZoom={false}
        className="map-container"
        key={`${centerCoords[0]}-${centerCoords[1]}`} // Key forces re-render if center changes
      >
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
                    history.push(`/propertys/property/${el.adId}`);
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
