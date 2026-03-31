import React from "react";
import { useHistory } from "react-router-dom";

const Popular = ({ title, images }) => {
  const history = useHistory();

  return (
    <section
      style={{
        width: "100%",
        padding: "20px 10px",
        background: "#fff"
      }}
    >
      {/* 🔥 TITLE */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "26px", fontWeight: "700" }}>
          {title}
        </h2>
        <p style={{ fontSize: "14px", color: "#666",marginTop:'0.2rem' }}>
          Featured listings get more <strong>views</strong> and <strong>buyers</strong>
        </p>
      </div>

      {/* 🔥 GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "16px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        {images?.map((tour, i) => (
          <div
            key={i}
            onClick={() => {history.push(`/propertys/property/${tour.adId}`)}}
            style={{
              cursor: "pointer",
              borderRadius: "12px",
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
              transition: "0.3s"
            }}
          >
            {/* 🔥 IMAGE CONTAINER */}
            <div style={{ position: "relative", height: "200px" }}>
              <img
                loading="lazy"
                src={tour.url}
                alt={`${tour.imgText} Zanzibar`}
                title={`${tour.imgText} Zanzibar`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />

              {/* 🔥 BADGES */}
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  display: "flex",
                  gap: "6px"
                }}
              >
                <span
                  style={{
                    background: "#FFD700",
                    color: "#000",
                    padding: "4px 8px",
                    fontSize: "11px",
                    borderRadius: "6px",
                    fontWeight: "700"
                  }}
                >
                  ⭐ Featured
                </span>

                {i % 2 === 0 && (
                  <span
                    style={{
                      background: "#ff4d4f",
                      color: "#fff",
                      padding: "4px 8px",
                      fontSize: "11px",
                      borderRadius: "6px"
                    }}
                  >
                    🔥 Hot
                  </span>
                )}
              </div>

              {/* 🔥 GRADIENT */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "70%",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.75), transparent)"
                }}
              />
            </div>

            {/* 💬 CONTENT (HEMNET STYLE) */}
            <div style={{ padding: "12px" }}>
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  marginBottom: "6px",
                  lineHeight: "20px"
                }}
              >
                {tour.imgText}
              </h3>

              {/* 🔥 FAKE PRICE / INFO (VIKTIGT FÖR KÄNSLA) */}
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  marginBottom: "4px"
                }}
              >
                $120,000
              </p>

              <p style={{ fontSize: "12px", color: "#777" }}>
                Zanzibar • {tour.type}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Popular;