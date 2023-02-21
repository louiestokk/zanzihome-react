import React from "react";
import { AiOutlinePhone } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
const Brokers = ({ agency, number, contact, logo, email }) => {
  const handleClick = (e) => {
    e.currentTarget.innerHTML = `${number}`;
  };
  console.log(logo);
  return (
    <>
      <div className="brokers-comp-div">
        <div>
          <div className="brokers-logo-div">
            <h2>Contact Broker</h2>

            <h4 style={{ marginRight: "1rem" }}>{agency}</h4>
          </div>
          <p>{contact}</p>

          <h6>{agency}</h6>
        </div>
      </div>
      <div className="bbb">
        <button type="button" onClick={handleClick}>
          <AiOutlinePhone className="icon-broker" /> Show number
        </button>
        <button
          type="button"
          onClick={(e) =>
            (e.currentTarget.innerHTML = email ? email : "louiestokk@gmail.com")
          }
        >
          <AiOutlineMail className="icon-broker" /> Show e-mail
        </button>
      </div>
    </>
  );
};

export default Brokers;
