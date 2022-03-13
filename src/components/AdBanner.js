import React from "react";
import styled from "styled-components";

import { BsFillArrowDownCircleFill } from "react-icons/bs";

const AdBanner = () => {
  return (
    <Wrapper className="ooo">
      <div className="holder">
        <h1>The beginning of something big</h1>
        <BsFillArrowDownCircleFill className="icon" />
      </div>
    </Wrapper>
  );
};

export default AdBanner;
const Wrapper = styled.section`
  width: 100%;
  position: relative;
  img {
    height: 340px;
    width: 100%;
    opacity: 0.8;
  }
  .holder {
    margin-left: 1rem;
    position: absolute;
    top: 10%;
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
  .icon {
    font-size: 3rem;
    color: #dfe6d8;
    margin: 1rem auto;
  }
`;

// banner med bilden zanzibarisland.jpg
