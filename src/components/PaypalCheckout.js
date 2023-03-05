import React, { useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture"
};

const PaypalCheckout = ({ setActiveStep }) => {
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
      <div style={{ textAlign: "center", margin: "1rem 0" }}>
        <h4>Advertising</h4>
        <p>
          Price: <strong>10$ </strong> for 12 month
        </p>
      </div>
      <Checkout />
    </PayPalScriptProvider>
  );
};

export default PaypalCheckout;
