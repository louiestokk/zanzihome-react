import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import { objects } from "../utils/data";
import Filter from "../components/Filter";
import OnpageFilter from "../components/OnpageFilter";
import Objects from "../components/Objects";
import AdBanner from "../components/AdBanner";

const Home = () => {
  const { query, handleChange, handleSubmit } = useGlobalContext();
  const [size, setSize] = useState(window.innerWidth);
  const screenWidth = window.innerWidth;

  useEffect(() => {
    const detectSize = window.addEventListener("resize", (e) => {
      setSize(document.body.clientWidth);
    });
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [size]);
  return (
    <>
      <Filter />
      <OnpageFilter size={size} setSize={setSize} />
      {size < 705 && <AdBanner size={size} setSize={setSize} />}
      <Objects />
    </>
  );
};

export default Home;
