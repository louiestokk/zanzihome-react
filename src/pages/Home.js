import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import Propertyzanzibar from "./propertyzanzibar";
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
      <Propertyzanzibar />
    </>
  );
};

export default Home;
