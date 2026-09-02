import React from "react";
import BannerSection from "../components/BannerSection";
import NewFilter from "../components/newfilter/NewFilter";
import Popular from "../components/Popular";
import Faq from "../components/Faq";
import AdBanner from "../components/AdBanner";
import MatchRequestStepper from "../components/MatchRequestStepper";
import { faqdata } from "../utils/faq";
import AgencyPromoBanner from "../components/AgencyPromoBanner";
import LatestApartments from "../components/LatestApartments";
import LatestHouses from "../components/LatestHouses";
import LatestBusiness from "../components/LatestBusiness";
import PartnerFeaturedSection from "../components/PartnerFeaturedSection";
import CoccolagoonFeaturedSection from "../components/CoccolagoonFeaturedSection";

const propertyzanzibar = ({ initialProperties }) => {
  return (
    <div>
      <NewFilter />
      <BannerSection />
<div style={{marginTop:'50px'}}>
     <Popular
        title={"Featured Properties in Zanzibar"}
        images={[
              {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2F1788375016732_restaurant-for-sale-paje-zanzibar.png?alt=media&token=1d9d45ac-b546-42eb-a09e-57b4ba735338",
              imgText: "Established Fast-Food Restaurant for Sale in Prime Paje Location",
              adId: Number(621136943),
              type: "Business",
              price: "from $35,000",
              size: "50",
              rooms:'2'
            },
              {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fapartments-real-estate-zanzibar.webp?alt=media&token=99fb74d9-cc6c-40bf-a697-d48b014e1f97",
              imgText: "Luxury apartments in the Heart of Zanzibar - Paje",
              adId: Number(550389000),
              type: "Apartments",
              price: "from $75,000",
              size: "48-120",
              rooms:'1 to 4'
            },
                                  {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2F1786204061318_aura-garden-view-02.webp?alt=media&token=39c6be93-b47f-4c44-ab69-b038e1bb247e",
              imgText: "HIgh ROI Beachfront living in Paje ",
              adId: Number(788913793),
              type: "Apartments",
              price: "$95-210,000",
              size: "46-110",
              rooms:'1 to 3'
            },
                                 {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fplot-sale-paje.jpeg?alt=media&token=ee3a2c2a-c6cc-4926-a81c-393e7133b65c",
              imgText: "PRIME ROADSIDE INVESTMENT LAND FOR SALE – PAJE–JAMBIANI",
              adId: Number(218752271),
              type: "Plot",
              price: "$395.000",
              size: "6451",
              rooms:0
            },
                          {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fbusiness-jambiani.webp?alt=media&token=ea61d850-ed15-441f-97f8-4c3b892a7885",
              imgText: "COMMERCIAL & HOSPITALITY INVESTMENT PROPERTY – JAMBIANI",
              adId: Number(363634436),
              type: "Business",
              price: "$600.000",
              size: "8365",
              rooms:0
            },
                             {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fhotel-sale.png?alt=media&token=d80f1357-8e5c-4d73-a3e3-1591e8f18ad0",
              imgText: "Luxury Coastal Hotel Investment in Prime Beach District, Kendwa",
              adId: Number(373041655),
              type: "Hotel",
              price: "$875.000",
              size: "3000",
              rooms:0
            },
                           {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fplot-bwejuu.webp?alt=media&token=453e385d-9703-4821-9b62-4a97a3256311",
              imgText: "5,000 SQM Fantastic Prime Land in Bwejuu",
              adId: Number(491630589),
              type: "Plot",
              price: "$50.000",
              size: "5000",
              rooms:0
            },
                          {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FMakunduchi-plot.webp?alt=media&token=5b87d631-9a9e-4b7e-a606-0c84379cd5c5",
              imgText: "Prime Cliff-Front Ocean Land | Makunduchi",
              adId: Number(905192344),
              type: "Plot",
              price: "$550.000",
              size: "8500",
              rooms:0
            },
                              {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FIMG_4279.png?alt=media&token=da47d065-946b-4dc8-9fc3-5d5253927640",
              imgText: "Oceanview Land with Private Shoreline in Kidoti, Nungwi",
              adId: Number(414112080),
              type: "Plot",
              price: "$795.000",
              size: "10000",
              rooms:0
            },
                                {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FIMG_4280.png?alt=media&token=9ebb9592-6099-4a14-833a-9f09df191161",
              imgText: "Roadside Development Plot Near the Coast, Shungi",
              adId: Number(165083046),
              type: "Plot",
              price: "$600.000",
              size: "16000",
              rooms:0
            },
                  {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FIMG_0552.jpeg?alt=media&token=68935c61-785b-4baa-9016-65023f295afa",
              imgText: "HIgh ROI Beachfront living in Paje",
              adId: Number(788913793),
              type: "Apartments",
              price: "$210,000",
              size: "110",
              rooms: 3
            },
                {
              url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FIMG_0965.jpeg?alt=media&token=4d3a0942-323f-4499-aede-38a458858827",
              imgText: "Prime Investment Plot - DONGWE",
              adId: Number(64383849),
              type: "Plot",
              price: "$275,000",
              size: "11000",
              rooms: 0
            },
             {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FIMG_3080.jpeg?alt=media&token=49589f26-6b0a-4736-98c6-396dc681dc9d",
            imgText: "Central Apartment Paje",
            adId: Number(498610417),
            type: "Apartment",
            price: "$550/month",
            size: "55",
            rooms: 2
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2F44E71F23-2098-4D81-B2E4-116345638B9E.jpeg?alt=media&token=7714cb00-23b7-4f23-bdb1-98bcef7ecf53",
            imgText: "Beachfront plot for sale in Zanzibar",
            adId: Number(624688142),
            type: "Plot",
            price: "$120,000",
            size: "1200"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fmichamvi.jpg?alt=media&token=5d8e4bb0-d3e7-4253-97c0-0ee2133bf4b6",
            imgText: "Plot for sale in Michamvi Zanzibar",
            adId: Number(801410),
            type: "Plot",
            price: "$85,000",
            size: "900"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fyhouse2.jpg?alt=media&token=4b06691f-8afd-418f-bce7-f972cc5143a5",
            imgText: "Villa for rent in Zanzibar",
            adId: Number(338429),
            type: "Rent",
            price: "$1,800/month",
            size: "300",
            rooms: 4
          }
        ]}
      />
</div>
{/* <CoccolagoonFeaturedSection /> */}
<div style={{ height: "50px" }}></div>
<PartnerFeaturedSection />
<LatestApartments initialProperties={initialProperties} />
<LatestHouses initialProperties={initialProperties} />
<LatestBusiness initialProperties={initialProperties} />
<div style={{ padding: "0 15px 40px 15px" }}>
  <MatchRequestStepper />
</div>
<section style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
  <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "20px", textAlign: "center" }}>
    Explore Top Zanzibar Areas
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
      textAlign: "center"
    }}
  >
    <a title="real estate Paje" href="/properties/area/paje" style={{textDecoration:'none',color:'inherit'}}>
     <div style={{ padding: "20px", borderRadius: "10px", background: "#f9f9f9", transition: "transform 0.3s", cursor: "pointer" }}>
      <img src="https://i.ibb.co/Xxz2sDwV/real-estate-paje.webp" alt="real estate Paje" style={{ borderRadius: "8px", marginBottom: "10px", width: "100%", height: "120px", objectFit: "cover" }} />
      <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Paje</h3>
      <p style={{ fontSize: "15px", color: "#555" }}>Ideal for beachfront villas and kite-surfing rentals.</p>
    </div>
    </a>
   
    <a title="real estate Nungwi" href="/properties/area/nungwi" style={{textDecoration:'none',color:'inherit'}}>
      <div style={{ padding: "20px", borderRadius: "10px", background: "#f9f9f9", transition: "transform 0.3s", cursor: "pointer" }}>
      <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&h=120" alt="real estate Nungwi" style={{ borderRadius: "8px", marginBottom: "10px", width: "100%", height: "120px", objectFit: "cover" }} />
      <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Nungwi</h3>
      <p style={{ fontSize: "15px", color: "#555" }}>Popular tourist destination with high rental demand.</p>
    </div>
    </a>
   <a title="real estate Stone Town" href="/properties/area/stone-town" style={{textDecoration:'none',color:'inherit'}}>
    <div style={{ padding: "20px", borderRadius: "10px", background: "#f9f9f9", transition: "transform 0.3s", cursor: "pointer" }}>
      <img src="https://i.ibb.co/MkQqpbB1/real-estate-stone-town.jpg" alt="Real Estate Stone Town" style={{ borderRadius: "8px", marginBottom: "10px", width: "100%", height: "120px", objectFit: "cover" }} />
      <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Stone Town</h3>
      <p style={{ fontSize: "15px", color: "#555" }}>Cultural center with historic properties and charming streets.</p>
    </div>
   </a>
   
