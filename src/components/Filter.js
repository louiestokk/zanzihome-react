import React, { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { useGlobalContext } from "../context";

const Filter = () => {
  const { showFilter, setShowFilter } = useGlobalContext();

  return (
    <>
      <div className="filter-container">
        <div className="filter-ett">
          <div>
            <h4>Whole Zanzibar</h4>
            <p>All properties</p>
          </div>
        </div>
        <button type="button" onClick={() => setShowFilter(!showFilter)}>
          Filter
          <FaArrowDown className="arrow-down" />
        </button>
      </div>
      <div className={`${showFilter ? "filter-menu show" : "filter-menu"}`}>
        <div className="filter-menu-nav">
          <h4>Search filter</h4>
          <h4 className="cancel-text">Cancel</h4>
        </div>
        <div className="filter-menu-buttons">
          <button type="button">Buy</button>
          <button type="button">Rent</button>
        </div>
        <form className="filter-local">
          <div>
            <h4>Area</h4>
            <select name="location">
              <option value="test">test</option>
            </select>
          </div>
          <div>
            <h4>Property type</h4>
            <select name="type">
              <option value="test">test</option>
            </select>
          </div>
        </form>
      </div>
    </>
  );
};

export default Filter;
