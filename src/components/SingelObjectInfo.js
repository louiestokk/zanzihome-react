"use client";

import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const SingelObjectInfo = ({ info, showModal, setShowModal, recivied }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="description-container">
      

      <div className={`description-text-wrapper ${expanded ? "" : "collapsed"}`}>
        <p>{info}</p>
        {!expanded && <div className="description-fade-overlay" />}
      </div>

      <div className="description-btn-wrapper">
        <button
          type="button"
          className="description-toggle-btn"
          onClick={toggleExpand}
        >
          {expanded ? (
            <>
              <MdKeyboardArrowUp /> Show less description
            </>
          ) : (
            <>
              <MdKeyboardArrowDown /> Show full description
            </>
          )}
        </button>
      </div>

      <span className="description-footer-note">
        Feel free to contact the broker for more information and register your interest!
      </span>
    </div>
  );
};

export default SingelObjectInfo;
