import React, { useState } from "react";
import { MapContainer, Map, TileLayer, Marker, Popup } from "react-leaflet";
import { objects } from "../utils/data";
import { useHistory } from "react-router-dom";
import AdBanner from "./AdBanner";
import { bannerInfo } from "../utils/data";
import banner from "../utils/buildhousezanzibar.jpg";
import { MdConstruction } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
const MapComp = ({ size, setSize }) => {
  const { company, name, id, url } = bannerInfo[0];

  const [plats, setPlats] = useState([]);
  const zanizbar = [-6.0084, 39.2401];
  const [namn, setName] = useState("hidden");

  // const getPosition = () => {
  //   const position = navigator.geolocation.getCurrentPosition(
  //     function (pos) {
  //       const { latitude, longitude } = pos.coords;
  //       setPlats([latitude, longitude]);
  //       console.log(latitude, longitude);
  //     },
  //     function (error) {
  //       console.log(error);
  //     }
  //   );
  // };

  // useEffect(() => {
  //   getPosition();
  // }, []);
  // map.remove();

  const history = useHistory();
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
        {objects.map((el) => {
          const { coords } = el;
          if (coords) {
            return (
              <Marker
                position={coords}
                key={el.id}
                eventHandlers={{
                  click: (e) => {
                    history.push(`/propertys/zanzibar/${el.id}`);
                  },
                }}
              >
                <Popup>{el.desc}</Popup>
              </Marker>
            );
          }
        })}
      </MapContainer>
      <div className={`${size < 700 ? namn : ""}`}>
        <div className="adBanner-image-container">
          <img src={banner} alt="construct company" />
          <div className="addBanner-info">
            <div className="bildskallvahar">
              <MdConstruction className="construct" />
            </div>
            <div>
              <h4>{company}</h4>
              <p>{name}</p>
            </div>
          </div>
          <div className="adBanner-footer">
            <div className="adbanner-logo">
              <div>
                <h4>Construction company with 15 years of experience</h4>
                <h5>
                  Reliable and cost-effective <AiOutlineCheck />
                </h5>
              </div>
              <div className="adbanerlogga">
                <p>M M M</p>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComp;
