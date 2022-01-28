import React from "react";
import styled from "styled-components";
import { bannerInfo } from "../utils/data";
import banner from "../utils/buildhousezanzibar.jpg";
import { MdConstruction } from "react-icons/md";
import { MdPool } from "react-icons/md";
import { MdRoofing } from "react-icons/md";
import { BsFillHouseFill } from "react-icons/bs";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { GiWoodBeam } from "react-icons/gi";
import { AiOutlineCheck } from "react-icons/ai";
import image from "../utils/zanzibarisland.jpg";

const AdBanner = ({ size, setSize }) => {
  const { company, name, id, url } = bannerInfo[0];

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
