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


  return (
    <div>
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
    
    </div>
  );
};

export default Brokers;
