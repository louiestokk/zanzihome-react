import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
// top: 28%;
const SingelObjectInfo = ({ info, showModal, setShowModal, recivied }) => {
  const [height, setHeight] = useState("100px");
  const [hidden, setHidden] = useState(false);
  const [position, setPosition] = useState("28%");

  const handleClick = () => {
    setHidden(!hidden);
    setHeight("100%");
    setPosition("82%");
  };
  return (
    <div className="singel-object-infotext" style={{ height: height }}>
      <div style={{ height: "100%" }}>
        <p style={{ height: "100%" }}>{info}</p>
        <br></br>
        <span>
          Feel free to contact the broker for more information and register your
          interest!
        </span>
      </div>
      <div className="singel-object-infotext-btns" style={{ top: position }}>
        <button
          type="button"
          className={`${hidden ? "hidden" : "soitbt-1"}`}
          onClick={handleClick}
        >
          <MdKeyboardArrowDown /> Show full description
        </button>
      </div>
    </div>
  );
};

export default SingelObjectInfo;
