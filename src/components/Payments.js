import React from "react";
import PageHero from "../components/PageHero";
import { HiArrowCircleDown } from "react-icons/hi";
import Link from "next/link";
const Payments = () => {
  return (
    <main style={{ background: "#dfe6d8" }} className="call-main">
      <PageHero
        icon={<HiArrowCircleDown />}
        title={"Payment method"}
        subtitle={"We accept Mastercard, Visa,"}
        sub2={"Paypal, Remitly and Tigo pesa"}
        sub3={"mobile transfer"}
        sub4={"You are warmly welcome"}
        sub5={"to visit us or contact us"}
        name={".contact-adress"}
        // åvan skall det vara classen på det du skall scrola till
      />
      <section style={{ marginBottom: "2rem" }}>
        <article>
          <div className="contact-adress">
            <h4>Visiting address</h4>
            <p>ZanziHome.com / Tripple M Ltd</p>
          </div>
          <div className="contact-adress" style={{ marginTop: "1rem" }}>
            <h4>Call us</h4>

            <a style={{marginBottom:'1rem'}} href="tel:+255655912498" className="ring">
              +255 655 912 498
            </a>
            <br />
            <a
              href="https://wa.me/46704276963"
              className="ring"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp: +46 704 276 963
            </a>
          </div>
          <div className="contact-adress" style={{ marginTop: "1rem" }}>
            <h4>Advertise property</h4>

            <Link href="/checkout" className="ring">
              Advertise now, price and information
            </Link>
          </div>
          <div
            className="contact-adress"
            style={{ marginTop: "1rem", marginBottom: "2rem" }}
          >
            <h4>Banner advertising</h4>
            <Link href="/contact" className="ring">
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

export default Payments;
