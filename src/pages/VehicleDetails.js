import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";
import MaterialUIPickers from "../components/MaterialUIPickers";
import { getRentalData } from "../redux-toolkit/carRentalSlice";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { useSelector } from "react-redux";
import { FaPhoneSquareAlt } from "react-icons/fa";
import PaypalCheckout from "../components/PaypalCheckout";
import PaymentConfirmation from "./PaymentConfirmation";
const useStyles = makeStyles({
  root: {
    color: "#09366d"
  },
  img: {
    width: "100%",
    height: "220px",
    objectFit: "cover"
  }
});
const VehicleDetails = () => {
  const [showPaypal, setshowPaypal] = useState(false);
  const rentalData = useSelector(getRentalData);
  const fireStoreData = useSelector(getFirestoreData);
  const classes = useStyles();
  const { id } = useParams();
  const currentVehicle = fireStoreData.filter((el) => el.id === id);
  const currentDayPrice = currentVehicle?.[0]?.Price;
  const numRentDays = Math.floor(
    (rentalData.rentTodate - rentalData.rentFromDate) / (24 * 3600 * 1000)
  );
  return (
    <section className={classes.root}>
      {!rentalData.showPaymentConfirmation && (
        <>
          <div>
            <img
              className={classes.img}
              src={currentVehicle?.[0]?.uri}
              alt="car rental Zanzibar"
              title="car rental Zanzibar"
              loading="lazy"
            />
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
          <div style={{ marginLeft: "1rem", marginBottom: "0.5rem" }}>
            <p style={{ marginBottom: "0.5rem" }}>
              You rent from: <strong>{currentVehicle?.[0]?.Name}</strong>
              {currentVehicle?.[0]?.Area && `  in ${currentVehicle?.[0]?.Area}`}
            </p>
            <p style={{ marginBottom: "0.2rem" }}>
              <strong>{currentVehicle?.[0]?.Name} says:</strong>
            </p>
            <p style={{ maxWidth: "320px", fontSize: "0.9rem" }}>
              {currentVehicle?.[0]?.Text}
            </p>
          </div>
          <div style={{ margin: "1rem 1rem" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                loading="lazy"
                style={{ width: "25px", height: "25px", color: "blue" }}
                src="https://www.svgrepo.com/show/308467/car-rental-app-phone-smartphone.svg"
                alt="car rental Zanzibar"
                title="car rental Zanzibar"
              />
              <h5>Book the vehicle</h5>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                loading="lazy"
                style={{ width: "25px", height: "25px", color: "blue" }}
                src="https://www.svgrepo.com/show/486616/contact-details.svg"
                alt="car rental Zanzibar"
                title="car rental Zanzibar"
              />
              <h5 style={{ width: "165px" }}>Contact details are shared</h5>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                loading="lazy"
                style={{ width: "25px", height: "25px", color: "blue" }}
                src="https://www.svgrepo.com/show/500652/place.svg"
                alt="car rental Zanzibar"
                title="car rental Zanzibar"
              />
              <h5>Meet by the owner</h5>
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
                <p>Total price for {numRentDays} days</p>
                <h3>{currentDayPrice * numRentDays} $</h3>
              </div>
              <button
                onClick={() => setshowPaypal(!showPaypal)}
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
              </button>
            </div>
          </section>
          <div style={{ display: showPaypal ? "block" : "none" }}>
            <PaypalCheckout
              price={currentDayPrice * numRentDays}
              period={numRentDays}
              periodType={"days"}
              payFor={"Rental"}
            />
          </div>
        </>
      )}

      {rentalData.showPaymentConfirmation && (
        <div>
          <PaymentConfirmation
            rentalData={rentalData}
            currentVehicle={currentVehicle}
            price={currentDayPrice * numRentDays}
            period={numRentDays}
          />
        </div>
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaPhoneSquareAlt />
          <a
            href="tel:+46317539060"
            style={{ color: "#09366d", marginLeft: "0.75rem" }}
          >
            +46 31 753 90 60
          </a>
        </div>
      </div>
    </section>
  );
};

export default VehicleDetails;
