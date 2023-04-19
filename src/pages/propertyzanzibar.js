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
    headline: "Discover Your Dream Property in Zanzibar",
    description:
      "Properties for Sale and Rent in Zanzibar. Find a Property for Sale in Zanzibar.",
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
      <div>
        <script type="application/ld+json">
          {JSON.stringify(articleStructuredData)}
        </script>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{"Discover Your Dream Property in Zanzibar"}</title>
        <meta
          name="description"
          content={
            "Discover Your Dream Property in Zanzibar - Properties for Sale and Rent"
          }
        />
        <meta property="og:url" content="https://zanzihome.com" />
        <meta
          property="og:description"
          content="Discover Your Dream Property in Zanzibar - Properties for Sale and Rent"
        />
        <meta
          property="og:image"
          content="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
