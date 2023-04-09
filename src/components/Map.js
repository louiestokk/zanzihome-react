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
              <Marker position={coords} key={index}>
                <Popup>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      cursor: "pointer"
                    }}
                    onClick={() =>
                      (window.location.href = `/propertys/property/${el.adId}`)
                    }
                  >
                    <h4 style={{ color: "black" }}>{el.Title}</h4>
                    <img
                      style={{
                        height: "50px",
                        width: "100%",
                        objectFit: "cover"
                      }}
                      src={el.uri}
                    />
                    <div>
                      <p>
                        <strong>Area:</strong> {el.Area}
                      </p>
                    </div>
                    <a
                      href={`/propertys/property/${el.adId}`}
                      title={`Properties for sale zanzibar, ${el.Title}`}
                      style={{
                        border: "1px solid blue",
                        marginTop: "0.5rem",
                        width: "100%",
                        textAlign: "center",
                        borderRadius: "3px",
                        padding: "0.3rem",
                        cursor: "pointer"
                      }}
                    >
                      Se property
                    </a>
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
