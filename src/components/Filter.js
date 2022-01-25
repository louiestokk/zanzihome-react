import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import background from "../utils/filterBackground.jpg";
import { useGlobalContext } from "../context";
import { objects } from "../utils/data";
import styled from "styled-components";
const Filter = () => {
  const [showFilter, setShowFilter] = useState(false);
  const handleClick = (e) => {};
  return (
    <Wrapper className="filter-filter-holder">
      <article className="buttons">
        <button type="button" className="button">
          Sale
        </button>
        <button type="button" className="button">
          Rental
        </button>
      </article>
      <div className="holder">
        <article className="filter">
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
            }}
          >
            <h4>Area</h4>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "1rem",
              }}
            >
              <FaBars />
              <p>Select from list</p>
            </div>
          </div>
          <div style={{ position: "relative" }} className="filter">
            <div
              style={{
                position: "absolute",
                top: "30%",
                left: "3%",
                fontSize: "1.3rem",
                color: "gray",
                display: "flex",
                alignItems: "center",
              }}
            >
              <BiSearch style={{ marginRight: "1rem" }} />
              <p
                style={{
                  fontSize: "1rem",
                  color: "gray",
                  letterSpacing: "1px",
                  opacity: "0.7",
                }}
              >
                Write area or address
              </p>
            </div>

            <input type="text" />
          </div>
        </article>
        <article className="filter">
          {Array.from(new Set(objects.map((el) => el.type))).map(
            (object, ind) => {
              return (
                <buttont
                  key={ind}
                  type="button"
                  id={object.typ}
                  onClick={handleClick}
                >
                  {object}
                </buttont>
              );
            }
          )}
        </article>
      </div>
    </Wrapper>
  );
};
export default Filter;
const Wrapper = styled.section`
  height: 460px;
  width: 100%;
  .button {
    width: 8rem;
    height: 3rem;
    color: #0b8b3a;
    font-weight: bold;
    background: white;
    font-size: 1rem;
    margin-top: 2rem;
    margin-bottom: 0rem;
    border: none;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
  .holder {
    background: white;
    height: 320px;
    width: 85%;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
  .filter {
    margin: 1rem 1rem;
  }
  input {
    width: 100%;
    height: 3rem;
  }
`;
