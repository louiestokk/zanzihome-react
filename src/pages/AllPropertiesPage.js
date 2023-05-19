import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Helmet } from "react-helmet-async";
import { db } from "../firebase";
import { BiMap } from "react-icons/bi";
import { GiHouse } from "react-icons/gi";
import Objects from "../components/Objects";
import MapPage from "./MapPage";
import Faq from "../components/Faq";
import Abovefooter from "../components/Abovefooter";
import AdBanner from "../components/AdBanner";
import {
  setFirestoreData,
  getFirestoreData
} from "../redux-toolkit/firebaseDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { villages } from "../utils/data";
import { faqdata } from "../utils/faq";
const types = ["House", "Apartment", "Hand", "Business"];
const AllPropertiesPage = () => {
  const [rent, setrent] = useState(false);
  const [sale, setsale] = useState(false);
  const [area, setArea] = useState(false);
  const [type, setType] = useState(false);
  const [memo, setMemo] = useState([]);
  const firestoreData = useSelector(getFirestoreData);
  const disptach = useDispatch();

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Perfect Slice in Paradise - Properties for Sale and Rent",
    description:
      "Discover Your Dream Property in Zanzibar - Properties for Sale and Rent",
    image:
      "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    datePublished: new Date("2023-05-01T09:25:01.340Z").toISOString(),
    author: {
      "@type": "Person",
      name: "Louie Stokk"
    }
  };

  const handleRentclick = () => {
    disptach(setFirestoreData(memo?.filter((el) => el.Rent === "Rent")));
    setrent(true);
    setsale(false);
  };

  const handleSaleClick = () => {
    disptach(setFirestoreData(memo?.filter((el) => el.Rent !== "Rent")));
    setsale(true);
    setrent(false);
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
    const newItems = firestoreData?.filter(
      (el) =>
        el.Area === e.target.value || el.Area === e.target.value.toUpperCase()
    );
    disptach(setFirestoreData(newItems));
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    const newItems = firestoreData?.filter(
      (el) => el.category === e.target.value
    );
    disptach(setFirestoreData(newItems));
  };

  const fetchFirestoreData = async () => {
    await getDocs(collection(db, "newAd")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setMemo(newData);
    });
  };

  useEffect(() => {
    fetchFirestoreData();
  }, [rent, sale, type, area]);

  return (
    <section>
      <script type="application/ld+json">
        {JSON.stringify(articleStructuredData)}
      </script>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {"Perfect Slice in Paradise - Properties for Sale and Rent"}
        </title>
        <meta
          name="description"
          content={
            "Discover Your Dream Property in Zanzibar - Properties for Sale and Rent"
          }
        />
        <meta
          property="og:url"
          content="https://www.zanzihome.com/properties-zanzibar"
        />
        <meta
          property="og:description"
          content="Discover Your Dream Property in Zanzibar - Properties for Sale and Rent"
        />
        <meta
          property="og:image"
          content="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <link
          rel="canonical"
          href="https://www.zanzihome.com/properties-zanzibar"
        />
      </Helmet>
      <div style={{ height: "250px", overflow: "hidden" }}>
        <MapPage zoom={7} />
      </div>
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
            background: sale ? "#22c55e" : "#0b8b3a",
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
            background: rent ? "#22c55e" : "#0b8b3a",
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
              <option>Whole Zanzibar</option>
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
      {(sale || rent) && type && area ? (
        <h1>{`${type === "Hand" ? "Land" : type} for ${
          sale ? "Sale" : "Rent"
        } in ${area}, Zanzibar`}</h1>
      ) : (
        <h1
          style={{
            fontSize: "1rem",
            marginTop: "1rem",
            marginLeft: "0.5rem",
            color: "#013a17",
            letterSpacing: "1px"
          }}
        >
          Properties for Sale & Rent in Zanzibar
        </h1>
      )}
      <Objects />
      <div className="adBanner-holder">
        <AdBanner />
      </div>
      <Faq data={faqdata} />
      <Abovefooter />
    </section>
  );
};

export default AllPropertiesPage;
