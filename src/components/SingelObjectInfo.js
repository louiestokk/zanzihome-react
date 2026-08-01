import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const SingelObjectInfo = ({ info, showModal, setShowModal, recivied }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="description-container">
      <style>{`
        .description-container {
          position: relative;
          width: 100%;
          font-family: 'Poppins', sans-serif;
        }

        .description-text-wrapper {
          position: relative;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 15px;
          line-height: 1.7;
          color: #4b5563;
          text-align: left;
        }

        .description-text-wrapper.collapsed {
          max-height: 120px;
        }

        .description-text-wrapper p {
          margin: 0;
          white-space: pre-line;
          text-align: left;
        }

        .description-fade-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
          pointer-events: none;
          transition: opacity 0.3s;
          opacity: 1;
        }

        .description-btn-wrapper {
          display: flex;
          justify-content: center;
          margin: 16px 0;
          position: relative;
          z-index: 10;
        }

        .description-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          border: 1.5px solid #0b8b3a;
          color: #0b8b3a;
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(11, 139, 58, 0.06);
        }

        .description-toggle-btn:hover {
          background: #0b8b3a;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(11, 139, 58, 0.15);
          transform: translateY(-1px);
        }

        .description-toggle-btn svg {
          font-size: 18px;
        }

        .description-footer-note {
          display: block;
          margin-top: 16px;
          font-size: 13px;
          font-weight: 600;
          color: #013a17;
          opacity: 0.85;
          text-align: left;
        }
      `}</style>

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