<a title="real estate Jambiani" href="/properties/area/jambiani" style={{textDecoration:'none',color:'inherit'}}>
 <div style={{ padding: "20px", borderRadius: "10px", background: "#f9f9f9", transition: "transform 0.3s", cursor: "pointer" }}>
      <img src="https://i.ibb.co/DgKcK2hF/real-estate-jambiani.jpg" alt="Real Estate Jambiani" style={{ borderRadius: "8px", marginBottom: "10px", width: "100%", height: "120px", objectFit: "cover" }} />
      <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Jambiani</h3>
      <p style={{ fontSize: "15px", color: "#555" }}>Peaceful village, perfect for holiday rentals and beachfront homes.</p>
    </div>
 </a>
   
<a title="real estate Kendwa" href="/properties/area/kendwa" style={{textDecoration:'none',color:'inherit'}}>
  <div style={{ padding: "20px", borderRadius: "10px", background: "#f9f9f9", transition: "transform 0.3s", cursor: "pointer" }}>
      <img src="https://i.ibb.co/Nn2cSgCj/real-estate-kendwa.jpg" alt="Real Estate Kendwa" style={{ borderRadius: "8px", marginBottom: "10px", width: "100%", height: "120px", objectFit: "cover" }} />
      <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Kendwa</h3>
      <p style={{ fontSize: "15px", color: "#555" }}>Vibrant nightlife and beautiful beaches attract investors and tourists.</p>
    </div>
 </a>
