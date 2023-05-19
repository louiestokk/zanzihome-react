import React, { useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { FaMapMarkerAlt } from "react-icons/fa";
import { ImKey2 } from "react-icons/im";
import { MdPersonOutline } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlinePhone } from "react-icons/ai";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  hr: {
    width: "100%",
    height: "1px",
    background: "#E0E0E0",
    marginBottom: "0.2rem",
    marginTop: "0.2rem"
  },
  resv: {
    display: "flex"
  },
  details: {
    display: "flex",
    alignItems: "center",
    marginTop: "1rem"
  },
  root: {
    padding: "1rem"
  },
  img: {
    width: "100%",
    objectFit: "cover",
    height: "180px",
    borderRadius: "5px"
  }
});
const PaymentConfirmation = ({ rentalData, currentVehicle, price, period }) => {
  const classes = useStyles();
  const form = useRef();
  const date = rentalData?.rentFromDate?.getDate();
  const month = rentalData?.rentFromDate?.getMonth() + 1;
  const year = rentalData?.rentFromDate?.getFullYear();
  const rentPickUpTime = `${rentalData.pickupTime.getHours()}:${rentalData.pickupTime.getMinutes()}`;
  const rentLeaveTime = `${rentalData.leaveTime.getHours()}:${rentalData.leaveTime.getMinutes()}`;
  const pickUpFormatted = `${date}/${month}-${year} Time: ${rentPickUpTime}`;
  const dateT = rentalData?.rentTodate?.getDate();
  const monthT = rentalData?.rentTodate?.getMonth() + 1;
  const LeaveFormatted = `${dateT}/${monthT}-${year} Time: ${rentLeaveTime}`;

  const sendConfirmationAndNewBooking = () => {
    emailjs
      .sendForm(
        "service_kxcd6so",
        "template_q9jc4d5",
        form.current,
        process.env.REACT_APP_EMAILJS_2
      )
      .then(
        (result) => {
          console.log(result);
          if (result.text === "OK") {
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  useEffect(() => {
    sendConfirmationAndNewBooking();
  }, []);
  return (
    <div className={classes.root}>
      <div>
        <h1>Your {currentVehicle?.[0]?.category} Rental Confirmation</h1>
        <div className={classes.hr}></div>
        <h4 className={classes.resv}>
          Reservation number:{" "}
          <p style={{ marginLeft: "0.3rem" }}>{rentalData?.resNumber}</p>
        </h4>
      </div>
      <div className={classes.details}>
        <h3 style={{ marginRight: "1rem" }}>Booking details</h3>
        <ImKey2 />
      </div>
      <section>
        <img
          alt="rent car zanzibar"
          src={currentVehicle?.[0]?.uri}
          title="car rental Zanzibar"
          loading="lazy"
          className={classes.img}
        />

        <h2>{currentVehicle?.[0]?.Title}</h2>
        <p style={{ marginRight: "1rem" }}>Days: {period}</p>
        <p>Total price: {price}$</p>
      </section>
      <section>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
        >
          <FaMapMarkerAlt />
          <h3 style={{ marginLeft: "0.3rem" }}>Pick-up</h3>
        </div>
        <p>
          {currentVehicle?.[0]?.Area} Zanzibar, {pickUpFormatted}
        </p>
      </section>
      <section>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
        >
          <FaMapMarkerAlt />
          <h3 style={{ marginLeft: "0.3rem" }}>Drop-off</h3>
        </div>
        <p>
          {currentVehicle?.[0]?.Area} Zanzibar, {LeaveFormatted}
        </p>
      </section>
      <section>
        <h3
          style={{
            borderBottom: "1px solid gray",
            maxWidth: "122px",
            marginTop: "1rem",
            marginBottom: "0.5rem"
          }}
        >
          Your rent from
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.3rem"
          }}
        >
          <MdPersonOutline style={{ marginRight: "0.5rem" }} />
          <p>
            {currentVehicle?.[0]?.Name === ""
              ? "Zanzihome.com"
              : currentVehicle?.[0]?.Name}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.3rem"
          }}
        >
          <AiOutlineMail style={{ marginRight: "0.5rem" }} />
          <p>
            {currentVehicle?.[0]?.Email === ""
              ? "louiestokk@gmail.com"
              : currentVehicle?.[0]?.Email}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.3rem"
          }}
        >
          <AiOutlinePhone style={{ marginRight: "0.5rem" }} />
          <p>
            {currentVehicle?.[0]?.Phone === null
              ? "+46 317539060"
              : currentVehicle?.[0]?.Phone}
          </p>
        </div>
        {currentVehicle?.[0]?.WhatsApp && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.3rem"
            }}
          >
            <AiOutlineWhatsApp style={{ marginRight: "0.5rem" }} />
            <p>{currentVehicle?.[0]?.WhatsApp}</p>
          </div>
        )}
      </section>
      <div style={{ display: "none" }}>
        <form ref={form}>
          <input
            name="ownerName"
            type="text"
            readOnly
            value={currentVehicle?.[0]?.Name}
          />
          <input
            name="ownerPhone"
            type="text"
            readOnly
            value={
              currentVehicle?.[0]?.Phone === null
                ? "+46317539060"
                : currentVehicle?.[0]?.Phone
            }
          />
          <input
            name="ownerEmail"
            type="text"
            readOnly
            value={
              currentVehicle?.[0]?.Email === ""
                ? "louiestokk@gmail.com"
                : currentVehicle?.[0]?.Email
            }
          />
          <input
            name="renterName"
            type="text"
            readOnly
            value={`${rentalData?.rentalPerson?.name?.given_name} ${rentalData?.rentalPerson?.name?.surname}`}
          />
          <input
            name="reservNumber"
            type="text"
            readOnly
            value={rentalData?.resNumber}
          />
          <input name="fromDate" type="text" readOnly value={pickUpFormatted} />
          <input name="toDate" type="text" readOnly value={LeaveFormatted} />
          <input name="period" type="text" readOnly value={`${period} days`} />
          <input
            name="rentalArea"
            type="text"
            readOnly
            value={currentVehicle?.[0]?.Area}
          />
          <input
            name="renterEmail"
            type="text"
            readOnly
            value={rentalData?.rentalPerson?.email_address}
          />
          <input name="totalPayment" type="text" readOnly value={`${price}$`} />
          <input
            name="commission"
            type="text"
            readOnly
            value={`${Number(price) * 0.9}$`}
          />
          <input
            name="WhatsApp"
            type="text"
            readOnly
            value={currentVehicle?.[0]?.WhatsApp}
          />
        </form>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
