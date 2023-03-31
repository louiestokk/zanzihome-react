import React from "react";

const BannerSection = () => {
  return (
    <div
      className="objects ajjemen-banner-section"
      style={{ height: "100%", boxShadow: "none" }}
    >
      <section
        onClick={() => (window.location.href = "/")}
        style={{
          padding: "0.8rem",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
        }}
      >
        <img
          alt="Beach and property for sale in Zanzibar"
          src="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <h4
          style={{
            letterSpacing: "1px",
            margin: "0.5rem 0",
            fontSize: "0.95rem"
          }}
        >
          Discover Your Dream Property for Sale in Zanzibar!
        </h4>
        <p
          style={{
            fontSize: "0.85rem",
            maxWidth: "90%",
            lineHeight: "23px",
            letterSpacing: "1px"
          }}
        >
          Find properties in Zanzibar as houses, plots and apartments for sale
          or for rent. Zanzihome offers a wide selection of properties in
          Zanzibar to choose from.
        </p>
      </section>
      <section
        onClick={() => (window.location.href = "/advertisepropertyzanzibar")}
        style={{
          padding: "0.8rem",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
        }}
      >
        <div
          className="filter-filter-holder"
          style={{
            borderRadius: "5px"
          }}
        >
          <div
            style={{
              height: "200px",
              width: "400px",
              marginBottom: "0.3rem",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <h1
              style={{ color: "white", fontSize: "5rem", letterSpacing: "1px" }}
            >
              10$
            </h1>
          </div>
        </div>
        <h4
          style={{
            letterSpacing: "1px",
            margin: "0.5rem 0",
            fontSize: "0.95rem"
          }}
        >
          Yep you read that right!
        </h4>
        <p
          style={{
            fontSize: "0.85rem",
            maxWidth: "90%",
            lineHeight: "23px",
            letterSpacing: "1px"
          }}
        >
          It only costs $10 to advertise and there are no other fees. Get
          started today, it's super easy. Advertise your own property or
          business today.
        </p>
      </section>
      <section
        onClick={() => (window.location.href = "/advertisepropertyzanzibar")}
        style={{
          padding: "0.8rem",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
        }}
      >
        <img
          alt="Advertise property for sale or rent in Zanzibar"
          src="https://www.shadowsofafrica.com/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/3/_/3_stone_town_.jpg"
        />
        <h4
          style={{
            letterSpacing: "1px",
            margin: "0.5rem 0",
            fontSize: "0.95rem"
          }}
        >
          Advertise Your Property on Zanzihome Today!
        </h4>
        <p
          style={{
            fontSize: "0.85rem",
            maxWidth: "90%",
            lineHeight: "23px",
            letterSpacing: "1px"
          }}
        >
          Zanzihome offers a wide selection of properties in Zanzibar to choose
          from, as well as an easy-to-use platform to advertise your own
          property or business.
        </p>
      </section>
    </div>
  );
};

export default BannerSection;
