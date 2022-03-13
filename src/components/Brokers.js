import React from "react";
import { AiOutlinePhone } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
const Brokers = ({ agency, number, contact, logo }) => {
  const handleClick = (e) => {
    e.currentTarget.innerHTML = `+${number}`;
  };
  return (
    <>
      <div className="brokers-comp-div">
        <div>
          <div className="brokers-logo-div">
            <h2>Contact Broker</h2>
            <img
              src={`../../${logo}`}
              className="brokers-logo"
              alt="broker logo"
            />
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
          onClick={(e) => (e.currentTarget.innerHTML = "contact@3m.tz")}
        >
          <AiOutlineMail className="icon-broker" /> Show e-mail
        </button>
      </div>
    </>
  );
};

export default Brokers;
