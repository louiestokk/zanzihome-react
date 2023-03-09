import React from "react";
import PageHero from "../components/PageHero";
import { useUserContext } from "../user_context";
import { HiArrowCircleDown } from "react-icons/hi";
import { SiAdobepremierepro } from "react-icons/si";
import { Helmet } from "react-helmet-async";
import { BsCheck } from "react-icons/bs";
import { IoIosRocket } from "react-icons/io";
import { FiRotateCw } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import userEvent from "@testing-library/user-event";

function Advertise() {
  const { loginWithRedirect, user } = useUserContext();
  const history = useHistory();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{"Zanzihome Properties in Zanzibar"}</title>
        <meta
          name="description"
          content={
            "Find houses, plots and apartments for sale or for rent. Zanzihome is a site that will help you find your next or first home. Find lots of apartments and houses for rent. Do you have a home, plot or business that you want to rent out or sell? Advertise with us. Find properties in Zanzibar. You can find all types of properties here. Eazy whay to sell or rent your property in Zanzibar. Sell property Zanzibar. Properties for sale in Zanzibar. Business for sale Zanzibar. Business for rent Zanzibar."
          }
        />
      </Helmet>
      <PageHero
        icon={<HiArrowCircleDown />}
        title={"Advertise your property on ZanziHome"}
        subtitle={"ZanziHome is one of the"}
        sub2={"largest"}
        sub3={"platforms for buying and selling properties."}
        sub4={"Advertise with ZanziHome"}
        sub5={"ad package"}
        name={".ads-prices-text-btn"}
      />

      <div className="ads-prices-container">
        <h2 className="ads-prices-text-btn">Prices</h2>
        <div className="ads-package premium">
          <div className="dagar-div">Sell</div>
          <div>
            <h4>
              Premium
              <span>
                <SiAdobepremierepro className="opop" />
              </span>
            </h4>
            <h5>Price: $10</h5>
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
              Searchable for sale
            </p>
          </div>
        </div>

        <div className="ads-package rentout">
          <div className="dagar-div">Rent out</div>
          <div>
            <h4>Rent out </h4>
            <h5>Price: $10</h5>
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
              <span style={{ fontWeight: "bold" }}>Rocket</span> Top 3 Rank
            </p>
            <span style={{ fontSize: "0.8rem" }}> (120 days)</span>
            <div>
              <h5>$50</h5>
            </div>
          </div>

          <div className="adons-container">
            <IoIosRocket style={{ fontSize: "1.4rem", color: "green" }} />
            <p>
              <span style={{ fontWeight: "bold" }}>Rocket</span> Top 10 Rank
            </p>
            <span style={{ fontSize: "0.8rem" }}> (120 days)</span>
            <div>
              <h5>$25</h5>
            </div>
          </div>
        </div>
        <div className="ads-btn-container">
          {/* {user?.nickname ? (
            <button type="button" onClick={() => history.push("/checkout")}>
              Create new ad
            </button>
          ) : (
            <button type="buttons" onClick={loginWithRedirect}>
              Log in & get started
            </button>
          )} */}
          <button type="button" onClick={() => history.push("/checkout")}>
            Create new ad
          </button>
        </div>
      </div>
    </>
  );
}

export default Advertise;
