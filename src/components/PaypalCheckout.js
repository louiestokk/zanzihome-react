import React, { useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase";
import { useFormContext } from "../form_ads_context";
import tigo from "../utils/tigo.png";
import worldremit from "../utils/worldremit.png";
const initialOptions = {
  "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture"
};

const PaypalCheckout = ({ setActiveStep }) => {
  const Checkout = () => {
    const { adId, price } = useFormContext();
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);

    const updatePaymentStatus = async (name) => {
      try {
        const q = query(
          collection(db, "newAd"),
          where("adId", "==", Number(adId))
        );
        const querySnapshot = await getDocs(q);
        let docId = "";
        querySnapshot.forEach((doc) => (docId = doc.id));
        const object = doc(db, "newAd", docId);
        await updateDoc(object, {
          paid: true,
          payerName: name
        });
        console.log("updated");
      } catch (error) {
        console.log(error);
      }
    };

    const onCreateOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: price ? `${price.toString()}.00` : "10.00"
            }
          }
        ]
      });
    };

    const onApproveOrder = (data, actions) => {
      return actions.order.capture().then((details) => {
        const name = details.payer.name.given_name;
        updatePaymentStatus(name);
        setActiveStep(2);
      });
    };

    return (
      <div
        style={{
          margin: "1rem auto",
          width: "80%"
        }}
      >
        <div>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => onCreateOrder(data, actions)}
            onApprove={(data, actions) => onApproveOrder(data, actions)}
          />
        </div>
      </div>
    );
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        <h4>Advertising</h4>
        <p>
          Price: <strong>10$ </strong> for 12 month
        </p>
      </div>
      <Checkout />
      <div
        className="checkoutpayoptions"
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "2rem",
          justifyContent: "center",
          width: window.innerWidth > 950 && "70%"
        }}
      >
        <button
          onClick={() => (window.location.href = "/payments-instructions")}
        >
          <img
            src={tigo}
            alt="tigo pesa"
            loading="lazy"
            style={{
              height: "3rem",
              objectFit: "cover"
            }}
          />
        </button>
        <button
          onClick={() => (window.location.href = "/payments-instructions")}
        >
          <img
            src={worldremit}
            alt="world remit"
            loading="lazy"
            style={{
              height: "3rem",
              objectFit: "cover"
            }}
          />
        </button>
      </div>
    </PayPalScriptProvider>
  );
};

export default PaypalCheckout;
