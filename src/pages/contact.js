import React from "react";
import PageHero from "../components/PageHero";
import { HiArrowCircleDown } from "react-icons/hi";
import { Link } from "react-router-dom";
const contact = () => {
  return (
    <main style={{ background: "#dfe6d8" }} className="call-main">
      <PageHero
        icon={<HiArrowCircleDown />}
        title={"Customer service & contact"}
        subtitle={" Zanzihome is one of the"}
        sub2={"largest"}
        sub3={"platforms for buying and selling properties."}
        sub4={"You are warmly welcome"}
        sub5={"to visit us or contact us"}
        name={".contact-adress"}
        // åvan skall det vara classen på det du skall scrola till
      />
      <section style={{ marginBottom: "2rem" }}>
        <article>
          <div className="contact-adress">
            <h4>Visiting address</h4>
            <p>Zanzihome.com / Stokk Tech Limited</p>
            <p>Paje njia ya mshez, Zaznibar</p>
          </div>
          <div className="contact-adress" style={{ marginTop: "1rem" }}>
            <h4>Call us</h4>

            <a href="tel:+255773749776" className="ring">
              +255 773 749 776
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
          <a href="mailto:info@zanzihome.con" className="ring">
            info@zanzihome.com
          </a>
        </div>
      </section>
    </main>
  );
};

export default contact;
