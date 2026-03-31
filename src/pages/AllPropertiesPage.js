import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Helmet } from "react-helmet-async";
import { db } from "../firebase";
import { BiMap } from "react-icons/bi";
import { GiHouse } from "react-icons/gi";
import Objects from "../components/Objects";
import Popular from "../components/Popular";
import MapPage from "./MapPage";
import Faq from "../components/Faq";
import Abovefooter from "../components/Abovefooter";
import AdBanner from "../components/AdBanner";
import { setFirestoreData, getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { villages } from "../utils/data";
import { faqdata } from "../utils/faq";
import { pageData } from '../pages/guides/data';

const types = ["House", "Apartment", "Land", "Business"];

const AllPropertiesPage = () => {
  const [rent, setRent] = useState(false);
  const [sale, setSale] = useState(false);
  const [area, setArea] = useState("Whole Zanzibar");
  const [type, setType] = useState("All Types");
  const [memo, setMemo] = useState([]);
  const firestoreData = useSelector(getFirestoreData);
  const dispatch = useDispatch();

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": "ZanziHome Properties - Sale & Rent in Zanzibar",
    "url": "https://www.zanzihome.com/properties-zanzibar",
    "description": "Browse and find houses, apartments, villas, land and commercial properties for sale or rent in Zanzibar. Get featured listings and boost your property visibility with ZanziHome.",
    "image": "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "author": {
      "@type": "Organization",
      "name": "ZanziHome"
    },
    "mainEntityOfPage": "https://www.zanzihome.com/properties-zanzibar"
  };

  const fetchFirestoreData = async () => {
    const querySnapshot = await getDocs(collection(db, "newAd"));
    const newData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setMemo(newData);
    dispatch(setFirestoreData(newData));
  };

  useEffect(() => {
    fetchFirestoreData();
  }, []);

  const handleRentClick = () => {
    dispatch(setFirestoreData(memo.filter(el => el.Rent === "Rent")));
    setRent(true);
    setSale(false);
  };

  const handleSaleClick = () => {
    dispatch(setFirestoreData(memo.filter(el => el.Rent !== "Rent")));
    setSale(true);
    setRent(false);
  };

  const handleAreaChange = e => {
    setArea(e.target.value);
    const newItems = firestoreData.filter(el =>
      el.Area === e.target.value || el.Area === e.target.value.toUpperCase()
    );
    dispatch(setFirestoreData(newItems));
  };

  const handleTypeChange = e => {
    setType(e.target.value);
    const newItems = firestoreData.filter(el => el.category === e.target.value);
    dispatch(setFirestoreData(newItems));
  };

  return (
    <section style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* SCHEMA */}
      <script type="application/ld+json">
        {JSON.stringify(articleStructuredData)}
      </script>

      {/* SEO */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Properties for Sale & Rent in Zanzibar | ZanziHome</title>
        <meta name="description" content="Discover houses, villas, apartments, land and commercial properties for sale or rent in Zanzibar. Get featured listings and boost your property visibility." />
        <meta property="og:url" content="https://www.zanzihome.com/properties-zanzibar" />
        <meta property="og:title" content="Properties for Sale & Rent in Zanzibar | ZanziHome" />
        <meta property="og:description" content="Browse Zanzibar real estate including beachfront villas, apartments, land and commercial properties. Featured listings available." />
        <meta property="og:image" content="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg" />
        <link rel="canonical" href="https://www.zanzihome.com/properties-zanzibar" />
      </Helmet>
 <h1 style={{ fontSize: "1.3rem", color: "#013a17",marginTop:'20px',marginLeft:'1rem',marginBottom:'0.2rem' }}>
  {type !== "All Types" || area !== "Whole Zanzibar" || sale || rent
    ? `${type !== "All Types" ? type : "Properties"} ${
        sale ? "for Sale" : rent ? "for Rent" : "for Sale & Rent"
      } in ${area !== "Whole Zanzibar" ? area : "Zanzibar"}`
    : "Properties for Sale & Rent in Zanzibar"}
</h1>
<p style={{marginLeft:'1rem',fontSize:'0.9rem',marginRight:'1rem'}}>Explore real estate in Zanzibar including houses, villas, apartments, land and commercial properties for sale and rent.</p>
      {/* MAP */}
      <div style={{ height: "300px", overflow: "hidden" }}>
        <MapPage zoom={7} />
      </div>

      {/* SALE / RENT FILTER */}
      <div style={{ display: "flex", justifyContent: "center", background: "#013a17" }}>
        <button
          style={{
            width: "50%",
            background: sale ? "#22c55e" : "#0b8b3a",
            height: "2.5rem",
            marginTop: "1rem",
            color: "white",
            letterSpacing: "1px",
            fontWeight: "600"
          }}
          onClick={handleSaleClick}
        >
          Sale
        </button>
        <button
          style={{
            width: "50%",
            background: rent ? "#22c55e" : "#0b8b3a",
            height: "2.5rem",
            marginTop: "1rem",
            color: "white",
            letterSpacing: "1px",
            fontWeight: "600"
          }}
          onClick={handleRentClick}
        >
          Rent
        </button>
      </div>

      {/* AREA + TYPE FILTER */}
      <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", background: "#013a17", height: "4.5rem", color: "white" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <BiMap style={{ fontSize: "1.2rem", marginRight: "0.3rem" }} />
          <select value={area} onChange={handleAreaChange} style={{ background: "transparent", border: "none", color: "white", height: "100%", fontSize: "0.9rem", borderBottom: "0.5px solid white", marginRight: "1rem", width: "140px" }}>
            <option>Whole Zanzibar</option>
            {villages.map((el, i) => <option key={i}>{el}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <GiHouse style={{ fontSize: "1.2rem", marginRight: "0.3rem" }} />
          <select value={type} onChange={handleTypeChange} style={{ background: "transparent", border: "none", color: "white", height: "100%", fontSize: "0.9rem", borderBottom: "0.5px solid white", width: "140px" }}>
            <option>All Types</option>
            {types.map((el, i) => <option key={i}>{el}</option>)}
          </select>
        </div>
      </div>

      {/* DYNAMIC H1 */}
 
<div style={{marginTop:'50px'}}>
     <Popular
        title={"Featured Properties in Zanzibar"}
        images={[
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2F44E71F23-2098-4D81-B2E4-116345638B9E.jpeg?alt=media&token=7714cb00-23b7-4f23-bdb1-98bcef7ecf53",
            imgText: "Beachfront plot for sale in Zanzibar",
            adId: Number(624688142),
            type: "Plot"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fmichamvi.jpg?alt=media&token=5d8e4bb0-d3e7-4253-97c0-0ee2133bf4b6",
            imgText: "Plot for sale in Michamvi Zanzibar",
            adId: Number(801410),
            type: "Plot"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FFE741E1B-C0CF-46D2-B772-162CF9A28BBD.jpeg?alt=media&token=6144208c-93ee-46ab-9449-658234545b22",
            imgText: "Hotel property for rent in Zanzibar",
            adId: Number(382045),
            type: "Business"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fyhouse2.jpg?alt=media&token=4b06691f-8afd-418f-bce7-f972cc5143a5",
            imgText: "Villa for rent in Zanzibar",
            adId: Number(338429),
            type: "Rent"
          }
        ]}
      />
</div>
     <h2 style={{ fontSize: "1.3rem", margin: "1rem 1rem", color: "#013a17" }}>
  {type !== "All Types" || area !== "Whole Zanzibar" || sale || rent
    ? `${type !== "All Types" ? type : "Properties"} ${
        sale ? "for Sale" : rent ? "for Rent" : "for Sale & Rent"
      } in ${area !== "Whole Zanzibar" ? area : "Zanzibar"}`
    : "Properties for Sale & Rent in Zanzibar"}
</h2>
      <Objects />

      {/* BOOST CTA MID-LIST */}
      <div style={{ background: "#ffeeba", padding: "1.5rem", textAlign: "center", margin: "2rem 0", borderRadius: "8px" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Sell or Rent Faster!</h2>
        <p style={{ marginBottom: "1rem" }}>Boost your property listing and get maximum visibility on ZanziHome.</p>
        <button onClick={() => window.location.href = "/contact"} style={{ padding: "0.8rem 1.5rem", background: "#013a17", color: "white", border: "none", borderRadius: "5px", fontWeight: "600", cursor: "pointer" }}>
          Boost Your Listing
        </button>
      </div>

      {/* AD BANNER */}

      {/* FAQ SECTION */}
      <Faq data={faqdata} />

      {/* SEO CONTENT */}
      <div
  style={{
    padding: "2rem 1rem",
    maxWidth: "1100px",
    margin: "0 auto",
    fontFamily: "Poppins, sans-serif"
  }}
>
  <h2
    style={{
      fontSize: "1.8rem",
      fontWeight: "700",
      marginBottom: "0.5rem",
      color: "#013a17"
    }}
  >
    Zanzibar Real Estate Listings
  </h2>

  <p
    style={{
      fontSize: "1rem",
      color: "#555",
      lineHeight: "1.8",
      maxWidth: "750px"
    }}
  >
    Explore houses, villas, apartments, land and commercial properties across Zanzibar. 
    Find your dream home or investment property quickly with ZanziHome.
  </p>

  {/* GRID */}
    <h3 style={{marginTop:'20px'}}>Why Choose ZanziHome?</h3>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "16px",
      marginTop: "2rem"
    }}
  >
    {[
      "Verified properties with real photos",
      "Direct contact with owners & agents",
      "Boosted listings = faster sales",
      "Full coverage of Zanzibar hotspots"
    ].map((text, i) => (
      <div
        key={i}
        style={{
          background: "white",
          padding: "1.2rem",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "flex-start",
          gap: "10px"
        }}
      >
        {/* CHECK ICON */}
        <div
          style={{
            minWidth: "26px",
            height: "26px",
            borderRadius: "50%",
            background: "#22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "14px"
          }}
        >
          ✓
        </div>

        <p
          style={{
            margin: 0,
            fontSize: "0.95rem",
            color: "#333",
            lineHeight: "1.6"
          }}
        >
          {text}
        </p>
      </div>
    ))}
  </div>

  {/* CTA TEXT */}
  <div
    style={{
      marginTop: "2.5rem",
      padding: "1.5rem",
      background: "#f8faf8",
      borderRadius: "12px",
      textAlign: "center",
      boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
    }}
  >
    <p
      style={{
        fontSize: "1rem",
        color: "#444",
        marginBottom: "0.5rem"
      }}
    >
      Start your property search today
    </p>

    <h3
      style={{
        fontSize: "1.4rem",
        fontWeight: "700",
        color: "#013a17"
      }}
    >
      Discover why ZanziHome is the #1 real estate platform in Zanzibar
    </h3>
  </div>
</div>

      {/* ABOVE FOOTER */}
        <div style={{ margin: "1rem 0" }}>
        <AdBanner />
      </div>
 <Abovefooter />
    </section>
  );
};

export default AllPropertiesPage;