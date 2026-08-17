"use client";

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
