import React, { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";
import { useUserContext } from "../user_context";
import { useFormContext } from "../form_ads_context";
import {
  CardElement,
  useStripe,
  Elements,
  useElements
} from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
//  username UID:  PK50165_13f9999571fb
// password HhSB9JCaQBa14ish
const promise = loadStripe(`${process.env.RECT_APP_STRIPE_PUBLIC_KEY}`);
const CheckoutForm = ({ logedinUser }) => {
  const { myUser } = useUserContext();
  const history = useHistory();
  const [confirmAd, setConfirmAd] = useState(true);
  const { price } = useFormContext();

  // stripe things
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [proccessing, setProccessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };
  const createPaymentIntent = async () => {
    try {
      const { data } = await axios.post(
        "/.netlify/functions/create-payment-intent",
        JSON.stringify(10)
      );
      setClientSecret(data.clientSecret);
      console.log(data.clientSecret);
    } catch (error) {
      console.error(error.response);
    }
  };
  useEffect(() => {
    createPaymentIntent();
    // eslint-disable-next-lines
  }, []);
  const handleStripeSubmit = async (ev) => {
    ev.preventDefault();
    setProccessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProccessing(false);
    } else {
      setError(null);
      setProccessing(false);
      setSucceeded(true);
      setTimeout(() => {
        history.push("/");
      }, 9000);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setConfirmAd(false);
    }, 10000);
  }, []);
  const handleStripeChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div style={{ margin: "1rem auto", textAlign: "center", height: "400px" }}>
      {confirmAd && (
        <div style={{ margin: "1rem auto", color: "green", maxWidth: "300px" }}>
          <h4>Thank you for advertising. We have received your ad.</h4>
        </div>
      )}
      {succeeded ? (
        <article>
          <h4>Thank you</h4>
          <h4>Your paymennt was successful!</h4>
          <h4>Redirecting to home page shortly</h4>
        </article>
      ) : (
        <article
          style={{
            marginBottom: "1rem",
            marginLeft: "1rem",
            marginTop: "2rem"
          }}
        >
          <h5>Hello {logedinUser && logedinUser.displayName}</h5>
        </article>
      )}

      {/* jobba med denna form och betalning och innan man betalar så skall man
          kunna lägga till dom 2 olika adons byt renew mot något annat båda kan
          använda rent7sell sen att man kan maila bilder och läggs in kod i
          mailet automatskt kopplat till användaren och annanonsen , sen små fix§
          och appen kan gå live */}

      <form onSubmit={handleStripeSubmit} style={{ width: "100%" }}>
        <h5>{`Price: $${Number(10)}`}</h5>

        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleStripeChange}
        />
        <button disabled={proccessing || succeeded || disabled} id="submit">
          <span id="button-text">
            {proccessing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded, see the result in your.
          <a
            href={`https://dashboard.stripe.com/test/payments`}
            style={{ margin: "0 0.2rem" }}
          >
            Stripe dashboard
          </a>
          Redirecting home shortly
        </p>
      </form>
    </div>
  );
};
const StripeCheckout = ({ logedinUser }) => {
  const [showText, setShowtext] = useState(true);

  const hidetext = () => {
    setTimeout(() => {
      setShowtext(false);
    }, 5000);
  };
  useEffect(() => {
    hidetext();
  }, []);
  return (
    <Wrapper className="stripe-container">
      <Elements stripe={promise}>
        <CheckoutForm logedinUser={logedinUser} />
      </Elements>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100;
  form {
    width: 100vw;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }
  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    height: 44px;
    font-size: 6px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  .result-message {
    line-height: 22px;
    font-size: 16px;
    color: #22c55e;
  }
  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }
  .hidden {
    display: none;
  }
  #card-error {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  #payment-request-button {
    margin-bottom: 32px;
  }
  /* Buttons and links */
  button {
    background: #22c55e;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }
  button:hover {
    filter: contrast(115%);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }
  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .spinner:before,
  .spinner:after {
    position: absolute;
    content: "";
  }
  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
    }
  }
`;
export default StripeCheckout;
