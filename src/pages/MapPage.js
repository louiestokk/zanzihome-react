import React from "react";
import MapComp from "../components/Map";

const MapPage = ({ zoom }) => {
  return (
    <div className="map-page-container">
      <MapComp zoom={zoom} />
    </div>
  );
};

export default MapPage;
