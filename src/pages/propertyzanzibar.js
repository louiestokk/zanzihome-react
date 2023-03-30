import React from "react";
import Filter from "../components/Filter";
import Objects from "../components/Objects";
import MapPage from "./MapPage";
import AdBanner from "../components/AdBanner";
import { Helmet } from "react-helmet-async";
import Faq from "../components/Faq";
const propertyzanzibar = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{"Zanzihome Properties in Zanzibar"}</title>
        <meta
          name="description"
          content={
            "Find properties in Zanzibar as houses, plots and apartments for sale or for rent. Zanzihome is a site that will help you find your next or first home. Find lots of apartments and houses for rent. Do you have a home, plot or business that you want to rent out or sell? Advertise with us. Find properties in Zanzibar. You can find all types of properties here. Eazy whay to sell or rent your property in Zanzibar. Sell property Zanzibar. Properties for sale in Zanzibar. Business for sale Zanzibar. Business for rent Zanzibar. Properties for Sale in Zanzibar"
          }
        />
      </Helmet>
      <Filter />
      <div className="adBanner-holder">
        <AdBanner />
      </div>
      <MapPage />
      <Objects />
      <Faq />
    </>
  );
};

export default propertyzanzibar;
