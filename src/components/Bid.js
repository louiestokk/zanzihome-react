import React from "react";
import { GiFlatHammer } from "react-icons/gi";
import Link from "next/link";
const Bid = ({ bid, id, propertys }) => {
  return (
    <div className="bid-comp">
      <div>
        <GiFlatHammer className="hammer" />
        <p>Bidding in progress</p>
      </div>
    </div>
  );
};

export default Bid;
