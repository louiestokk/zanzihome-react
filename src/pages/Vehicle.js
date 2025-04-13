import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button, makeStyles } from "@material-ui/core";
import { villages } from "../utils/data";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SiGooglemaps } from "react-icons/si";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MaterialUIPickers from "../components/MaterialUIPickers";
import { setRentalArea } from "../redux-toolkit/carRentalSlice";
import { useDispatch } from "react-redux";
import { Oval } from "react-loader-spinner";
import { faqVehicle } from "../utils/faq";
import Faq from "../components/Faq";
const useStyles = makeStyles({
  root: {
    position: "relative"
  },
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
  searchBtn: {
    width: "100%",
    margin: "0.5rem auto",
    background: "#0b8b3a",
    fontWeight: "bold",
    letterSpacing: "1px"
  },
  pickContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    fontSize: "1.6rem",
    color: "green"
  },
  iconContainer: {
    marginLeft: "0.75rem"
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
  },
  typeIcons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  img: {
    width: "45px",
    height: "45px",
    objectFit: "cover"
  },
  iconHolder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0.5rem 0.8rem",
    cursor: "pointer"
  },
  para: {
    fontSize: "0.85rem",
    marginTop: "0.2rem"
  },
  horiz: {
    marginBottom: "1rem",
    height: "0.75px",
    background: "lightgray",
    marginTop: "0.5rem"
  },
  vehicleItem: {
    position:'relative',
    background: "rgb(241, 238, 238)",
    cursor: "pointer",
    display: "flex",
    width: "96%",
    margin: "1.5rem auto",
    flexDirection: "column",
    padding: "0.75rem",
    borderRadius: "15px",
    maxWidth: "850px",
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "@media (min-width: 780px)": {
      width: "400px",
      margin: "0.5rem 0.5rem"
    }
  },
  vehicleItemImg: {
    width: "96%",
    objectFit: "cover",
    height: "200px",
    borderRadius: "15px"
  },
  vehicleItemContent: {
    color: "#09366d"
  },
  fetauredImg: {
    objectFit: "cover",
    height: "220px",
    width: "100%"
  },
  allVehiclesContainer: {
    "@media (min-width: 780px)": {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center"
    }
  }
});
const types = [
  {
    typeText: "Car",
    alt: "car rental Zanzibar",
    url: "https://www.svgrepo.com/show/397650/oncoming-automobile.svg"
  },

  {
    typeText: "Motorcycle",
    alt: "motorbike rental Zanzibar",
    url: "https://www.svgrepo.com/show/402171/motorcycle.svg"
  },
  {
    typeText: "Scooter",
    alt: "scooter rental Zanzibar",
    url: "https://www.svgrepo.com/show/490917/scooter-scooter.svg"
  },
  {
    typeText: "Bicycle",
    alt: "bicycle rental Zanzibar",
    url: "https://www.svgrepo.com/show/434020/bicycle.svg"
  }
];

