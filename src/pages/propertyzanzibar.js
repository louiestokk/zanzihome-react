import React from "react";
import Filter from "../components/Filter";
import Objects from "../components/Objects";
import MapPage from "./MapPage";
import AdBanner from "../components/AdBanner";
import { Helmet } from "react-helmet-async";
import BannerSection from "../components/BannerSection";
import Faq from "../components/Faq";
import Abovefooter from "../components/Abovefooter";
const propertyzanzibar = () => {
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Properties for Sale and Rent in Zanzibar",
    description:
      "Properties for Sale and Rent in Zanzibar. Discover Your Dream Property for Sale in Zanzibar. Advertise Your Property on Zanzihome Today! Your One-Stop Property Marketplace!",
    image:
      "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    datePublished: new Date("2023-04-04T09:25:01.340Z").toISOString(),
    author: {
      "@type": "Person",
      name: "Louie Stokk"
    }
  };
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(articleStructuredData)}
      </script>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {
            "Properties for Sale and Rent in Zanzibar. Discover Your Dream Property for Sale in Zanzibar. Advertise Your Property on Zanzihome Today! Your One-Stop Property Marketplace!"
          }
        </title>
        <meta
          name="description"
          content={
            "Find Your Perfect Slice of Paradise: Properties for Sale in Zanzibar. Find properties in Zanzibar as houses, plots and apartments for sale or for rent. Looking for properties or businesses for sale or rent in Zanzibar? Zanzihome offers a wide selection of properties in Zanzibar to choose from, as well as an easy-to-use platform to advertise your own property or business. With our optimized search engine and user-friendly interface, finding or selling a property or business in Zanzibar has never been easier. Sign up today and start exploring the opportunities Zanzihome has to offer."
          }
        />
      </Helmet>
      <Filter />
      <BannerSection />
      <h4 className="map-header-title">Some selected properties!</h4>
      <MapPage />
      <Objects />
      <div className="adBanner-holder">
        <AdBanner />
      </div>
      <Faq />
      <Abovefooter />
    </>
  );
};

export default propertyzanzibar;
