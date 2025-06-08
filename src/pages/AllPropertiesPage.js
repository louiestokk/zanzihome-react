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
import {pageData} from '../pages/guides/data'
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
    title: "Properties Sale & Rent - Real Estate Zanzibar",
    description:
      "Discover Your Dream Property in Zanzibar - Properties for Sale and Rent in Zanzibar - Real Estate Zanzibar",
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
          {"Properties Sale & Rent - Real Estate Zanzibar"}
        </title>
        <meta
          name="description"
          content={
            "Discover Your Dream Property in Zanzibar - Properties for Sale and Rent in Zanzibar - Real Estate Zanzibar"
          }
        />
        <meta
          property="og:url"
          content="https://www.zanzihome.com/properties-zanzibar"
        />
        <meta
          property="og:description"
          content="Discover Your Dream Property in Zanzibar - Properties for Sale and Rent in Zanzibar - Real Estate Zanzibar"
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
      <div style={{height:'35px'}}></div>
         <h1
              style={{
                fontSize: "1.5rem",
                marginBottom: "0.5rem",
                marginLeft: "0.5rem"
              }}
            >
              {pageData.pageTitel}
            </h1>
            <div style={{ position: "relative" }}>
              <img
                src="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="buy property in Zanzibar"
                loading="lazy"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <article style={{ position: "absolute", top: "20%", left: "1.5%" }}>
                <h4
                  style={{
                    background: "white",
                    padding: "0.5rem",
                    borderRadius: "5px",
                    boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px"
                  }}
                >
                  {pageData.whitebannerText}
                </h4>
                <button
                  onClick={() => (window.location.href = "/")}
                  style={{
                    background: "black",
                    color: "white",
                    width: "10rem",
                    height: "2.2rem",
                    fontWeight: "bold"
                  }}
                >
                  {pageData.btntext}
                </button>
              </article>
            </div>
            <p
              style={{
                fontSize: "0.85rem",
                maxWidth: "1000px",
                margin: "0.5rem 0.5rem",
                lineHeight: "23px"
              }}
            >
              {pageData.underImgText}
            </p>
            <div
              style={{
                margin: "1rem 0.5rem"
              }}
            >
              <h3>{pageData.titleOne}</h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  maxWidth: "1000px",
                  margin: "0.5rem 0rem",
                  lineHeight: "23px"
                }}
              >
                {pageData.textOne}
              </p>
            </div>
            <div
              style={{
                margin: "1rem 0.5rem"
              }}
            >
              <h3>{pageData.titleTwo}</h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  maxWidth: "1000px",
                  margin: "0.5rem 0rem",
                  lineHeight: "23px"
                }}
              >
                {pageData.textTwo}
              </p>
              <article style={{ maxWidth: "1000px" }}>
                <h3 style={{ marginTop: "1rem" }}>
                  Step-by-step guide explaining what foreigners need to do to purchase
                  property in Zanzibar.
                </h3>
                <ul>
                  <li>
                    <strong>1. </strong>
                    Identify a reputable local real estate agent or lawyer who is
                    familiar with the buying process and can guide you through the
                    necessary steps.
                  </li>
                  <li>
                    <strong>2. </strong> Research the local real estate market and
                    identify suitable properties that meet your needs and budget.
                  </li>
                  <li>
                    <strong>3. </strong> Contact the seller and negotiate the purchase
                    price and terms of the sale.
                  </li>
                  <li>
                    <strong>4. </strong> Obtain a certificate of 'no objection' from
                    the Zanzibar Investment Promotion Authority (ZIPA) before
                    purchasing any property. This certificate confirms that the
                    property does not pose any security or other concerns, and is
                    typically obtained through your lawyer or agent.
                  </li>
                  <li>
                    <strong>5. </strong> Sign a Sales Agreement with the seller and
                    pay a deposit, typically 10% of the purchase price.
                  </li>
                  <li>
                    <strong>6. </strong> Hire a surveyor to conduct a property survey
                    and verify the boundaries and other details of the property.
                  </li>
                  <li>
                    <strong>7. </strong> Obtain an official valuation report of the
                    property from a licensed valuer, which is required by the Zanzibar
                    Revenue Board.
                  </li>
                  <li>
                    <strong>8. </strong> Apply for a Land Lease, which grants the
                    right to use the land on which the property is located for a
                    specified period of time. This lease is typically obtained through
                    your lawyer or agent.
                  </li>
                  <li>
                    <strong>9. </strong> Pay the 5% stamp duty fee on the purchase
                    price of the property, which is payable to the Zanzibar Revenue
                    Board and is typically collected by the seller on behalf of the
                    buyer.
                  </li>
                  <li>
                    <strong>10. </strong> Complete the purchase by paying the
                    remaining balance to the seller and transferring ownership of the
                    property to your name.
                  </li>
                </ul>
                <p
                  style={{
                    fontSize: "0.85rem",
                    maxWidth: "1000px",
                    margin: "0.5rem 0.5rem",
                    lineHeight: "23px"
                  }}
                >
                  Overall, purchasing property in Zanzibar as a foreigner involves
                  working with a local lawyer or real estate agent, obtaining a
                  certificate of no objection, paying stamp duty fees, and complying
                  with local regulations related to property ownership and use. With
                  careful research and guidance, however, buying real estate in
                  Zanzibar can be a rewarding investment opportunity.
                </p>
              </article>
            </div>
            <div style={{height:'30px'}}></div>
      <Abovefooter />
    </section>
  );
};

export default AllPropertiesPage;
