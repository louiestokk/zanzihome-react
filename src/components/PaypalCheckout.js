import React, { useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture"
};

const PaypalCheckout = () => {
  const Checkout = () => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);
    const onCurrencyChange = ({ target: { value } }) => {
      setCurrency(value);
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: value
        }
      });
    };
    const onCreateOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: "10.00"
            }
          }
        ]
      });
    };

    const onApproveOrder = (data, actions) => {
      return actions.order.capture().then((details) => {
        const name = details.payer.name.given_name;
        alert(`Transaction completed by ${name}`);
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
      <Checkout />
    </PayPalScriptProvider>
  );
};

export default PaypalCheckout;
