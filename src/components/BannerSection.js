import React from "react";
import { useHistory } from "react-router-dom";
const BannerSection = () => {
  const history = useHistory();
  return (
    <div
      className="objects ajjemen-banner-section"
      style={{ height: "100%", boxShadow: "none" }}
    >
      <section
        onClick={() => history.push("/properties-zanzibar")}
        style={{
          padding: "0.8rem",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
        }}
      >
        <img
          alt="Properties for sale in Zanzibar"
          title="Properties for sale in Zanzibar"
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
        onClick={() => history.push("/car-rental-zanzibar")}
        style={{
          padding: "0.8rem",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
        }}
      >
        <img
          alt="Rent a Car or Motorbike in Zanzibar!"
          title="Rent a Car or Motorbike in Zanzibar!"
          src="https://images.pexels.com/photos/787472/pexels-photo-787472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <h4
          style={{
            letterSpacing: "1px",
            margin: "0.5rem 0",
            fontSize: "0.95rem"
          }}
        >
          Rent a Car or Motorbike in Zanzibar!
        </h4>
        <p
          style={{
            fontSize: "0.85rem",
            maxWidth: "90%",
            lineHeight: "23px",
            letterSpacing: "1px"
          }}
        >
          Looking to explore Zanzibar on four wheels or two? Book a car or
          motorcycle rental with us today and hit the road in style. Discover
          the island's beauty at your own pace with our convenient booking
          services.
        </p>
      </section>
      <section
        onClick={() => history.push("/tours-zanzibar")}
        style={{
          padding: "0.8rem",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
        }}
      >
        <img
          alt="Book tours and safaris in Zanzibar"
          title="Book tours and safaris in Zanzibar"
          src="https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/fe/13/eb.jpg"
        />
        <h4
          style={{
            letterSpacing: "1px",
            margin: "0.5rem 0",
            fontSize: "0.95rem"
          }}
        >
          Explore Zanzibar - Book your tour or safari today!
        </h4>
        <p
          style={{
            fontSize: "0.85rem",
            maxWidth: "90%",
            lineHeight: "23px",
            letterSpacing: "1px"
          }}
        >
          Discover the best of Zanzibar's natural beauty with our tours and
          safaris. Explore the coastline, visit national parks, and see wildlife
          in their natural habitats. Book your dream trip today!
        </p>
      </section>
      <section
        onClick={() => history.push("/checkout")}
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
              Free
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
          It is for <strong>free</strong> to advertise on Zanzihome.com!
          Advertise your own property or your vehicle. Get started today, it's
          super easy.
          {/* Advertise your own property or your vehicle. Or maybe you drive taxi,
          arrange tours and safaris and want more customers. Get started today,
          it's super easy. */}
        </p>
      </section>

      {/* 
      <section
        onClick={() => history.push("/taxi-zanzibar")}
        style={{
          padding: "0.8rem",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
        }}
      >
        <img
          alt="Taxi Zanzibar!"
          title="Taxi Zanzibar!"
          src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0e/ee/89/23.jpg"
        />
        <h4
          style={{
            letterSpacing: "1px",
            margin: "0.5rem 0",
            fontSize: "0.95rem"
          }}
        >
          Book Your Zanzibar Taxi or Airport Transfer Today!
        </h4>
        <p
          style={{
            fontSize: "0.85rem",
            maxWidth: "90%",
            lineHeight: "23px",
            letterSpacing: "1px"
          }}
        >
          Arriving in Zanzibar and need a ride? Or just looking to explore the
          island with ease? Book your taxi or airport transfer with us and
          experience hassle-free travel.
        </p>
      </section> */}
    </div>
  );
};

export default BannerSection;
