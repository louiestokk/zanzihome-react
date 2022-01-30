import React from "react";
import Filter from "../components/Filter";
import OnpageFilter from "../components/OnpageFilter";
import Objects from "../components/Objects";
import MapPage from "./MapPage";

const propertyzanzibar = () => {
  return (
    <>
      <Filter />
      <MapPage />
      <Objects />
    </>
  );
};

export default propertyzanzibar;
