import React from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import { objects } from "../utils/data";
import Filter from "../components/Filter";
import OnpageFilter from "../components/OnpageFilter";
import Objects from "../components/Objects";
import AdBanner from "../components/AdBanner";

const Home = () => {
  const { query, handleChange, handleSubmit } = useGlobalContext();
  return (
    <>
      <Filter />
      <OnpageFilter />
      <AdBanner />
      <Objects />
    </>
  );
};

export default Home;
