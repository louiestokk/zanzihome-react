import React, { useState } from "react";

const Karusell = ({ imagesArray }) => {
  const [index, setIndex] = useState(0);

  // Filter out empty image URIs
  const validImages = imagesArray ? imagesArray.filter(img => img !== "") : [];

  if (validImages.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? validImages.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex === validImages.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="premium-carousel">
      <style>{`
        .premium-carousel {
          position: relative;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          background: #0d2818;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .carousel-view-container {
          position: relative;
          width: 100%;
          height: 56vw; /* 16:9 aspect ratio */
          max-height: 320px;
          min-height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 768px) {
          .carousel-view-container {
            height: 450px;
            max-height: none;
            min-height: none;
          }
        }

        .carousel-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.3s ease-in-out;
        }

        /* Nav Arrows */
        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
          outline: none;
        }

        .carousel-btn:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: translateY(-50%) scale(1.05);
        }

        .carousel-btn.prev {
          left: 12px;
        }

        .carousel-btn.next {
          right: 12px;
        }

        @media (min-width: 768px) {
          .carousel-btn {
            width: 46px;
            height: 46px;
          }
          .carousel-btn.prev {
            left: 20px;
          }
          .carousel-btn.next {
            right: 20px;
          }
        }

        /* Image Index Badge */
        .carousel-badge {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: rgba(1, 58, 23, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #ffffff;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
          letter-spacing: 0.5px;
          z-index: 10;
        }
        @media (min-width: 768px) {
          .carousel-badge {
            bottom: 16px;
            right: 16px;
            font-size: 12px;
            padding: 6px 12px;
          }
        }

        /* Thumbnails Container */
        .carousel-thumbs-wrapper {
          background: #ffffff;
          padding: 8px;
          display: flex;
          gap: 8px;
          overflow-x: auto;
          white-space: nowrap;
          -webkit-overflow-scrolling: touch;
          border-top: 1px solid #f3f4f6;
          width: 100%;
          box-sizing: border-box;
        }

        /* Hide scrollbars but keep functionality */
        .carousel-thumbs-wrapper::-webkit-scrollbar {
          height: 6px;
        }
        .carousel-thumbs-wrapper::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .carousel-thumbs-wrapper::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        .carousel-thumb-item {
          width: 60px;
          height: 45px;
          object-fit: cover;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid transparent;
          flex-shrink: 0;
          opacity: 0.6;
        }

        @media (min-width: 768px) {
          .carousel-thumbs-wrapper {
            padding: 12px;
            gap: 10px;
          }
          .carousel-thumb-item {
            width: 90px;
            height: 65px;
            border-radius: 8px;
          }
        }

        .carousel-thumb-item:hover {
          opacity: 0.9;
        }

        .carousel-thumb-item.active {
          border-color: #013a17;
          opacity: 1;
          transform: scale(1.02);
          box-shadow: 0 4px 10px rgba(1, 58, 23, 0.15);
        }
      `}</style>

      {/* Main viewport */}
      <div className="carousel-view-container">
        {validImages.length > 1 && (
          <button className="carousel-btn prev" onClick={handlePrev} aria-label="Previous image">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )}

        <img
          src={validImages[index]}
          alt={`Property view ${index + 1}`}
          className="carousel-main-img"
          loading="lazy"
        />

        {validImages.length > 1 && (
          <button className="carousel-btn next" onClick={handleNext} aria-label="Next image">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}

        <div className="carousel-badge">
          {index + 1} / {validImages.length}
        </div>
      </div>

      {/* Thumbnails strip */}
      {validImages.length > 1 && (
        <div className="carousel-thumbs-wrapper">
          {validImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className={`carousel-thumb-item ${index === idx ? "active" : ""}`}
              onClick={() => setIndex(idx)}
              loading="lazy"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Karusell;
