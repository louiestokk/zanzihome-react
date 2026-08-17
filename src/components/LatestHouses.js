import React from "react";
import LatestListingsSection from "./LatestListingsSection";

const LatestHouses = ({ initialProperties }) => {
  return (
    <LatestListingsSection
      title="Latest Houses & Villas"
      subtitle="Discover brand new houses and luxury villas in Zanzibar"
      category="House"
      initialProperties={initialProperties}
    />
  );
};

export default LatestHouses;
