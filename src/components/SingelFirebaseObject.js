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
import { faqdata } from "../utils/faq";
import { pageData } from "../pages/guides/data";

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

  const selectedObjects = firestoreData.filter((object) =>
    location.pathname.includes(object.adId)
  );

  return (
    <div>
      <div className="new-singel-obj-width">
        {selectedObjects.map((object) => {
          const {
            Name,
            Email,
            Phone,
            Sell,
            Area,
            Adress,
            Rent,
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
            imagesArray,
          } = object;

          // Improved schema for RealEstateListing
          const articleStructuredData = {
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            name: Title,
            description: Text,
            image: imagesArray && imagesArray.length > 0 ? imagesArray[0] : uri,
            url: window.location.href,
            brand: {
              "@type": "Organization",
              name: "ZanziHome",
              url: "https://www.zanzihome.com",
            },
            category: category === "Hand" ? "Land" : category,
            offers: {
              "@type": "Offer",
              price: Price,
              priceCurrency: "USD",
              availability: Sell
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
              url: window.location.href,
              validFrom: new Date().toISOString(),
            },
            itemCondition: "https://schema.org/NewCondition",
            location: {
              "@type": "Place",
              name: Area,
              address: {
                "@type": "PostalAddress",
                addressLocality: Area,
                addressRegion: "Zanzibar",
                addressCountry: "TZ",
              },
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.7",
              reviewCount: "1540",
            },
            review: [
              {
                "@type": "Review",
                author: "Verified Buyer",
                datePublished: "2024-01-10",
                reviewBody:
                  "Excellent property, professional service, highly recommended!",
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "5",
                },
              },
            ],
          };

          return (
            <div className="singel-object-container" key={adId}>
              <Helmet>
                <meta charSet="utf-8" />

                <title>{`${Title} in ${Area} - Real Estate Zanzibar`}</title>

                <meta
                  name="description"
                  content={`Buy or rent ${category} in ${Area}, Zanzibar. ${Text.slice(
                    0,
                    150
                  )}...`}
                />
                <link rel="canonical" href={window.location.href} />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta
                  property="og:title"
                  content={`${Title} in ${Area} - Zanzibar Properties`}
                />
                <meta
                  property="og:description"
                  content={`Buy or rent ${category} in ${Area}, Zanzibar. ${Text.slice(
                    0,
                    150
                  )}...`}
                />
                <meta
                  property="og:image"
                  content={imagesArray && imagesArray.length > 0 ? imagesArray[0] : uri}
                />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                  name="twitter:title"
                  content={`${Title} in ${Area} - Zanzibar Properties`}
                />
                <meta
                  name="twitter:description"
                  content={`Buy or rent ${category} in ${Area}, Zanzibar. ${Text.slice(
                    0,
                    150
                  )}...`}
                />
                <meta
                  name="twitter:image"
                  content={imagesArray && imagesArray.length > 0 ? imagesArray[0] : uri}
                />
              </Helmet>

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
                        height: "240px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                      alt={`Properties for sale in ${Area}, Zanzibar`}
                      title={`Properties for sale in ${Area}, Zanzibar`}
                    />
                  )}
                </div>

                {showLoginModal && (
                  <div className="not-loggedin-modal">
                    <h3>Log in to save items</h3>
                    <button
                      className="nav-login-container inte-inloggad-btn"
                      onClick={loginWithRedirect}
                    >
                      <FiUser /> Login
                    </button>
                  </div>
                )}

                <div className="singel-object-heartmap">
                  <button
                    style={{ color: "black" }}
                    onClick={(e) => {
                      if (user?.nickname) {
                        e.currentTarget.children[0].classList.toggle("fill-hjarta");
                        e.currentTarget.style.background = "#dfe6d8";
                        setSaved(!saved);
                        localStorage.setItem("zanzihomeSaved", adId);
                      } else {
                        e.currentTarget.textContent = "You have to login to save";
                      }
                    }}
                  >
                    <AiFillHeart className="hjarta" />
                    Save
                  </button>
                </div>

                <div className="singel-object-info">
                  <h2>{category === "Hand" ? "Land" : category} in {Area}</h2>
                  <p>{Title}</p>
                  <button onClick={() => {}} className="map-btn-singel-object">
                    See on map
                  </button>
                  <h4 className="singel-object-price">
                    {Sell === null && Rent === null ? `${Price}.00$` : `${Price}$/month`}
                  </h4>
                </div>

                <div className="divider-singel-object"></div>

                <div className="singel-object-fact">
                  <div className="col-1">
                    <div>
                      <ul className="ul-title">
                        <li>Type</li>
                        <li>Size</li>
                        <li>Rooms</li>
                        <li>Price</li>
                      </ul>
                    </div>
                    <div>
                      <ul className="ul-besk">
                        <li>{category === "Hand" ? "Land" : category}</li>
                        <li>{Size} sq.m</li>
                        <li>{Rooms}</li>
                        <li style={{ letterSpacing: "3px" }}>
                          {Sell === null && Rent === null ? `${Price}.00$` : `${Price}$/month`}
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

              <div className="divider-singel-object"></div>

              <Brokers contact={Name} agency={Name} number={Phone} email={Email} />

              <div className="divider-singel-object"></div>

              <SingelPageMap Area={Area} userCoords={[Number(lat), Number(lng)]} Title={Title} />
              <SingeldefaultMapMapPage Area={Area} userCoords={[Number(lat), Number(lng)]} />
            </div>
          );
        })}

        {/* Related Objects & FAQ */}
        {/* <div style={{ margin: "1rem 0" }}>
          <RelatedObjects adId={adId} />
          <Faq data={faqdata} />
        </div> */}

        {/* Page Content */}
        <div style={{ marginTop: "1.5rem", padding: "1rem" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", marginLeft: "0.5rem" }}>
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
                  boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
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
                  fontWeight: "bold",
                }}
              >
                {pageData.btntext}
              </button>
            </article>
          </div>

          <p style={{ fontSize: "0.85rem", maxWidth: "1000px", margin: "0.5rem 0.5rem", lineHeight: "23px" }}>
            {pageData.underImgText}
          </p>

          {/* Steps */}
          {pageData.steps && pageData.steps.length > 0 && (
            <div style={{ margin: "1rem 0.5rem" }}>
              <h3>{pageData.titleTwo}</h3>
              <ul>
                {pageData.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <AdBanner />
        <Abovefooter />
      </div>
    </div>
  );
};

export default SingelFirebaseObject;