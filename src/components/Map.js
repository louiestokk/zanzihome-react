import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { objects } from "../utils/data";
import { useHistory } from "react-router-dom";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { useSelector } from "react-redux";
const MapComp = () => {
  const firebaseData = useSelector(getFirestoreData);
  const history = useHistory();
  const zanizbar = [-6.0084, 39.2401];
  return (
    <div className="map-holder">
      <MapContainer
        center={zanizbar}
        zoom={8}
        scrollWheelZoom={false}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {firebaseData &&
          firebaseData?.map((el, index) => {
            let coords = [0, 0];
            if (el.lat != null) {
              coords = [Number(el.lat), Number(el.lng)];
            }
            if (el.Adress === "Michamvi" || el.Area === "Michamvi")
              coords = [-6.1448, 39.4948];
            if (el.Adress === "Bwejuu" || el.Area === "Bwejuu")
              coords = [-6.2376, 39.5304];
            if (el.Adress === "Pemba" || el.Area === "Pemba")
              coords = [-5.0979, 39.7756];
            if (el.Adress === "Jambiani" || el.Area === "Jambiani")
              coords = [-6.3158, 39.5446];
            if (el.Adress === "Paje" || el.Area === "Paje")
              coords = [-6.2665, 39.5338];
            return (
              <Marker
                position={coords}
                key={index}
                eventHandlers={{
                  click: (e) => {
                    history.push(`/propertys/property/${el.adId}`);
                  }
                }}
              >
                <Popup>{el.desc}</Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};

export default MapComp;
