import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import Propertyzanzibar from "./propertyzanzibar";
import AdBanner from "../components/AdBanner";
import image from "../utils/zanzibarisland.jpg";
const Home = () => {
  const { query, handleChange, handleSubmit } = useGlobalContext();
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
      {/* <AdBanner /> */}
      <Propertyzanzibar />
    </div>
  );
};

export default Home;
