import React, { useState, useEffect } from "react";
import Propertyzanzibar from "./propertyzanzibar";
import { Helmet } from "react-helmet-async";
const Home = () => {
  const [size, setSize] = useState(window.innerWidth);
  useEffect(() => {
    const detectSize = window.addEventListener("resize", (e) => {
      setSize(document.body.clientWidth);
    });
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [size]);
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{"Zanzihome Properties in Zanzibar"}</title>
        <meta
          name="description"
          content={
            "Find properties in Zanzibar as houses, plots and apartments for sale or for rent. ZanziHome.com will help you find your next or first home."
          }
        />
        <link rel="canonical" href="https://www.zanzihome.com" />
      </Helmet>
      {/* <AdBanner /> */}
      <Propertyzanzibar />
    </div>
  );
};

export default Home;
