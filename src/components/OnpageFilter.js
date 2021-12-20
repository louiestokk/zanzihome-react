import React, { useState, useContext, useEffect } from "react";
import { useGlobalContext } from "../context";
import { objects } from "../utils/data";
import OnpageSelect from "./OnpageSelect";
import { Link } from "react-router-dom";
import { BsMap } from "react-icons/bs";
import MapComp from "./Map";

const OnpageFilter = ({ size, setSize }) => {
  const { active, forSale, forRent, forBusiness } = useGlobalContext();
  const numItems = (string) => {
    const forsale = objects.filter((el) => el.to === "Buy").length;
    return objects.filter((el) => el.to === string).length;
  };

  return (
    <div className="onpage-filter">
      <div className="onpage-buttons">
        <div
          className={active ? "active" : "not-active"}
          data-id="Buy"
          onClick={forSale}
        >
          <span>Sale {numItems("Buy")}</span>
        </div>
        <div
          className={active === false ? "active" : "not-active"}
          data-id="Rent"
          onClick={forRent}
        >
          <span>Rental {numItems("Rent")}</span>
        </div>
        <div
          className={active === null ? "active" : "not-active"}
          data-id="Business"
          onClick={forBusiness}
        >
          <span>Business {numItems("Business")}</span>
        </div>
      </div>
      <MapComp objects={objects} size={size} setSize={setSize} />
      <div className="onpage-select-div">
        <div className="alt">
          <select name="alt">
            <option value="newest">Sorted by newest first</option>
            <option value="oldest">Sorted by oldest first</option>
            <option value="lowprice">Sorted by lowest price first</option>
            <option value="highprices">Sorted by highest price first</option>
          </select>
          <Link to="/">
            <button>
              <BsMap className="map" />
              Map
            </button>
          </Link>
        </div>
      </div>
      <h4 className="antal-objects">{objects.length} properties</h4>
    </div>
  );
};

export default OnpageFilter;
