import React from "react";
import Filter from "../components/Filter";
import Objects from "../components/Objects";
import MapPage from "./MapPage";
import AdBanner from "../components/AdBanner";
const propertyzanzibar = () => {
  return (
    <>
      <Filter />
      <div className="adBanner-holder">
        <AdBanner />
      </div>
      <MapPage />
      <Objects />
    </>
  );
};

export default propertyzanzibar;
