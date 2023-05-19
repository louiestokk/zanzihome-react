import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { MdOutlineDateRange } from "react-icons/md";
import { Helmet } from "react-helmet-async";
const useStyles = makeStyles({
  bookingBox: {
    height: "4rem",
    border: "1px solid lightgray",
    borderRadius: "20px",
    width: "90%",
    margin: "0.75rem auto",
    display: "flex",
    alignItems: "center",
    cursor: "pointer"
  },
  iconContainer: {
    marginLeft: "0.75rem"
  },
  icon: {
    fontSize: "1.6rem",
    color: "green"
  },
  bookingBoxText: {
    marginLeft: "1rem",
    letterSpacing: "0.5px"
  },
  bookingBoxH: {
    fontWeight: "bold"
  },
  bookingBoxp: {
    color: "gray"
  }
});
const Tours = () => {
  const classes = useStyles();
  const [showModal, setshowModal] = useState(false);

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Zanzibar Tours and Safaris: Explore the Beauty of Africa's Paradise",
    description:
      "Embark on an unforgettable journey with Zanzibar tours and safaris. Explore pristine beaches, encounter diverse wildlife, and immerse yourself in the enchanting culture",
    image:
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/fe/13/eb.jpg",
    datePublished: new Date("2023-05-18T09:25:01.340Z").toISOString(),
    author: {
      "@type": "Person",
      name: "Louie Stokk"
    }
  };
  return (
    <div>
      <script type="application/ld+json">
        {JSON.stringify(articleStructuredData)}
      </script>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {
            "Zanzibar Tours and Safaris: Explore the Beauty of Africa's Paradise"
          }
        </title>
        <meta
          name="description"
          content={
            "Embark on an unforgettable journey with Zanzibar tours and safaris. Explore pristine beaches, encounter diverse wildlife, and immerse yourself in the enchanting culture"
          }
        />
        <meta
          property="og:url"
          content="https://www.zanzihome.com/tours-zanzibar"
        />
        <meta
          property="og:description"
          content="Embark on an unforgettable journey with Zanzibar tours and safaris. Explore pristine beaches, encounter diverse wildlife, and immerse yourself in the enchanting culture"
        />
        <meta
          property="og:image"
          content="https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/fe/13/eb.jpg"
        />
        <link rel="canonical" href="https://www.zanzihome.com/tours-zanzibar" />
      </Helmet>
      <div
        className={classes.bookingBox}
        onClick={() => setshowModal(!showModal)}
      >
        <div className={classes.iconContainer}>
          <MdOutlineDateRange className={classes.icon} />
        </div>
        <div className={classes.bookingBoxText}>
          <p className={classes.bookingBoxH}>Add date</p>
          <p className={classes.bookingBoxp}>Add persons</p>
        </div>
      </div>
    </div>
  );
};

export default Tours;
// useStory
// kund skall kunna välja datum och antal personer
// kund skall kunna fråga kundtjänst om touren
// bläddra bland olika tours
// boka och betala för en tour
// får en ordernekräftelse på sin bokade tour
// skall kunna ringa in till mig/kundtjänst eller maial och få hjälp med att boka
// lägga review

// tour arrangör
// skall kunna annonsera det han arrangerar /tour
// pris, plats, uppsamlingsplats, möjlighet till att bli hämtad, duration,
// lägga in vad som ingår i turen och description av touren
// what to expect

// Jag behöver av gerrad några som arrangerar tours eller kika sök på google och hitta någon med hemsida