const Vehicle = ({ loading, allVehicle, setallVehicle }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showModal, setshowModal] = useState(false);
  const [filtering, setFiltering] = useState(false);

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Rent Cars and Motorcycles in Zanzibar | Affordable Rentals in Zanzibar",
    description:
      "Car Rental Zanzibar. Explore Zanzibar with our affordable car and motorcycle rentals. From scooters to SUVs, we have the perfect vehicle to fit your needs.",
    image:
      "https://images.pexels.com/photos/787472/pexels-photo-787472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    datePublished: new Date("2023-04-04T09:25:01.340Z").toISOString(),
    author: {
      "@type": "Person",
      name: "Louie Stokk"
    }
  };
  const handleFiltering = (e) => {
    const area = e.target.innerText;
    setallVehicle(allVehicle.filter((el) => el.Area === area));
  };

  return (
    <section className={classes.root}>
      <script type="application/ld+json">
        {JSON.stringify(articleStructuredData)}
      </script>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {"Rent Cars and Motorcycles in Zanzibar | Affordable Rentals in Zanzibar"}
        </title>
        <meta
          name="description"
          content={
            "Car Rental Zanzibar. Explore Zanzibar with our affordable car and motorcycle rentals. From scooters to SUVs, we have the perfect vehicle to fit your needs."
          }
        />
        <meta
          property="og:url"
          content="https://www.zanzihome.com/car-rental-zanzibar"
        />
        <meta
          property="og:description"
          content="Car Rental Zanzibar. Explore Zanzibar with our affordable car and motorcycle rentals. From scooters to SUVs, we have the perfect vehicle to fit your needs."
        />
        <meta
          property="og:image"
          content="https://images.pexels.com/photos/787472/pexels-photo-787472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <link
          rel="canonical"
          href="https://www.zanzihome.com/car-rental-zanzibar"
        />
      </Helmet>
      <div
        className={classes.bookingBox}
        onClick={() => setshowModal(!showModal)}
      >
        <div className={classes.iconContainer}>
          <SiGooglemaps className={classes.icon} />
        </div>
        <div className={classes.bookingBoxText}>
          <p className={classes.bookingBoxH}>Add location</p>
          <p className={classes.bookingBoxp}>Add date and time</p>
        </div>
      </div>
      <div className={classes.typeIcons}>
        {types?.map((type, i) => (
          <div
            key={i}
            className={classes.iconHolder}
            onClick={(e) => {
              const currentType = e.currentTarget.children[1].innerText;
              setFiltering(currentType);
            }}
          >
            <img
              loading="lazy"
              src={type.url}
              alt={type.alt}
              title={type.alt}
              className={classes.img}
            />
            <p className={classes.para}>{type.typeText}</p>
          </div>
        ))}
      </div>
      <div className={classes.horiz}></div>
      <div
        className={classes.pickContainer}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: 10000,
            top: "5%",
            right: "6%"
          }}
        >
          <FaMapMarkerAlt style={{ color: "green" }} />
        </div>
        <div className={classes.areaPickUp}>
          <Autocomplete
            onChange={(e) => {
              e.preventDefault();
              dispatch(setRentalArea(e.target.innerText));
              handleFiltering(e);
            }}
            background="white"
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={villages.map((option) => option)}
            renderInput={(params) => (
              <TextField
                style={{
                  width: "96%",
                  margin: "0.1rem 0.5rem",
                  background: "white",
                  borderRadius: "5px",
                  padding: "0.5rem",
                  border: "0.5px solid lightgray",
                  textAlign: "center"
                }}
                {...params}
                placeholder="  Where do you want to rent?"
                margin="normal"
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                  disableUnderline: true
                }}
              />
            )}
          />
        </div>
        <MaterialUIPickers />
        <Button
          onClick={() => {
            setshowModal(!showModal);
          }}
          variant="contained"
          color="secondary"
          className={classes.searchBtn}
        >
          Search
        </Button>
      </div>
      <div className={classes.allVehiclesContainer}>
        {loading && (
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        )}
        {allVehicle?.map((el, i) => {
          if (el.removed) return;
          if (filtering === "Car") {
            if (el.category !== "Car") return;
          }
          if (filtering === "Motorcycle") {
            if (el.category !== "Motorcycle") return;
          }
          if (filtering === "Scooter") {
            if (el.category !== "Scooter") return;
          }
          if (filtering === "Bicycle") {
            if (el.category !== "Bicycle") return;
          }
          return (
            <div key={i} className={classes.vehicleItem}>
           <h5 style={{width:'96%'}}>20% discount monthly rent</h5>
              <Link to={`/cars/${el.id}`}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    loading="lazy"
                    src={el.uri}
                    alt="car rental Zanzibar"
                    title="car rental Zanzibar"
                    className={classes.vehicleItemImg}
                  />
                </div>

                <div className={classes.vehicleItemContent}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "1rem 1.2rem"
                    }}
                  >
                    <h3>{el.Title}</h3>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center"
                      
                      }}
                    >
                      <h3 style={{marginLeft:'0.2rem'}}>{el.Price}</h3>
                      <p style={{marginLeft:'0.2rem'}}>$/day</p>
                    </div>
                  </div>

                  <section
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "2rem 0"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "1rem"
                      }}
                    >
                      <img
                        src="https://www.svgrepo.com/show/509193/people.svg"
                        style={{ width: "20px", height: "20px" }}
                        loading="lazy"
                        alt="car rental Zanzibar"
                        title="car rental Zanzibar"
                      />
                      <p style={{ marginLeft: "0.3rem", fontWeight: "bold" }}>
                        {el.People}
                      </p>
                    </div>
                    {el.category === "Car" && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: "1rem"
                        }}
                      >
                        <img
                          src="https://www.svgrepo.com/show/460629/car-door-4.svg"
                          style={{ width: "20px", height: "20px" }}
                          loading="lazy"
                          alt="car rental Zanzibar"
                          title="car rental Zanzibar"
                        />
                        <p style={{ marginLeft: "0.3rem", fontWeight: "bold" }}>
                          {el.Doors}
                        </p>
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "1rem"
                      }}
                    >
                      <img
                        src="https://www.svgrepo.com/show/322423/gear-stick-pattern.svg"
                        style={{ width: "20px", height: "20px" }}
                        loading="lazy"
                        alt="car rental Zanzibar"
                        title="car rental Zanzibar"
                      />
                      <p style={{ marginLeft: "0.3rem", fontWeight: "bold" }}>
                        {el.Gear === "" ? "Automatic" : el.Gear}
                      </p>
                    </div>
                    {el.category === "Car" && el.AC === "Yes" && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: "1rem"
                        }}
                      >
                        <img
                          src="https://www.svgrepo.com/show/453850/snow.svg"
                          style={{ width: "20px", height: "20px" }}
                          loading="lazy"
                          alt="car rental Zanzibar"
                          title="car rental Zanzibar"
                        />
                        <p style={{ marginLeft: "0.3rem", fontWeight: "bold" }}>
                          A/C
                        </p>
                      </div>
                    )}
                  </section>
                </div>
                <Button style={{background:'#22c55e',color:'white', width:'100%',margin:'1rem 0'}} variant="contained">Book Now Pay Later</Button>
              </Link>
            </div>
          );
        })}
      </div>
      <div style={{height:'30px'}}></div>
      <div style={{ background: "#F8F8F8", padding: "1rem" }}>
        <h2 style={{ margin: "1rem auto", maxWidth: "85%" }}>
          Rent a car in Zanzibar Eazy and Secure. We deliver the vehicle to you!
        </h2>
        <div
          style={{
            marginLeft: "1.5rem",
            marginBottom: "1rem",
            marginTop: "2rem"
          }}
        >
          <h3>All rental periods are insured</h3>
          <p style={{marginTop:'0.15rem'}}>All rental periods are insured 24/7.</p>
        </div>
        <div style={{ marginLeft: "1.5rem", marginBottom: "1rem" }}>
          <h3>Cars for all occasions</h3>
          <p style={{ maxWidth: "90%",marginTop:'0.15rem' }}>
            There are all types of cars and models. From SUVs to spacious family
            cars, then cars and station wagons.
          </p>
        </div>
        <div style={{ marginLeft: "1.5rem", marginBottom: "1rem" }}>
          <h3>We deliver the vehicle</h3>
          <p style={{ maxWidth: "90%",marginTop:'0.15rem' }}>
            We will deliver the vehicle to your hotel or airport.
          </p>
        </div>
      </div>
      <div style={{height:'30px'}}></div>
      <Faq data={faqVehicle} />
      <div style={{height:'10px'}}></div>
      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <h1
          className="poppins"
          style={{ maxWidth: "85%", margin: "1rem auto" }}
        >
          Rent a Car in Zanzibar and Explore the Island with Ease - Book Now for
          the Best Deals!
        </h1>
        <p
          className="sans"
          style={{
            maxWidth: "90%",
            margin: "0rem auto",
            lineHeight: "25px",
            color: "black"
          }}
        >
          Experience the beauty and culture of Zanzibar at your own pace with a
          rental car. With stunning beaches, historic architecture, and unique
          culture, Zanzibar is a destination that demands exploration. By
          renting a car, you can easily travel from one site to the next and get
          off the beaten path to discover hidden gems. At Zanzihome.com, we
          offer a wide range of rental cars to suit your needs and budget. From
          economy to luxury vehicles, our fleet is well-maintained and regularly
          serviced for your safety and comfort. Our rental process is quick and
          easy, so you can spend less time worrying about logistics and more
          time enjoying your trip. Driving in Zanzibar is generally safe,
          although it's important to be aware of local driving habits and road
          conditions. Many roads are unpaved and can be bumpy, but they are
          generally passable with a standard vehicle. We recommend staying alert
          and driving defensively, especially in more populated areas. When you
          rent a car with Zanzihome.com, you have the freedom to explore the
          island at your leisure. Drive along the coastline and stop at some of
          the island's beautiful beaches, such as Nungwi or Paje. Head inland to
          explore the Jozani Chwaka Bay National Park, home to the red colobus
          monkey and other wildlife. Or, visit Stone Town, a UNESCO World
          Heritage site that offers a glimpse into Zanzibar's rich history and
          culture. Renting a car in Zanzibar is an affordable and convenient way
          to make the most of your trip. With Zanzihome.com, you can enjoy peace
          of mind knowing you're getting a quality rental car at a fair price.
          Book your rental car today and get ready for an unforgettable
          adventure in Zanzibar!
        </p>

        <div style={{ margin: "2rem 0" }}>
          <h2 className="best-airmax-text">Very good</h2>
          <p>
            Based on <strong> 379 reviews</strong>
          </p>
          <img
            src="https://www.snijpunt.com/files/thumbnails/trustpilot-logo-snijpunt.1600x680x1.png"
            alt="trustpilot"
            style={{ height: "120px", width: "300px", objectFit: "cover" }}
          />
        </div>
      </div>
     
    </section>
  );
};

export default Vehicle;
