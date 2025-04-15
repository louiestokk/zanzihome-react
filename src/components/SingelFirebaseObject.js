import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import SingelObjectInfo from "./SingelObjectInfo";
import Brokers from "./Brokers";
import { useUserContext } from "../user_context";
import { useSelector } from "react-redux";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import Karusell from "./Karusell";
import RelatedObjects from "./RelatedObjects";
import { makeStyles } from "@material-ui/core";
import Abovefooter from "./Abovefooter";
import { Helmet } from "react-helmet-async";
import Faq from "./Faq";
import SingelPageMap from "./SingelPageMap";
import SingeldefaultMapMapPage from "./SingeldefaultMapMapPage";
import LeadsMain from "./leads/LeadsMain";
import AdBanner from "./AdBanner";
import {faqdata} from '../utils/faq'
import {pageData} from '../pages/guides/data'
const useStyles = makeStyles({});
const SingelFirebaseObject = () => {
  const classes = useStyles();
  const location = useLocation();
  const firestoreData = useSelector(getFirestoreData);
  const { saved, setSaved, user, loginWithRedirect } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [recivied, setRecivied] = useState(false);
  const { adId } = useParams();
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Buy Property Zanzibar - Properties for Sale and Rent in Zanzibar",
    description:
      "Buy Property Zanzibar - Properties for Sale and Rent in Zanzibar. Discover Your Dream Property for Sale in Zanzibar. Advertise Your Property on Zanzihome Today! Your One-Stop Property Marketplace!",
    image:
      "https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    datePublished: new Date("2023-04-04T09:25:01.340Z").toISOString(),
    author: {
      "@type": "Person",
      name: "Louie Stokk"
    }
  };
  return (
    <div>
      <div className="new-singel-obj-width">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{"Buy Property Zanzibar - Properties for Sale and Rent in Zanzibar"}</title>
          <meta
            name="description"
            content={
              "Buy Property Zanzibar - Properties for Sale and Rent in Zanzibar. Find properties for sale in Zanzibar as houses, plots, apartments and businesses for sale or for rent in Zanzibar."
            }
          />
          <meta property="og:url" content="https://www.zanzihome.com" />
          <meta
            property="og:description"
            content="Discover Your Dream Property for Sale in Zanzibar! Find properties for sale in Zanzibar as houses, plots, apartments and businesses for sale or for rent in Zanzibar."
          />
          <meta
            property="og:image"
            content="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </Helmet>
        {firestoreData.map((object) => {
          const {
            Name,
            Email,
            Phone,
            Sell,
            Area,
            Adress,
            Rent,
            top3,
            rocket3,
            rocket10,
            top10,
            category,
            Zip,
            Title,
            Text,
            Price,
            adId,
            About,
            Size,
            lat,
            lng,
            Rooms,
            uri,
            imagesArray
          } = object;
          if (!location.pathname.includes(adId)) return;
          return (
            <div className="singel-object-container" key={adId}>
              <script type="application/ld+json">
                {JSON.stringify(articleStructuredData)}
              </script>
              <div className="singel-object">
                <div className="single-object-img-container">
                  {imagesArray && imagesArray.length > 1 ? (
                    <Karusell imagesArray={imagesArray} uri={uri} />
                  ) : (
                    <img
                      src={uri}
                      style={{
                        backgroundPosition: "center",
                        maxHeight: "500px",
                        objectFit: "cover",
                        maxWidth: "700px"
                      }}
                      alt={`Properties for sale in ${Area}, Zanzibar`}
                      title={`Properties for sale in ${Area}, Zanzibar`}
                    />
                  )}
                </div>
                <div
                  className={showLoginModal ? "not-loggedin-modal" : "hidden"}
                >
                  <h3>Log in to save items</h3>
                  <button
                    className="nav-login-container inte-inloggad-btn"
                    onClick={loginWithRedirect}
                  >
                    <FiUser />
                    Login
                  </button>
                </div>
                <div className="singel-object-heartmap">
                  <button
                    style={{ color: "black" }}
                    onClick={(e) => {
                      if (user?.nickname) {
                        e.currentTarget.children[0].classList.toggle(
                          "fill-hjarta"
                        );
                        e.currentTarget.style.background = "#dfe6d8";
                        setSaved(!saved);

                        localStorage.setItem("zanzihomeSaved", adId);
                      } else {
                        e.currentTarget.textContent =
                          "You have to login to save";
                      }
                    }}
                    // style={{ background: `${green ? "#dfe6d8" : ""}` }}
                  >
                    <AiFillHeart className="hjarta" />
                    Save
                  </button>
                </div>
                <div className="singel-object-info">
                  <h2>
                    {category === "Hand" ? "Land" : category} In {Area}
                  </h2>
                  <p>{Title}</p>

                  <button onClick={() => {}} className="map-btn-singel-object">
                    Se on map
                  </button>
                  <h4 className="singel-object-price">
                    {Sell === null && Rent === null
                      ? `${Price}.00$`
                      : `${Price}$/month`}
                  </h4>
                </div>
                {/* <div className="bid-div">{bid && <Bid bid={bid} />}</div> */}

                <div className="divider-singel-object"></div>
                <div className="jjj">
                  <div className="singel-object-fact">
                    <div className="col-1">
                      <div>
                        <ul className="ul-title">
                          <li>Type</li>
                          <li>Size</li>
                          <li>{"Rooms"}</li>
                          <li>Price</li>
                        </ul>
                      </div>
                      <div>
                        <ul className="ul-besk">
                          <li>{category === "Hand" ? "Land" : category}</li>
                          <li>{Size} sq.m</li>
                          <li>{Rooms && Rooms}</li>
                          <li style={{ letterSpacing: "3px" }}>
                            {Sell === null && Rent === null
                              ? `${Price}.00$`
                              : `${Price}$/month`}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <SingelObjectInfo
                    info={Text}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    recivied={recivied}
                  />
                </div>
              </div>
              <div className="divider-singel-object"></div>
              <div className="broker-contact-div">
                <Brokers
                  contact={Name}
                  agency={Name}
                  number={Phone}
                  // logo={"logo"}
                  email={Email}
                />
              </div>
              {/* <h5 className="sameoffice">For sale from the same office</h5> */}
              <div className="divider-singel-object"></div>
              <div className="brokers-divider"></div>
              <SingelPageMap
                Area={Area}
                userCoords={[Number(lat), Number(lng)]}
                Title={Title}
              />
              <SingeldefaultMapMapPage
                Area={Area}
                userCoords={[Number(lat), Number(lng)]}
              />
            </div>
          );
        })}
        <div style={{margin:'1rem 0'}}>
          <RelatedObjects adId={adId} />
          <Faq data={faqdata} />  
        </div>
      </div>
      <div style={{marginTop:'1.5rem',padding:'1rem'}}>
            <h1
                      style={{
                        fontSize: "1.5rem",
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
      <AdBanner />
      <Abovefooter />
    </div>
  );
};

export default SingelFirebaseObject;
