import React from "react";
import LatestListingsSection from "./LatestListingsSection";

const LatestBusiness = ({ initialProperties }) => {
  return (
    <LatestListingsSection
      title="Business & Commercial"
      subtitle="Premium hotels, properties and commercial businesses for sale"
      category="Business"
      initialProperties={initialProperties}
    />
  );
};

export default LatestBusiness;
