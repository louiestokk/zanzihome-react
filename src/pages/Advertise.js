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
        <title>{"Your One-Stop Property Marketplace!"}</title>
        <meta
          name="description"
          content={
            "Zanzihome offers a wide selection of properties in Zanzibar to choose from, as well as an easy-to-use platform to advertise your own property or business."
          }
        />
        <link
          hrefLang="sv"
          rel="canonical"
          href="https://www.zanzihome.com/advertisepropertyzanzibar"
        />
      </Helmet>
      <PageHero
        icon={<HiArrowCircleDown />}
        title={"Advertise your property on ZanziHome"}
        subtitle={"ZanziHome is one of the"}
        sub2={"largest"}
        sub3={
          "as an easy-to-use platform for advertise and explore properties in Zanzibar."
        }
        sub4={"Advertise for"}
        sub5={"Free"}
        name={".ads-prices-text-btn"}
      />

      <div className="ads-prices-container">
        <h1 className="ads-prices-text-btn">How to use</h1>
        <section
          style={{ display: "flex", alignItems: "center", margin: "0.4rem 0" }}
        >
          <div
            style={{
              background: "#013a17",
              height: "2rem",
              width: "2rem",
              borderRadius: "50%",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <h4>1</h4>
          </div>
          <p style={{ marginLeft: "0.3rem", fontWeight: "bold" }}>
            Fill out the form
          </p>
        </section>
        <section
          style={{ display: "flex", alignItems: "center", margin: "0.4rem 0" }}
        >
          <div
            style={{
              background: "#013a17",
              height: "2rem",
              width: "2rem",
              borderRadius: "50%",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <h4>2</h4>
          </div>
          <p style={{ marginLeft: "0.5rem", fontWeight: "bold" }}>
            Review your ad
          </p>
        </section>
        <section style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              background: "#013a17",
              height: "2rem",
              width: "2rem",
              borderRadius: "50%",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <h4>3</h4>
          </div>
          <p style={{ marginLeft: "0.8rem", fontWeight: "bold" }}>
            Publish the ad
          </p>
        </section>
        {/* <div className="ads-package premium">
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
        </div> */}
        {/* 
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
        </div> */}
        {/* <h2 className="ads-prices-text-btn">Adons</h2> */}
        {/* <div className="ads-holder-con">
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
        </div> */}
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
          <button
            type="button"
            onClick={() => history.push("/checkout")}
            style={{ width: "12rem" }}
          >
            Create new ad
          </button>
        </div>
      </div>
    </>
  );
}

export default Advertise;
