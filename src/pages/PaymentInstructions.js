import React from "react";
import tigo from "../utils/tigo.png";
import worldremit from "../utils/worldremit.png";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "2rem 0",
    textAlign: "center"
  },
  option: {
    margin: "1rem 0"
  }
});
const PaymentInstructions = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.option}>
        <h3>Pay with Tigo Pesa</h3>
        <img src={tigo} alt="tigo pesa" />
        <h4>1. Send: 22 000tzs or 10$ </h4>
        <h4>2. Number: +255 713 288 772</h4>
        <h4>3. Name: Mzee Muhammed</h4>
      </div>
      <div className={classes.option}>
        <h3>Pay with WorldRemit</h3>
        <img src={worldremit} alt="worldremit" />
        <h4>1. Send: 22 000tzs or 10$ </h4>
        <p>2. Country: Tanzania</p>
        <p>3. Send by: Mobile Money Transfer</p>
        <p>4. Provider: Tigo pesa</p>
        <p>
          5. Add new recipient: <strong>FirstName: </strong>Mzee{" "}
          <strong>LastName: </strong>
          Muhammed
        </p>
        <p>6. City/Town: Zanzibar</p>
        <p>7. Mobil number: 0713 288 772</p>
        <p>7. Reason for sending: Purchase of services</p>
      </div>
      <div className={classes.option}></div>
    </div>
  );
};

export default PaymentInstructions;
