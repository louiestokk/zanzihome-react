import React, { useState, useEffect } from "react";
import Propertyzanzibar from "./propertyzanzibar";

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
      <Propertyzanzibar />
    </div>
  );
};

export default Home;
