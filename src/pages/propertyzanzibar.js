import React from "react";
import { Helmet } from "react-helmet-async";
import BannerSection from "../components/BannerSection";
import NewFilter from "../components/newfilter/NewFilter";
import CategoryImageIcons from "../components/CategoryImageIcons";
import Popular from "../components/Popular";
import Faq from "../components/Faq";
import { faqdata } from "../utils/faq";
import { topratedsafar } from "../utils/lankar";
const propertyzanzibar = () => {
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Zanzihome - Buy, Sell & Rent Property in Zanzibar, Vehicles & Tours in Zanzibar",
    description:
      "Find properties in Zanzibar, accommodation, rent scooter and car in Zanzibar or book tours, taxis and safaris in Zanzibar! - Real Estate Zanzibar",
    image:
      "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    datePublished: new Date("2023-04-04T09:25:01.340Z").toISOString(),
    author: {
      "@type": "Person",
      name: "Louie Stokk"
    }
  };
  return (
    <div>
      <div>
        <script type="application/ld+json">
          {JSON.stringify(articleStructuredData)}
        </script>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{"Zanzihome - Buy, Sell & Rent Property in Zanzibar, Vehicles & Tours in Zanzibar"}</title>
        <meta
          name="description"
          content={
            "Find properties in Zanzibar, accommodation, rent scooter and car in Zanzibar or book tours, taxis and safaris in Zanzibar! - Real Estate Zanzibar"
          }
        />
        <meta property="og:url" content="https://www.zanzihome.com" />
        <meta
          property="og:description"
          content="Find properties in Zanzibar, accommodation, rent scooter and car in Zanzibar or book tours, taxis and safaris in Zanzibar! - Real Estate Zanzibar"
        />
        <meta
          property="og:image"
          content="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
      </Helmet>
      <NewFilter />
      <CategoryImageIcons />
      <BannerSection />
      <Popular
        title={"Popular Tours & Safaris"}
        images={[
          {
            url: "https://imgs.mongabay.com/wp-content/uploads/sites/20/2019/05/17064151/ZanzibarRedColobus_JozaniTanzania_HasinShakurWikicommonsGFDL1.2-768x512.jpg",
            imgText: "Jozani Forest",
            type:'Tours'
          },
          {
            url: "https://tuliazanzibar.com/wp-content/uploads/2019/09/IMG_0698.jpg",
            imgText: "Prison Island",
              type:'Tours'
          },
          {
            url: "https://i.ibb.co/fV1cLNPS/snorkeling-mneba.jpg",
            imgText: "Dolphin Tour",
              type:'Tours'
          },
          {
            url: "https://www.focuseastafricatours.com/wp-content/uploads/zanzibar-spice1.jpg",
            imgText: "Spice Tour",
              type:'Tours'
          }
        ]}
      />
      <Popular
        title={"Featured Vehicle"}
        images={[
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FWhiteRush%20(1).JPG?alt=media&token=db1a9f40-acec-4144-82c1-5fe7d56e0bdf",
            imgText: "Toyota Rush",
            id: "x9WjYlJbF3aHwbcvJiFM",
            type: "Vehicle"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2F4.1-Honda-XL-250-671X333.jpg?alt=media&token=c4d707cd-593d-4a83-a107-4f43c4931045",
            imgText: "Honda XL 250cc",
            id: "tIIZIHH4XnnMGRXF5oiD",
            type: "Vehicle"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FToyota-rav4-900x600.jpeg?alt=media&token=1e6981c1-e140-4343-820d-b22391c38648",
            imgText: "Toyota Rav4",
            id: "OtStER3Ja1mBOa8PVK8W",
            type: "Vehicle"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Frent%20scooter%20zanzibar.jpg?alt=media&token=3205b51f-ddc4-4d64-828b-fb4037694b1b",
            imgText: "Honda Click 125",
            id: "E5GvnkSLGD6sNeWicgip",
            type: "Vehicle"
          }
        ]}
      />
      <Popular
        title={"Featured Properties"}
        images={[
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2F44E71F23-2098-4D81-B2E4-116345638B9E.jpeg?alt=media&token=7714cb00-23b7-4f23-bdb1-98bcef7ecf53",
            imgText: "Beach front plot in Kidoti",
            adId: Number(624688142),
            type: "Properties"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fmichamvi.jpg?alt=media&token=5d8e4bb0-d3e7-4253-97c0-0ee2133bf4b6",
            imgText: "Big Beach Plot Michamvi",
            adId: Number(801410),
            type: "Properties"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2FFE741E1B-C0CF-46D2-B772-162CF9A28BBD.jpeg?alt=media&token=6144208c-93ee-46ab-9449-658234545b22",
            imgText: "Hotel for rent Paje",
            adId: Number(382045),
            type: "Properties"
          },
          {
            url: "https://firebasestorage.googleapis.com/v0/b/homenet-47307.appspot.com/o/files%2Fyhouse2.jpg?alt=media&token=4b06691f-8afd-418f-bce7-f972cc5143a5",
            imgText: "Villa for rent Paje",
            adId: Number(338429),
            type: "Properties"
          }
        ]}
      />
        <div className={'testmRoot'}>
    <h2 className="yepyeptitle" style={{marginBottom:'0.7rem'}}>Recently Booked Tours</h2>
        <div className={'testmiCont'}>
            {topratedsafar?.map((el,i)=>(
                <div key={i}>
                <a className={'tesmoLinks'} href={el.path} title={el.identifyer}>
                    {el.identifyer} |
                </a>
                </div>
            ))}
        </div>
        {/* <div style={{height:'50px'}}></div>
        <h2 style={{marginBottom:'0.7rem'}}>Popular Accommodation</h2>
        <div className={'testmiCont'}>
            {topratedsafar?.map((el,i)=>(
                <div key={i}>
                <a style={{color:'#1d3a3c'}} className={'tesmoLinks'} href={el.path} title={el.identifyer}>
                    {el.identifyer} |
                </a>
                </div>
            ))}
        </div>
        <div style={{height:'50px'}}></div>
        <h2 style={{marginBottom:'0.7rem'}}>Car/Scooter Rental</h2>
        <div className={'testmiCont'}>
            {topratedsafar?.map((el,i)=>(
                <div key={i}>
                <a className={'tesmoLinks'} href={el.path} title={el.identifyer}>
                    {el.identifyer} |
                </a>
                </div>
            ))}
        </div> */}
    </div>
      <div style={{height:'15px'}}></div>
       <Faq data={faqdata} />
       <div style={{height:'20px'}}></div>
         <div style={{ textAlign: "center",marginTop:'1rem'}}>
      <h2 className="poppins" style={{ maxWidth: "85%", margin: "1rem auto" }}>
        Your All-in-One Platform for Zanzibar – Properties, Rentals & Activities
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
        Welcome to ZanziHome, your ultimate destination for everything you need in Zanzibar! Whether you're looking to buy or rent a property in Zanzibar, find the perfect business space, or rent a car, ZanziHome has you covered. Our platform offers a diverse range of listings, including houses, apartments, commercial properties, and land for sale or rent. 
        
        But that's not all—ZanziHome goes beyond real estate. We also provide an easy way to rent out or lease vehicles, making transportation seamless for locals and visitors alike. Additionally, explore the beauty of Zanzibar with our curated selection of safari experiences, exciting activities, and adventure bookings. From pristine beaches to cultural heritage sites, we help you make the most of your time on this breathtaking island.
        
        Our team is dedicated to making your property search, rentals, and bookings hassle-free. Whether you're an investor, a homeowner, a traveler, or a business owner, ZanziHome connects you with the best opportunities Zanzibar has to offer. Discover, book, and invest with confidence—welcome to ZanziHome!
      </p>

      <div style={{ margin: "2rem 0" }}>
        <h2 className="best-airmax-text">Highly Rated</h2>
        <p>
          Based on <strong> 1540 reviews</strong>
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
