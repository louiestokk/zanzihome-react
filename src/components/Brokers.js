import React, { useRef, useState } from "react";
import { AiOutlinePhone } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import emailjs from "@emailjs/browser";
const Brokers = ({ agency, number, contact, logo, email }) => {
  const [sending, setsending] = useState(false);
  const [sent, setsent] = useState(false);
  const form = useRef();
  const handleClick = (e) => {
    e.currentTarget.innerHTML = `${number}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setsending(true);
    emailjs
      .sendForm(
        "service_kxcd6so",
        "template_kwon6mh",
        form.current,
        process.env.REACT_APP_EMAILJS_2
      )
      .then(
        (result) => {
          console.log(result);
          if (result.text === "OK") {
            setsending(false);
            setsent(true);
            document.querySelectorAll("input").forEach((el) => (el.value = ""));
            document.querySelector("textarea").value = "";
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <>
      <div className="brokers-comp-div">
        <div>
          <div className="brokers-logo-div">
            <h2>Contact Agent</h2>

            <h4 style={{ marginRight: "1rem" }}>{agency}</h4>
          </div>
          <p>{contact}</p>

          <h6>{agency}</h6>
        </div>
      </div>
      <div className="bbb">
        <button type="button" onClick={handleClick} style={{ color: "black" }}>
          <AiOutlinePhone className="icon-broker" /> Show number
        </button>
        <button
          style={{ color: "black" }}
          type="button"
          onClick={(e) =>
            (e.currentTarget.innerHTML = email ? email : "louiestokk@gmail.com")
          }
        >
          <AiOutlineMail className="icon-broker" /> Show e-mail
        </button>
      </div>
      <div>
        <form
          ref={form}
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0.3rem 1rem",
            marginTop: "2rem"
          }}
        >
          <h4
            style={{
              marginBottom: "1rem",
              borderBottom: "1px solid black",
              maxWidth: "230px"
            }}
          >
            Contact Agent for this property
          </h4>
          <label htmlFor="namn">Your name</label>
          <input type="text" name="namn" />
          <label htmlFor="email">Your email</label>
          <input type="email" name="email" />
          <label htmlFor="beskriv">Message</label>
          <textarea cols={5} rows={5} name="beskriv"></textarea>
          <button
            type={"submit"}
            onClick={handleSubmit}
            style={{
              background: "#0b8b3a",
              height: "2.4rem",
              fontWeight: "bold",
              letterSpacing: "1px",
              fontSize: "0.9rem",
              color: "white"
            }}
          >
            {sending
              ? "sending..."
              : sent
              ? "Your email is recived. Thanks!"
              : "Send"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Brokers;
