import React from "react";
import { BiMap } from "react-icons/bi";
import { GiHouse } from "react-icons/gi";
import Objects from "../components/Objects";
import MapPage from "./MapPage";
import Faq from "../components/Faq";
import Abovefooter from "../components/Abovefooter";
import Checkbox from "@material-ui/core/Checkbox";
const villages = [
  "Bondeni",
  "Bububu",
  "Bumbwini",
  "Bwejuu",
  "Chuini",
  "Chukwani",
  "Chwaka",
  "Dimbani",
  "Fukuchani",
  "Fumba",
  "Fuoni",
  "Jambiani",
  "Jendele",
  "Jozani",
  "Kae",
  "Kendwa",
  "Kibaoni",
  "Kibweni",
  "Kinyasini",
  "Kitogani",
  "Kiwengwa",
  "Kizimkazi",
  "Koani",
  "Mahonda",
  "Makunduchi",
  "Mangapwani",
  "Matemwe",
  "Mbweni",
  "Mchangani",
  "Michenzani",
  "Mkokotoni",
  "Mtoni",
  "Mwana Kwerekwe",
  "Mwembe Ladu",
  "Mwera",
  "Mzambarauni",
  "Nungwi",
  "Paje",
  "Pete",
  "Pemba",
  "Pingwe",
  "Pongwe",
  "Regezo Mwendo",
  "Stone Town",
  "Tunguu",
  "Unguja Ukuu",
  "Uroa",
  "Zanzibar City"
];
const types = ["House", "Apartment", "Plot", "Business"];
const AllPropertiesPage = () => {
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleClick = (e) => {};
  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "#013a17"
        }}
      >
        <button
          style={{
            width: "50%",
            background: "#0b8b3a",
            height: "2.2rem",
            marginTop: "1rem",
            color: "white",
            letterSpacing: "1px"
          }}
          onClick={handleClick}
        >
          <p>Sale</p>
        </button>
        <button
          style={{
            width: "50%",
            background: "#0b8b3a",
            height: "2.2rem",
            marginTop: "1rem",
            color: "white",

            letterSpacing: "1px"
          }}
          onClick={handleClick}
        >
          Rent
        </button>
      </div>
      <div style={{ height: "100%", margin: "0 0" }}>
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "4.5rem",
            color: "white",
            background: "#013a17"
          }}
        >
          <section style={{ display: "flex", alignItems: "center" }}>
            <div>
              <BiMap style={{ fontSize: "1.1rem" }} />
            </div>
            <select
              name="Area"
              style={{
                background: "transparent",
                border: "none",
                borderRadius: "0",
                height: "100%",
                color: "white",
                margin: "0 0.5rem",
                fontSize: "0.9rem",
                borderBottom: "0.5px solid white",
                width: "130px"
              }}
            >
              <option>Hole Zanzibar</option>
              {villages?.map((el, i) => (
                <option key={i}>{el}</option>
              ))}
            </select>
          </section>
          <section style={{ display: "flex", alignItems: "center" }}>
            <div>
              <GiHouse />
            </div>
            <select
              name="Area"
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                height: "100%",
                margin: "0 0.5rem",
                fontSize: "0.9rem",
                width: "130px",
                fontSize: "0.9rem",
                borderBottom: "0.5px solid white",
                borderRadius: "0"
              }}
            >
              <option>All Types</option>
              {types?.map((el, i) => (
                <option key={i}>{el}</option>
              ))}
            </select>
          </section>
        </section>
      </div>
      <div style={{ height: "240px", overflow: "hidden" }}>
        <MapPage />
      </div>

      <Objects />
      <Faq />
      <Abovefooter />
    </section>
  );
};

export default AllPropertiesPage;
