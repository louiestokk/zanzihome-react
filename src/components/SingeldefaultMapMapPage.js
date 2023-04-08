import React, { useState, useEffect } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
const provider = new OpenStreetMapProvider();
const SingeldefaultMapMapPage = ({ Area, userCoords }) => {
  const [respData, setrespData] = useState();
  const [label, setlabel] = useState("");
  const fecthCoordsByCity = async () => {
    try {
      const resp = await provider.search({ query: `${Area}, Zanzibar` });
      setrespData([resp[0].y, resp[0].x]);
      setlabel(resp[0].label);
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
          <section style={{ height: "100%", width: "100%" }}>
            <MapContainer
              center={respData && respData}
              zoom={12}
              scrollWheelZoom={false}
              style={{ width: "100%", height: "340px" }}
            >
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
