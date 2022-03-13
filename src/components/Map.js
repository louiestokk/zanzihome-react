import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { objects } from "../utils/data";
import { useHistory } from "react-router-dom";

const MapComp = () => {
  // const [plats, setPlats] = useState();
  const zanizbar = [-6.0084, 39.2401];

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
  // }, [plats]);
  // map.remove();

  const history = useHistory();
  return (
    <div className="map-holder">
      <MapContainer
        center={zanizbar}
        zoom={7}
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
      {/* <div className={`${size < 705 ? namn : ""}`}>
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
      </div> */}
    </div>
  );
};

export default MapComp;
