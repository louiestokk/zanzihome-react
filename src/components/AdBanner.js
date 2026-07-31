import React from "react";
import { useHistory } from "react-router-dom";

const AdBanner = () => {
  const history = useHistory();

  return (
    <div className="promo-banner-wrapper">
      <style>{`
        .promo-banner-wrapper {
          width: 100%;
          max-width: 1100px;
          margin: 3.5rem auto;
          padding: 0 1rem;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .promo-banner-content {
          background: linear-gradient(135deg, #013a17 0%, #0d2818 100%);
          border-radius: 20px;
          padding: 40px 30px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(1, 58, 23, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* Decorative glowing patterns */
        .promo-banner-content::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -20%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .promo-banner-content::after {
          content: "";
          position: absolute;
          bottom: -50%;
          right: -20%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .promo-banner-title {
          color: #ffffff;
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 10px 0;
          letter-spacing: -0.5px;
          position: relative;
          z-index: 2;
        }

        .promo-banner-text {
          color: #ffffff;
          font-size: 16px;
          line-height: 1.6;
          max-width: 700px;
          margin: 0 0 24px 0;
          font-weight: 500;
          position: relative;
          z-index: 2;
        }

        .promo-banner-btn {
          background: #ffffff;
          color: #013a17;
          border: none;
          padding: 12px 28px;
          font-size: 14.5px;
          font-weight: 600;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 2;
        }

        .promo-banner-btn:hover {
          background: #e6ebe7;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .promo-banner-btn:active {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .promo-banner-content {
            padding: 30px 20px;
          }
          .promo-banner-title {
            font-size: 22px;
          }
          .promo-banner-text {
            font-size: 14px;
            margin-bottom: 20px;
          }
          .promo-banner-btn {
            padding: 10px 24px;
            font-size: 13.5px;
          }
        }
      `}</style>

      <div className="promo-banner-content">
        <h2 className="promo-banner-title">Sell or Rent Faster!</h2>
        <p className="promo-banner-text">
          Boost your property listing and get maximum visibility on ZanziHome. Reaches thousands of prospective buyers and tenants daily.
        </p>
        <button
          type="button"
          className="promo-banner-btn"
          onClick={() => history.push("/boost-listing")}
        >
          Explore Boost Packages 🚀
        </button>
      </div>
    </div>
  );
};

export default AdBanner;
