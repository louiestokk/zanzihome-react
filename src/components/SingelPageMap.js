import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
const SingelPageMap = ({ Area, userCoords, Title }) => {
  if (userCoords.includes(NaN)) return <></>;
  if (userCoords[0] === 0 && userCoords[1] === 0) return <></>;
  return (
    <div style={{ marginBottom: "3rem" }}>
      {Area && <h3>Location: {"Property"}</h3>}
      <section style={{ height: "100%", width: "100%" }}>
        <MapContainer
          center={userCoords}
          zoom={12}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "340px" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={userCoords}>
            <Popup>{Title}</Popup>
          </Marker>
        </MapContainer>
      </section>
    </div>
  );
};

export default SingelPageMap;
