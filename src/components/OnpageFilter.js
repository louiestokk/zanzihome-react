import React from "react";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
import { useGlobalContext } from "../context";
import { objects } from "../utils/data";
import { BsMap } from "react-icons/bs";
import { Link } from "react-router-dom";
const OnpageFilter = () => {
  const { active, setActive } = useGlobalContext();

  return (
    <div className="onpage-filter">
      <div className="onpage-buttons">
        <div
          className={active ? "active" : "not-active"}
          data-id="1"
          onClick={() => setActive(!active)}
        >
          <h4>For sale</h4>
          <span>10</span>
        </div>
        <div
          className={active === false ? "active" : "not-active"}
          data-id="2"
          onClick={() => setActive(false)}
        >
          <h4>For rental </h4>
          <span> 10</span>
        </div>
        <div
          className={active === null ? "active" : "not-active"}
          data-id="3"
          onClick={() => setActive(null)}
        >
          <h4>Business</h4>
          <span>10</span>
        </div>
      </div>

      <div className="onpage-select-div">
        <div className="alt">
          <select name="alt">
            <option value="newest">Sorted by newest first</option>
            <option value="newest">Sorted by oldest first</option>
            <option value="newest">Sorted by lowest price first</option>
            <option value="newest">Sorted by highest price first</option>
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
