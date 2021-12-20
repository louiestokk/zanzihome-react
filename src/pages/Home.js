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
    window.addEventListener("resize", (e) => {
      setSize(document.body.clientWidth);
    });
  }, [size]);
  return (
    <>
      <Filter />
      <OnpageFilter size={size} setSize={setSize} />
      {size < 700 && <AdBanner />}
      <Objects />
    </>
  );
};

export default Home;
