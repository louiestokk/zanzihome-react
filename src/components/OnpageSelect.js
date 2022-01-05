import React from "react";
import { Link } from "react-router-dom";
import { BsMap } from "react-icons/bs";
import { useGlobalContext } from "../context";

const OnpageSelect = () => {
  const { setPropertys, propertys } = useGlobalContext();
  const handleChange = (e) => {
    console.log(e);
  };
  return (
    <div className="onpage-select-div">
      <div className="alt">
        <select name="alt" onChange={(e) => console.log(e)}>
          <option value="newest">Sorted by newest first</option>
          <option value="oldest">Sorted by oldest first</option>
          <option value="lowprice">Sorted by lowest price first</option>
          <option value="highprices">Sorted by highest price first</option>
        </select>
      </div>
      <Link to="/map">
        <button type="button">
          <BsMap className="map" />
          Map
        </button>
      </Link>
    </div>
  );
};

export default OnpageSelect;
