import React from "react";
import PageHero from "../components/PageHero";
import { HiArrowCircleDown } from "react-icons/hi";
const contact = () => {
  return (
    <>
      <PageHero
        icon={<HiArrowCircleDown />}
        title={"Customer service & contact"}
        subtitle={" Zanzihome is one of the"}
        sub2={"largest"}
        sub3={"platforms for buying and selling properties."}
        sub4={"You are warmly welcome"}
        sub5={"to visit us or contact us"}
        name={".ads-prices-text-btn"}
        // åvan skall det vara classen på det du skall scrola till
      />
      <section>
        <article>
          <div>
            <h4>Visiting address</h4>
            <p>Zanzihome.com / Stokk Tech Limited</p>
            <p>Paje njia ya mshez</p>
            <p>Paje - Zanziba - Tanzania</p>
          </div>
        </article>
        <article></article>
      </section>
    </>
  );
};

export default contact;
