import React from "react";
import { pageData } from "./data";
const BuyersGuide = () => {
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Guide: Buy property in Zanzibar",
    description:
      "We will summarize everything you need to know to make an informed decision about purchasing a property on the island Zanzibar. From understanding the buying process to navigating local regulations, we have got you covered.",
    image:
      "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    datePublished: new Date("2023-04-04T09:25:01.340Z").toISOString(),
    author: {
      "@type": "Person",
      name: "Louie Stokk"
    }
  };
  return (
    <div style={{ marginTop: "2rem", height: "100%" }} className="poppins">
      <script type="application/ld+json">
        {JSON.stringify(articleStructuredData)}
      </script>
      <h1
        style={{
          fontSize: "1.3rem",
          marginBottom: "0.5rem",
          marginLeft: "0.5rem"
        }}
      >
        {pageData.pageTitel}
      </h1>
      <div style={{ position: "relative" }}>
        <img
          src="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="buy property in Zanzibar"
          loading="lazy"
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
        <article style={{ position: "absolute", top: "20%", left: "1.5%" }}>
          <h4
            style={{
              background: "white",
              padding: "0.5rem",
              borderRadius: "5px",
              boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px"
            }}
          >
            {pageData.whitebannerText}
          </h4>
          <button
            onClick={() => (window.location.href = "/")}
            style={{
              background: "black",
              color: "white",
              width: "10rem",
              height: "2.2rem",
              fontWeight: "bold"
            }}
          >
            {pageData.btntext}
          </button>
        </article>
      </div>
      <p
        style={{
          fontSize: "0.85rem",
          maxWidth: "1000px",
          margin: "0.5rem 0.5rem",
          lineHeight: "23px"
        }}
      >
        {pageData.underImgText}
      </p>
      <div
        style={{
          margin: "1rem 0.5rem"
        }}
      >
        <h3>{pageData.titleOne}</h3>
        <p
          style={{
            fontSize: "0.85rem",
            maxWidth: "1000px",
            margin: "0.5rem 0rem",
            lineHeight: "23px"
          }}
        >
          {pageData.textOne}
        </p>
      </div>
      <div
        style={{
          margin: "1rem 0.5rem"
        }}
      >
        <h3>{pageData.titleTwo}</h3>
        <p
          style={{
            fontSize: "0.85rem",
            maxWidth: "1000px",
            margin: "0.5rem 0rem",
            lineHeight: "23px"
          }}
        >
          {pageData.textTwo}
        </p>
        <article style={{ maxWidth: "1000px" }}>
          <h3 style={{ marginTop: "1rem" }}>
            Step-by-step guide explaining what foreigners need to do to purchase
            property in Zanzibar.
          </h3>
          <ul>
            <li>
              <strong>1. </strong>
              Identify a reputable local real estate agent or lawyer who is
              familiar with the buying process and can guide you through the
              necessary steps.
            </li>
            <li>
              <strong>2. </strong> Research the local real estate market and
              identify suitable properties that meet your needs and budget.
            </li>
            <li>
              <strong>3. </strong> Contact the seller and negotiate the purchase
              price and terms of the sale.
            </li>
            <li>
              <strong>4. </strong> Obtain a certificate of 'no objection' from
              the Zanzibar Investment Promotion Authority (ZIPA) before
              purchasing any property. This certificate confirms that the
              property does not pose any security or other concerns, and is
              typically obtained through your lawyer or agent.
            </li>
            <li>
              <strong>5. </strong> Sign a Sales Agreement with the seller and
              pay a deposit, typically 10% of the purchase price.
            </li>
            <li>
              <strong>6. </strong> Hire a surveyor to conduct a property survey
              and verify the boundaries and other details of the property.
            </li>
            <li>
              <strong>7. </strong> Obtain an official valuation report of the
              property from a licensed valuer, which is required by the Zanzibar
              Revenue Board.
            </li>
            <li>
              <strong>8. </strong> Apply for a Land Lease, which grants the
              right to use the land on which the property is located for a
              specified period of time. This lease is typically obtained through
              your lawyer or agent.
            </li>
            <li>
              <strong>9. </strong> Pay the 5% stamp duty fee on the purchase
              price of the property, which is payable to the Zanzibar Revenue
              Board and is typically collected by the seller on behalf of the
              buyer.
            </li>
            <li>
              <strong>10. </strong> Complete the purchase by paying the
              remaining balance to the seller and transferring ownership of the
              property to your name.
            </li>
          </ul>
          <p
            style={{
              fontSize: "0.85rem",
              maxWidth: "1000px",
              margin: "0.5rem 0.5rem",
              lineHeight: "23px"
            }}
          >
            Overall, purchasing property in Zanzibar as a foreigner involves
            working with a local lawyer or real estate agent, obtaining a
            certificate of no objection, paying stamp duty fees, and complying
            with local regulations related to property ownership and use. With
            careful research and guidance, however, buying real estate in
            Zanzibar can be a rewarding investment opportunity.
          </p>
        </article>
      </div>
    </div>
  );
};

export default BuyersGuide;
