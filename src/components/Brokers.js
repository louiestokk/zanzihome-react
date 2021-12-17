import React from "react";
import { AiOutlinePhone } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
const Brokers = ({ agency, number, contact, logo }) => {
  return (
    <>
      <div className="brokers-comp-div">
        <div>
          <div className="brokers-logo-div">
            <h2>Contact Broker</h2>
            <img src={`../../${logo}`} className="brokers-logo" />
          </div>
          <p>{contact}</p>

          <h6>{agency}</h6>
        </div>
      </div>
      <div className="bbb">
        <button type="button">
          <AiOutlinePhone className="icon-broker" /> Show number
        </button>
        <button type="button">
          <AiOutlineMail className="icon-broker" /> Show e-mail
        </button>
      </div>
    </>
  );
};

export default Brokers;
