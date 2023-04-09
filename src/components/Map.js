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

            return (
              <Marker
                position={coords}
                key={index}
                eventHandlers={{
                  click: () => {
                    history.push(`/propertys/property/${el.adId}`);
                  }
                }}
              ></Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};

export default MapComp;
