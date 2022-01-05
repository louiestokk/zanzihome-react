import React from "react";
import { bannerInfo } from "../utils/data";
import banner from "../utils/buildhousezanzibar.jpg";
import { MdConstruction } from "react-icons/md";
import { MdPool } from "react-icons/md";
import { MdRoofing } from "react-icons/md";
import { BsFillHouseFill } from "react-icons/bs";
import { GiWoodBeam } from "react-icons/gi";
import { AiOutlineCheck } from "react-icons/ai";
const AdBanner = ({ size, setSize }) => {
  const { company, name, id, url } = bannerInfo[0];

  return (
    <>
      <div className="adBanner-image-container">
        <img src={banner} alt="construct company" />
        <div className="addBanner-info">
          <div className="bildskallvahar">
            <MdConstruction className="construct" />
          </div>
          <div>
            <h4>{company}</h4>
            <p>{name}</p>
          </div>
        </div>
        <div className="adbanner-logo">
          <div>
            <h5>
              Reliable and cost-effective <AiOutlineCheck />
            </h5>
          </div>
        </div>
        {/* <div className="adBanner-footer">
          <div className="adbanner-logo">
            <div>
              <h4>Construction company with 15 years of experience</h4>
              <h5>
                Reliable and cost-effective <AiOutlineCheck />
              </h5>
            </div>
            <div className="adbanerlogga">
              <p>M M M</p>
              <span></span>
            </div>
          </div>
          <div className={size < 500 ? "adbanner-tjanster" : "hidden"}>
            <div>
              <BsFillHouseFill />
              <p>House</p>
            </div>
            <div>
              <MdPool />
              <p>Pool</p>
            </div>
            <div>
              <MdRoofing />
              <p>Roof</p>
            </div>
            <div>
              <div>
                <GiWoodBeam />
                <p>Materials </p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default AdBanner;
