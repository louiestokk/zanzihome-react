import React, { useState } from "react";
import { BiMap } from "react-icons/bi";
import { GiHouse } from "react-icons/gi";
import Objects from "../components/Objects";
import MapPage from "./MapPage";
import Faq from "../components/Faq";
import Abovefooter from "../components/Abovefooter";
import Checkbox from "@material-ui/core/Checkbox";
import {
  setFirestoreData,
  getFirestoreData
} from "../redux-toolkit/firebaseDataSlice";
import { useDispatch, useSelector } from "react-redux";
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
  const [rent, setrent] = useState(false);
  const [sale, setsale] = useState(false);
  const firestoreData = useSelector(getFirestoreData);
  const disptach = useDispatch();
  const handleRentclick = () => {
    const newItems = firestoreData?.filter((el) => el.Rent === "Rent");
    disptach(setFirestoreData(newItems));
    setrent(true);
    setsale(false);
  };
  const handleSaleClick = () => {
    const newItems = firestoreData?.filter(
      (el) => el.Sell === null && el.Rent === null
    );
    disptach(setFirestoreData(newItems));
    setsale(true);
    setrent(false);
  };
  const handleAreaChange = (e) => {
    console.log(e.target.value.toUpperCase());
    const newItems = firestoreData?.filter(
      (el) =>
        el.Area === e.target.value || el.Area === e.target.value.toUpperCase()
    );
    disptach(setFirestoreData(newItems));
  };
  const handleTypeChange = (e) => {};
  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "#013a17"
        }}
      >
        {/* #22c55e */}
        <button
          style={{
            width: "50%",
            background: sale ? "#22c55e " : "#0b8b3a",
            height: "2.2rem",
            marginTop: "1rem",
            color: "white",
            letterSpacing: "1px"
          }}
          onClick={handleSaleClick}
        >
          <p>Sale</p>
        </button>
        <button
          style={{
            width: "50%",
            background: rent ? "#22c55e " : "#0b8b3a",
            height: "2.2rem",
            marginTop: "1rem",
            color: "white",

            letterSpacing: "1px"
          }}
          onClick={handleRentclick}
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
              onChange={handleAreaChange}
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
              onChange={handleTypeChange}
            >
              <option>All Types</option>
              {types?.map((el, i) => (
                <option key={i}>{el}</option>
              ))}
            </select>
          </section>
        </section>
      </div>
      <h1>properties for sale / rent area</h1>
      <div style={{ height: "300px", overflow: "hidden" }}>
        <MapPage />
      </div>

      <Objects />
      <Faq />
      <Abovefooter />
    </section>
  );
};

export default AllPropertiesPage;
