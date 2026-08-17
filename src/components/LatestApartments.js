import React from "react";
import LatestListingsSection from "./LatestListingsSection";

const LatestApartments = ({ initialProperties }) => {
  return (
    <LatestListingsSection
      title="Latest Apartments"
      subtitle="Explore recently listed apartments in Zanzibar"
      category="Apartment"
      initialProperties={initialProperties}
    />
  );
};

export default LatestApartments;
