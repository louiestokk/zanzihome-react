"use client";

import React from "react";
import { useRouter } from "next/navigation";

const AdBanner = () => {
  const router = useRouter();

  return (
    <div className="promo-banner-wrapper">
      

      <div className="promo-banner-content">
        <h2 className="promo-banner-title">Sell or Rent Faster!</h2>
        <p className="promo-banner-text">
          Boost your property listing and get maximum visibility on ZanziHome. Reaches thousands of prospective buyers and tenants daily.
        </p>
        <button
          type="button"
          className="promo-banner-btn"
          onClick={() => router.push("/boost-listing")}
        >
          Explore Boost Packages 🚀
        </button>
      </div>
    </div>
  );
};

export default AdBanner;
