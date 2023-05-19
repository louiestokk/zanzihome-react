import React from "react";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    padding: "1rem",
    maxWidth: "700px",
    "@media (min-width: 780px)": {
      margin: "0 auto"
    }
  },
  pageTitle: {
    letterSpacing: "1px",
    fontSize: "1.7rem",
    marginBottom: "1rem"
  },
  subtext: {
    fontSize: "1.15rem",
    maxWidth: "90%",
    lineHeight: "28px"
  },
  btn: {
    display: "flex",
    alignItems: "center",
    height: "4rem",
    background: "#22c55e",
    width: "85%",
    padding: "1rem",
    borderRadius: "20px",
    textAlign: "center",
    color: "white",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    marginTop: "2rem",
    marginLeft: "0",
    marginRight: "0",
    marginBottom: "3rem"
  },
  info: {
    marginBottom: "3rem"
  },
  stepContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: "1.5rem"
  },
  stepItem: {
    maxWidth: "80%"
  }
});
const RentalOwner = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <section>
        <h1 className={classes.pageTitle}>
          Earn money 💰 sharing your vehicle!
        </h1>
        <p className={classes.subtext}>
          Rent out your vehicle when you are not using it yourself. With full
          control, you decide at what price, who can rent and when it can be
          rented.
        </p>
        <button
          className={classes.btn}
          onClick={() => history.push("/checkout")}
        >
          <h3 style={{ marginRight: "0.3rem" }}>Get started</h3>-
          <p style={{ marginLeft: "0.3rem" }}>it's completely free</p>
        </button>
      </section>
      <section className={classes.info}>
        <div>
          <h3 style={{ marginBottom: "0.35rem" }}>
            You earn 90% of your daily price
          </h3>
          <p className={classes.subtext}>
            The remainder goes to marketing the site and support via our
            customer service.
          </p>
        </div>
        <div>
          <h3 style={{ marginBottom: "0.35rem", marginTop: "1rem" }}>
            Let your vehicle pay for itself
          </h3>
          <p className={classes.subtext}>
            We take care of the bookings and all the administrative work, you
            only need to drop off and pick up your vehicle.
          </p>
        </div>
      </section>
      <section className={classes.steps}>
        <h1
          className={classes.pageTitle}
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          Share your car in three easy steps
        </h1>
        <div className={classes.stepContainer}>
          <h3 style={{ fontSize: "2rem" }}>1</h3>
          <div className={classes.stepItem}>
            <h3 style={{ marginBottom: "0.35rem" }}>
              Register your vehicle for free
            </h3>
            <p className={classes.subtext}>
              Fill in some simple information about you and your vehicle, upload
              some photos and decide when and who can book the car. In just 5
              minutes you are ready for your first rental.
            </p>
          </div>
        </div>
        <div className={classes.stepContainer}>
          <h3 style={{ fontSize: "2rem" }}>2</h3>
          <div className={classes.stepItem}>
            <h3 style={{ marginBottom: "0.35rem" }}>
              Share the car worry-free
            </h3>
            <p className={classes.subtext}>
              The renter and you will agree on the pick-up and drop-off
              location. Leave the car with instructions to where the key to the
              car is or meet the renter.
            </p>
          </div>
        </div>
        <div className={classes.stepContainer}>
          <h3 style={{ fontSize: "2rem" }}>3</h3>
          <div className={classes.stepItem}>
            <h3 style={{ marginBottom: "0.35rem" }}>Start making money</h3>
            <p className={classes.subtext}>
              24 hours after the rental starts, your earnings are transferred
              automatically. We pay out to your Bank Account, Paypal or Phone
              number via Tigo Pesa.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RentalOwner;
