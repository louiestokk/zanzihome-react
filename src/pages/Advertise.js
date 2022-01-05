import React from "react";
import LoginAdComp from "../components/LoginAdComp";
import PageHero from "../components/PageHero";
import { useUserContext } from "../user_context";
import { HiArrowCircleDown } from "react-icons/hi";
import { SiAdobepremierepro } from "react-icons/si";
import { BsPatchPlusFill } from "react-icons/bs";
import { FaDatabase } from "react-icons/fa";
import { BsCheck } from "react-icons/bs";
import { IoIosRocket } from "react-icons/io";
import { FiRotateCw } from "react-icons/fi";
import { useHistory } from "react-router-dom";

function Advertise() {
  const { loginWithRedirect, myUser, logout } = useUserContext();
  const history = useHistory();

  return (
    <>
      <PageHero
        icon={<HiArrowCircleDown />}
        title={"Advertise your property on Zanzihome"}
        subtitle={" Zanzihome is one of the"}
        sub2={"largest"}
        sub3={"platforms for buying and selling properties."}
        sub4={"Advertise with Zanzihome"}
        sub5={"ad package"}
        name={".ads-prices-text-btn"}
      />

      <div className="ads-prices-container">
        <h2 className="ads-prices-text-btn">Prices</h2>
        <div className="ads-package premium">
          <div className="dagar-div">60 days</div>
          <div>
            <h4>
              Premium
              <span>
                <SiAdobepremierepro className="opop" />
              </span>
            </h4>
            <h5>Price: $100</h5>
          </div>
          <div className="ads-package-inner">
            <p>
              <BsCheck className="ads-package-inner-icon" />
              Top 10 Rank - Page 1
            </p>
            <p>
              <BsCheck className="ads-package-inner-icon" />
              Rocket "Adons" 10 days
            </p>
            <p>
              <BsCheck className="ads-package-inner-icon" />
              Premium Page
            </p>
          </div>
        </div>
        <div className="ads-package plus">
          <div className="dagar-div">45 days</div>
          <div>
            <h4>
              Plus
              <span>
                <BsPatchPlusFill className="opop" />
              </span>
            </h4>
            <h5>Price: $50</h5>
          </div>
          <div className="ads-package-inner">
            <p>
              <BsCheck className="ads-package-inner-icon" />
              Top 20 Rank
            </p>
            <p>
              <BsCheck className="ads-package-inner-icon" />
              Rocket "Adons" 5 days
            </p>
            <p>
              <BsCheck className="ads-package-inner-icon" />
              Plus Page
            </p>
          </div>
        </div>
        <div className="ads-package bas">
          <div className="dagar-div">30 days</div>
          <div>
            <h4>
              Base
              <span>
                <FaDatabase className="opop" />
              </span>
            </h4>
            <h5>Price: $10</h5>
          </div>
          <div className="ads-package-inner">
            <p>
              <BsCheck className="ads-package-inner-icon" />
              Top 30 Rank
            </p>

            <p>
              <BsCheck className="ads-package-inner-icon" />
              Base Page
            </p>
          </div>
        </div>
        <div className="ads-package rentout">
          <div className="dagar-div">1 year</div>
          <div>
            <h4>Rent out </h4>
            <h5>Price: $50</h5>
          </div>
          <div className="ads-package-inner">
            <p>
              <BsCheck className="ads-package-inner-icon" />
              Listed for 12 months
            </p>
            <p>
              <BsCheck className="ads-package-inner-icon" />
              Premium Page
            </p>
            <p>
              <BsCheck className="ads-package-inner-icon" />
              Searchable for rent
            </p>
          </div>
        </div>
        <h2 className="ads-prices-text-btn">Adons</h2>
        <div className="ads-holder-con">
          <div className="adons-container">
            <IoIosRocket style={{ fontSize: "1.4rem", color: "green" }} />
            <p>
              <span style={{ fontWeight: "bold" }}>Rocket</span> Top 5 Rank
            </p>
            <span style={{ fontSize: "0.8rem" }}> (30 days)</span>
            <div>
              <h5>$50</h5>
            </div>
          </div>

          <div className="adons-container">
            <FiRotateCw style={{ fontSize: "1.4rem", color: "green" }} />
            <p>
              <span style={{ fontWeight: "bold" }}>Renew</span> choosen ad
            </p>
            <span style={{ fontSize: "0.8rem" }}>
              (Premium,Plus,Base,Rent out)
            </span>
            <h5> $ Price</h5>
          </div>
        </div>
        <div className="ads-btn-container">
          {myUser ? (
            <button
              type="button"
              onClick={() => history.push(`/newad/${myUser.email}`)}
            >
              Create new ad
            </button>
          ) : (
            <button type="buttons" onClick={loginWithRedirect}>
              Log in & get started
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Advertise;