<a title="real estate Bwejuu" href="/properties/area/bwejuu" style={{textDecoration:'none',color:'inherit'}}>
   <div style={{ padding: "20px", borderRadius: "10px", background: "#f9f9f9", transition: "transform 0.3s", cursor: "pointer" }}>
      <img src="https://i.ibb.co/mFqDnf6L/real-estate-bwejuu.webp" alt="Real Estate Bwejuu" style={{ borderRadius: "8px", marginBottom: "10px", width: "100%", height: "120px", objectFit: "cover" }} />
      <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Bwejuu</h3>
      <p style={{ fontSize: "15px", color: "#555" }}>Quiet area, ideal for families and long-term rentals.</p>
    </div>
</a>
  </div>
</section>
<AgencyPromoBanner />
<section style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
  <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "20px"}}>
    Your Ultimate Guide to Real Estate in Zanzibar
  </h2>

  <p style={{ lineHeight: "26px", color: "#333", marginBottom: "20px" }}>
    Zanzibar is one of the fastest-growing real estate markets in East Africa. 
    With its pristine beaches, rich culture, and growing tourism, the island offers 
    unique opportunities for both investors and homebuyers. Whether you are looking 
    for a beachfront villa, a cozy apartment, or a plot for long-term development, 
    Zanzibar has it all.
  </p>

  <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "15px" }}>
    Why Invest in Zanzibar Property?
  </h3>
  <ul style={{ lineHeight: "1.8", color: "#555", marginBottom: "20px" }}>
    <li>Strong tourism growth creating high rental demand and solid ROI.</li>
    <li>Affordable property prices compared to other beach destinations worldwide.</li>
    <li>Variety of property types: villas, apartments, plots, commercial properties.</li>
    <li>Government initiatives supporting foreign investment and long-term leases.</li>
    <li>Beautiful landscapes and vibrant culture attracting holidaymakers year-round.</li>
  </ul>

  <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "15px" }}>
    Popular Areas to Buy Property
  </h3>
  <p style={{ lineHeight: "26px", color: "#333", marginBottom: "20px" }}>
    Each area in Zanzibar has its own charm and investment potential:
  </p>

  <ul style={{ lineHeight: "1.8", color: "#555", marginBottom: "20px" }}>
    <li><strong>Paje:</strong> Famous for kite surfing, beach bars, and vibrant vacation rentals.</li>
    <li><strong>Nungwi:</strong> Bustling tourist hotspot with stunning sunsets and premium villas.</li>
    <li><strong>Stone Town:</strong> UNESCO World Heritage Site, perfect for historic properties and boutique hotels.</li>
    <li><strong>Jambiani:</strong> Calm fishing village with relaxed lifestyle and beachfront cottages.</li>
    <li><strong>Kendwa:</strong> Ideal for nightlife lovers and luxury holiday homes.</li>
    <li><strong>Bwejuu:</strong> Family-friendly, quiet beaches, and long-term rental potential.</li>
    <li><strong>Michamvi:</strong> Emerging area with good value plots and development opportunities.</li>
    <li><strong>Fumba:</strong> Eco-friendly community with growing real estate projects.</li>
    <li><strong>Kizimkazi:</strong> Known for dolphins, peaceful beaches, and villa investments.</li>
  </ul>

  <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "15px" }}>
    Tips for Buyers
  </h3>
  <p style={{ lineHeight: "26px", color: "#333", marginBottom: "20px" }}>
    Before purchasing a property in Zanzibar:
  </p>
  <ul style={{ lineHeight: "1.8", color: "#555", marginBottom: "20px" }}>
    <li>Check lease terms if you are a foreign buyer; most properties allow up to 99-year leases.</li>
    <li>Consider proximity to beaches, amenities, and tourist hotspots.</li>
    <li>Work with verified agents to ensure safe and legal transactions.</li>
    <li>Plan for property management if you intend to rent out your investment.</li>
    <li>Research upcoming infrastructure projects for long-term value growth.</li>
  </ul>

  <p style={{ lineHeight: "26px", color: "#333", marginTop: "20px" }}>
    With the right guidance, investing in Zanzibar property can be a rewarding venture. 
    ZanziHome connects you with verified listings, trusted agents, and expert advice to make 
    your property journey smooth and successful.
  </p>
