import React, { useState, useEffect } from "react";
import { objects } from "../utils/data";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
const SingleObject = () => {
  const { propertys, setPropertys } = useGlobalContext();
  const { id } = useParams();

  useEffect(() => {
    const newObject = propertys.filter((el) => el.id === id);
    setPropertys(newObject);
  }, []);

  return (
    <div>
      <h2>single object</h2>
    </div>
  );
};

export default SingleObject;
