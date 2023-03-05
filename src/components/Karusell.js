import React, { useState } from "react";
const Karusell = ({ imagesArray }) => {
  const [index, setindex] = useState(0);
  return (
    <>
      <div>
        {imagesArray && (
          <img
            src={imagesArray[index]}
            style={{
              backgroundPosition: "center",
              maxHeight: "500px",
              objectFit: "cover",
              maxWidth: "700px"
            }}
            loading="lazy"
          />
        )}
      </div>
      <div style={{ display: "flex", overflowX: "scroll" }}>
        {imagesArray &&
          imagesArray.map((el, ind) => (
            <img
              loading="lazy"
              src={el}
              style={{
                width: "75px",
                height: "75px",
                margin: "0.3rem 0.5rem",
                cursor: "pointer",
                borderRadius: "5px"
              }}
              onClick={() => setindex(ind)}
            />
          ))}
      </div>
    </>
  );
};

export default Karusell;
