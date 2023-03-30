import React from "react";
import PageHero from "../components/PageHero";
import { HiArrowCircleDown } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const About = () => {
  return (
    <main style={{ background: "#dfe6d8" }} className="call-main">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {
            "Properties for Sale and Rent in Zanzibar. Discover Your Dream Property for Sale in Zanzibar. Advertise Your Property on Zanzihome Today! Your One-Stop Property Marketplace!"
          }
        </title>
        <meta
          name="description"
          content={
            "Find Your Perfect Slice of Paradise: Properties for Sale in Zanzibar. Find properties in Zanzibar as houses, plots and apartments for sale or for rent. Looking for properties or businesses for sale or rent in Zanzibar? Zanzihome offers a wide selection of properties in Zanzibar to choose from, as well as an easy-to-use platform to advertise your own property or business. With our optimized search engine and user-friendly interface, finding or selling a property or business in Zanzibar has never been easier. Sign up today and start exploring the opportunities Zanzihome has to offer."
          }
        />
      </Helmet>
      <PageHero
        icon={<HiArrowCircleDown />}
        title={"ZanziHome"}
        subtitle={"ZanziHome is one of the"}
        sub2={"largest"}
        sub3={"platforms for buying, selling and rent properties."}
        sub4={"You are warmly welcome"}
        sub5={"to visit us or contact us"}
        name={".contact-adress"}
        // åvan skall det vara classen på det du skall scrola till
      />
      <section style={{ marginBottom: "2rem" }}>
        <article>
          <div className="contact-adress">
            <h4>Visiting address</h4>
            <p>ZanziHome.com / Stokk Tech Limited</p>
          </div>
          <div className="contact-adress" style={{ marginTop: "1rem" }}>
            <h4>Call us</h4>

            <a href="tel:+255773749776" className="ring">
              +255 713 288 772
            </a>
          </div>
          <div className="contact-adress" style={{ marginTop: "1rem" }}>
            <h4>Advertise property</h4>

            <Link to="/advertisepropertyzanzibar" className="ring">
              Advertise now, price and information
            </Link>
          </div>
          <div
            className="contact-adress"
            style={{ marginTop: "1rem", marginBottom: "2rem" }}
          >
            <h4>Banner advertising</h4>
            <Link to="/advertisepropertyzanzibar" className="ring">
              Banner advertising, price and information
            </Link>
          </div>
        </article>
        <div className="contact-adress" style={{ marginTop: "1rem" }}>
          <h4>Send us email</h4>
          <a href="mailto:louiestokk@gmail.com" className="ring">
            ZanziHome.com
          </a>
        </div>
      </section>
    </main>
  );
};

export default About;
