import React from "react";
import styled from "styled-components";

const AdBanner = () => {
  return (
    <Wrapper className="ooo">
      <div className="holder">
        <h1>Advertise your property</h1>
        <p className="adbannerp" style={{ margin: "0.5rem 0" }}>
          Do you have a house, apartment, plot or business that you want to sell
          or rent out?
        </p>
        <button
          className="adbannerbtn"
          onClick={() => (window.location.href = "/advertisepropertyzanzibar")}
        >
          Advertise
        </button>
      </div>
    </Wrapper>
  );
};

export default AdBanner;
const Wrapper = styled.section`
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  img {
    height: 340px;
    width: 100%;
    opacity: 0.8;
  }
  .holder {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  h1 {
    color: #dfe6d8;
    max-width: 280px;
    font-size: 2rem;
  }
  p {
    color: #dfe6d8;
    max-width: 320px;
    margin: 0.5rem 0;
  }
  .icon {
    font-size: 3rem;
    color: #dfe6d8;
    margin: 1rem auto;
  }
`;

// banner med bilden zanzibarisland.jpg
