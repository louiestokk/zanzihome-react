import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";
import MaterialUIPickers from "../components/MaterialUIPickers";
import Faq from "../components/Faq";
import StegStegComp from "../components/StegStegComp";
import { getRentalData } from "../redux-toolkit/carRentalSlice";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { useSelector } from "react-redux";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import {faqVehicle} from '../utils/faq'
const useStyles = makeStyles({
  root: {
    color: "#09366d"
  },
  img: {
    width: "100%",
    height: "220px",
    objectFit: "cover"
  },
  imgContainer: {
    position: "relative"
  },
  left: {
    position: "absolute",
    zIndex: "999",
    color: "white",
    top: "40%",
    left: "1%",
    fontSize: "1.5rem",
    cursor: "pointer"
  },
  right: {
    position: "absolute",
    zIndex: "999",
    color: "white",
    top: "40%",
    right: "1%",
    fontSize: "1.5rem",
    cursor: "pointer"
  }
});

const VehicleDetails = () => {
  const [index, setindex] = useState(0);
  const rentalData = useSelector(getRentalData);
  const fireStoreData = useSelector(getFirestoreData);
  const [showStepper, setShowStepper] = useState(false)
  const classes = useStyles();
  const { id } = useParams();
  const currentVehicle = fireStoreData.filter((el) => el.id === id);
  const currentDayPrice = Number(currentVehicle?.[0]?.Price?.split('$')[0]);
  const numRentDays = Math.floor(
    (rentalData.rentTodate - rentalData.rentFromDate) / (24 * 3600 * 1000)
  );
  const nextImage = () => {
    setindex(index + 1);
    if (index >= currentVehicle?.[0]?.imagesArray?.length - 1) setindex(0);
  };

  return (
    <section className={classes.root}>
      {!rentalData.showPaymentConfirmation && (
        <>
          <div className={classes.imgContainer}>
            <img
              className={classes.img}
              src={
                currentVehicle?.[0]?.imagesArray
                  ? currentVehicle?.[0]?.imagesArray[index]
                  : currentVehicle?.[0]?.uri
              }
              alt="car rental Zanzibar"
              title="car rental Zanzibar"
              loading="lazy"
            />
            {currentVehicle?.[0]?.imagesArray && (
              <MdArrowForwardIos
                className={classes.right}
                onClick={nextImage}
              />
            )}
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <h3 style={{ marginLeft: "1rem", marginBottom: "1rem" }}>
                {currentVehicle?.[0]?.Title}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "#22c55e",
                  width: "4rem",
                  borderRadius: "15px",
                  padding: "0.3rem",
                  marginRight: "0.5rem"
                }}
              >
                <h3>{currentVehicle?.[0]?.Price}</h3>
                <p>$/day</p>
              </div>
            </div>

            <section
              style={{
                display: "flex",
                alignItems: "center",
                margin: "1.5rem 1rem"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "1rem"
                }}
              >
                <img
                  src="https://www.svgrepo.com/show/509193/people.svg"
                  style={{ width: "20px", height: "20px" }}
                  loading="lazy"
                  alt="car rental Zanzibar"
                  title="car rental Zanzibar"
                />
                <p style={{ marginLeft: "0.3rem", fontWeight: "bold" }}>
                  {currentVehicle?.[0]?.People}
                </p>
              </div>
              {currentVehicle?.[0]?.category === "Car" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "1rem"
                  }}
                >
                  <img
                    src="https://www.svgrepo.com/show/460629/car-door-4.svg"
                    style={{ width: "20px", height: "20px" }}
                    loading="lazy"
                    alt="car rental Zanzibar"
                    title="car rental Zanzibar"
                  />
                  <p style={{ marginLeft: "0.3rem", fontWeight: "bold" }}>
                    {currentVehicle[0].Doors}
                  </p>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "1rem"
                }}
              >
                <img
                  src="https://www.svgrepo.com/show/322423/gear-stick-pattern.svg"
                  style={{ width: "20px", height: "20px" }}
                  loading="lazy"
                  alt="car rental Zanzibar"
                  title="car rental Zanzibar"
                />
                <p style={{ marginLeft: "0.3rem", fontWeight: "bold" }}>
                  {currentVehicle?.[0]?.Gear}
                </p>
              </div>
              {currentVehicle?.[0]?.category === "Car" &&
                currentVehicle?.[0]?.AC === "Yes" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "1rem"
                    }}
                  >
                    <img
                      src="https://www.svgrepo.com/show/453850/snow.svg"
                      style={{ width: "20px", height: "20px" }}
                      loading="lazy"
                      alt="car rental Zanzibar"
                      title="car rental Zanzibar"
                    />
                    <p style={{ marginLeft: "0.3rem", fontWeight: "bold" }}>
                      A/C
                    </p>
                  </div>
                )}
            </section>
          </div>

          <div style={{ marginLeft: "1rem", marginBottom: "1.5rem" }}>
            <p style={{ marginBottom: "0.5rem" }}>
              You rent from: <strong>EuroCar Zanzibar</strong>
             
            </p>
            <p style={{ marginBottom: "0.3rem",marginTop:'1rem' }}>
              <strong>Info about the vehicle</strong>
            </p>
            <p style={{ maxWidth: "320px", fontSize: "0.9rem",lineHeight:'22px' }}>
              {currentVehicle?.[0]?.Text}
            </p>
          </div>
       
          <div style={{ margin: "1rem 1rem" }}>
            <div style={{ display: "flex", alignItems: "center",marginBottom:'0.7rem' }}>
              <img
                loading="lazy"
                style={{ width: "25px", height: "25px", color: "blue" }}
                src="https://www.svgrepo.com/show/308467/car-rental-app-phone-smartphone.svg"
                alt="car rental Zanzibar"
                title="car rental Zanzibar"
              />
              <h5>Book the vehicle</h5>
            </div>
            <div style={{ display: "flex", alignItems: "center",marginBottom:'0.7rem' }}>
              <img
                loading="lazy"
                style={{ width: "25px", height: "25px", color: "blue" }}
                src="https://www.svgrepo.com/show/486616/contact-details.svg"
                alt="car rental Zanzibar"
                title="car rental Zanzibar"
              />
              <h5>Email confirmation</h5>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                loading="lazy"
                style={{ width: "25px", height: "25px", color: "blue" }}
                src="https://www.svgrepo.com/show/500652/place.svg"
                alt="car rental Zanzibar"
                title="car rental Zanzibar"
              />
              <h5 style={{height:'100%'}}>We deliver the vehicle for free</h5>
            </div>
          </div>
          <section
            style={{
              border: "1px solid lightgray",
              padding: "0.5rem",
              width: "96%",
              margin: "2rem auto",
              borderRadius: "5px"
            }}
          >
            <div>
              <MaterialUIPickers />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <div
                style={{
                  margin: "0.5rem 1rem"
                }}
              >
                <h3 style={{marginBottom:'0.5rem'}}>Total price for {numRentDays} days</h3>
                {numRentDays> 27 && <h3 style={{display:'flex',alignItems:'center'}}>{Math.round((currentDayPrice*0.80)*numRentDays)} $ <p style={{fontSize:'0.8rem',marginLeft:'0.5rem',fontWeight:'100',color:'green'}}>20% Discount</p></h3>}
               {numRentDays<28 &&  <h3>{currentDayPrice * numRentDays} $</h3>}
              </div>
              {!showStepper &&  <button
              onClick={()=> {
                setShowStepper(true)
              }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "#22c55e",
                  width: "5rem",
                  borderRadius: "15px",
                  padding: "0.5rem",
                  color: "#09366d",
                  fontWeight: "bold"
                }}
              >
                Book now
              </button>}
             
        
          
            </div>
            {showStepper && <div style={{margin:'1rem 0'}}>
              <StegStegComp hyrData={rentalData} fordonet={currentVehicle} dagar={numRentDays}/>
            </div>}
          </section>
     
        
        </>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          height: "200px"
        }}
      >
        <h3>Do you need help with the booking?</h3>
        <p style={{ maxWidth: "90%", margin: "0.5rem 0" }}>
          You can call us and we will help you directly with the booking.
        </p>
        <div style={{ display: "flex", alignItems: "center",marginTop:'0.5rem' }}>
          <FaPhoneSquareAlt />
          <a
            href="tel:+46704276963"
            style={{ color: "#09366d", marginLeft: "0.75rem" }}
          >
           WhatsApp +46 704 27 69 63
          </a>
        </div>
        <div style={{ display: "flex", alignItems: "center",marginTop:'1rem' }}>
          <FaPhoneSquareAlt />
          <a
            href="tel:+255655912498"
            style={{ color: "#09366d", marginLeft: "0.75rem" }}
          >
           Local +255 655 912 498
          </a>
        </div>
      </div>
      <div style={{height:'30px'}}></div>
      <div style={{ background: "#F8F8F8", padding: "1rem" }}>
        <h2 style={{ margin: "1rem auto", maxWidth: "85%" }}>
          Rent a car in Zanzibar Eazy and Secure. We deliver the vehicle to you!
        </h2>
        <div
          style={{
            marginLeft: "1.5rem",
            marginBottom: "1rem",
            marginTop: "2rem"
          }}
        >
          <h3>All rental periods are insured</h3>
          <p style={{marginTop:'0.15rem'}}>All rental periods are insured 24/7.</p>
        </div>
        <div style={{ marginLeft: "1.5rem", marginBottom: "1rem" }}>
          <h3>Cars for all occasions</h3>
          <p style={{ maxWidth: "90%",marginTop:'0.15rem' }}>
            There are all types of cars and models. From SUVs to spacious family
            cars, then cars and station wagons.
          </p>
        </div>
        <div style={{ marginLeft: "1.5rem", marginBottom: "1rem" }}>
          <h3>We deliver the vehicle</h3>
          <p style={{ maxWidth: "90%",marginTop:'0.15rem' }}>
            We will deliver the vehicle to your hotel or airport.
          </p>
        </div>
      </div>
      <div style={{height:'15px'}}></div>
      <Faq data={faqVehicle} />
      <div style={{height:'30px'}}></div>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <h1
          className="poppins"
          style={{ maxWidth: "85%", margin: "1rem auto" }}
        >
          Rent a Car in Zanzibar and Explore the Island with Ease - Book Now for
          the Best Deals!
        </h1>
        <p
          className="sans"
          style={{
            maxWidth: "90%",
            margin: "0rem auto",
            lineHeight: "25px",
            color: "black"
          }}
        >
          Experience the beauty and culture of Zanzibar at your own pace with a
          rental car. With stunning beaches, historic architecture, and unique
          culture, Zanzibar is a destination that demands exploration. By
          renting a car, you can easily travel from one site to the next and get
          off the beaten path to discover hidden gems. At Zanzihome.com, we
          offer a wide range of rental cars to suit your needs and budget. From
          economy to luxury vehicles, our fleet is well-maintained and regularly
          serviced for your safety and comfort. Our rental process is quick and
          easy, so you can spend less time worrying about logistics and more
          time enjoying your trip. Driving in Zanzibar is generally safe,
          although it's important to be aware of local driving habits and road
          conditions. Many roads are unpaved and can be bumpy, but they are
          generally passable with a standard vehicle. We recommend staying alert
          and driving defensively, especially in more populated areas. When you
          rent a car with Zanzihome.com, you have the freedom to explore the
          island at your leisure. Drive along the coastline and stop at some of
          the island's beautiful beaches, such as Nungwi or Paje. Head inland to
          explore the Jozani Chwaka Bay National Park, home to the red colobus
          monkey and other wildlife. Or, visit Stone Town, a UNESCO World
          Heritage site that offers a glimpse into Zanzibar's rich history and
          culture. Renting a car in Zanzibar is an affordable and convenient way
          to make the most of your trip. With Zanzihome.com, you can enjoy peace
          of mind knowing you're getting a quality rental car at a fair price.
          Book your rental car today and get ready for an unforgettable
          adventure in Zanzibar!
        </p>

        <div style={{ margin: "2rem 0" }}>
          <h2 className="best-airmax-text">Very good</h2>
          <p>
            Based on <strong> 379 reviews</strong>
          </p>
          <img
            src="https://www.snijpunt.com/files/thumbnails/trustpilot-logo-snijpunt.1600x680x1.png"
            alt="trustpilot"
            style={{ height: "120px", width: "300px", objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
};

export default VehicleDetails;