</section>
        <section style={{ marginTop: 20,marginLeft:16 }}>
        <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>House for sale in Zanzibar</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 }}>
          <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/house/paje"
          >
            House for sale Paje
          </a>
           <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/house/jambiani"
          >
            House for sale Jambiani
          </a>
            <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/house/nungwi"
          >
            House for sale Nungwi
          </a>
            <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/house/stone-town"
          >
            House for sale Stone Town
          </a>
               <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/house/bwejuu"
          >
            House for sale Bwejuu
          </a>
            <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/house/michamvi"
          >
            House for sale Michamvi
          </a>
        </div>
      </section>
         <section style={{ marginTop: 40,marginLeft:16 ,marginBottom:'60px'}}>
        <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>Apartments in Zanzibar</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 }}>
          <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/apartment/kizimkazi"
          >
            Apartments in Kizimkazi
          </a>
           <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/apartment/jambiani"
          >
            Apartments in Jambiani
          </a>
            <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/apartment/nungwi"
          >
            Apartments in Nungwi
          </a>
            <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/apartment/stone-town"
          >
             Apartments in Stone Town
          </a>
               <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/apartment/fumba"
          >
             Apartments in Fumba
          </a>
            <a
            style={{ fontSize:'0.9rem', color:'inherit',textDecoration:'underline' }}
           href="https://www.zanzihome.com/buy/apartment/michamvi"
          >
             Apartments in Michamvi
          </a>
        </div>
      </section>
      <AdBanner />
      <div style={{width:'100%',textAlign:'center',padding:'1rem',marginTop:'40px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h2>Why Zanzibar Property is an Attractive Investment</h2>
<p style={{marginTop:'0.3rem',lineHeight:'26px',maxWidth:'92%'}}>
  Zanzibar’s real estate market has seen strong growth due to increasing tourism,
  infrastructure improvements, and rising demand for holiday homes and rentals.
  Unlike many other beachfront destinations, prices remain relatively affordable
  while offering solid rental income potential.
</p>
 </div>
 <div style={{width:'100%',textAlign:'center',padding:'1rem',marginTop:'1rem',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
  <h2>Property Prices in Zanzibar — What to Expect</h2>
<p style={{marginTop:'0.3rem',lineHeight:'26px',maxWidth:'92%'}}>
  Prices vary by location, size and type of property. In central areas like
  Stone Town and Nungwi, land and villas command premium pricing due to
  proximity to beaches and amenities. Plots in up‑and‑coming areas like Michamvi
  offer value for long‑term investors.
</p>
 </div>
   
       <Faq data={faqdata} />
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <h2 className="poppins" style={{ maxWidth: "85%", margin: "1rem auto" }}>
          Real Estate in Zanzibar – Buy, Sell & Rent Properties
        </h2>

        <p
          className="sans"
          style={{
            maxWidth: "90%",
            margin: "0rem auto",
            lineHeight: "26px",
            color: "black"
          }}
        >
          ZanziHome is the leading platform for real estate in Zanzibar. 
          Discover houses for sale in Zanzibar, apartments for rent, beachfront villas, 
          land for investment and commercial properties across the island.

          Whether you are looking to buy property in Zanzibar, invest in land, 
          or find a house for rent, ZanziHome connects you with the best real estate opportunities.

          Explore popular areas such as Nungwi, Kendwa, Paje, Jambiani and Stone Town. 
          Our listings include verified properties with real photos, detailed descriptions 
          and direct contact with property owners and agents.

          Start your property search today and find your dream home in Zanzibar.
        </p>

        {/* TRUST */}
        <div style={{ margin: "2rem 0" }}>
          <h2 className="best-airmax-text">Trusted by Property Seekers</h2>
          <p>
            Based on <strong>1540+ reviews</strong>
          </p>
          <img
            src="https://www.snijpunt.com/files/thumbnails/trustpilot-logo-snijpunt.1600x680x1.png"
            alt="trustpilot"
            style={{ height: "120px", width: "300px", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default propertyzanzibar;