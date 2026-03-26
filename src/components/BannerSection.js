import React from "react";
import { useHistory } from "react-router-dom";

const BannerSection = () => {
  const history = useHistory();

  return (
    <div>

      {/* ✅ HERO SECTION (H1 + SEARCH FEEL + SEO) */}
      <section
        style={{
          position: "relative",
          height: "320px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          marginBottom: "2rem"
        }}
      >
        {/* Background */}
        <img
          src="https://images.pexels.com/photos/14667295/pexels-photo-14667295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Real estate in Zanzibar - houses, villas, apartments and land"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
            zIndex: 0
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.45)",
            zIndex: 1
          }}
        />

        {/* Content */}
        <div style={{ zIndex: 2, padding: "1rem" }}>
          {/* ✅ H1 (SUPER VIKTIG SEO) */}
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Property for Sale & Rent in Zanzibar
          </h1>

          <p style={{ maxWidth: "600px", margin: "0 auto", lineHeight: "26px" }}>
            Find houses, villas, apartments and land for sale or rent in Zanzibar.
            Discover beachfront properties, investment opportunities and your dream home today.
          </p>

          {/* CTA BUTTON */}
          <button
            onClick={() => history.push("/properties-zanzibar")}
            style={{
              marginTop: "1.5rem",
              background: "#0b8b3a",
              color: "white",
              border: "none",
              padding: "0.8rem 1.6rem",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Browse Properties
          </button>
        </div>
      </section>

      {/* ✅ MAIN CONTENT (CENTERED LIKE HEMNET) */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}
      >
        {/* ✅ PROPERTY BANNER */}
      <section
  className="zanzibar-real-estate-section"
  onClick={() => history.push("/properties-zanzibar")}
>
  <div className="content">
    <span className="badge">Updated Monthly • 10,000+ Users</span>

    <h2 style={{margin: '0.5rem 0'}}>
      Buy & Rent Real Estate in Zanzibar – Villas, Apartments & Land
    </h2>

    <p style={{lineHeight:'24px'}}>
      Discover premium and verified real estate listings across Zanzibar,
      including beachfront villas, modern apartments, land plots and
      commercial properties. Thousands of buyers and investors trust
      ZanziHome every month to find their perfect property in Zanzibar.
    </p>

    <div className="cta">
      Explore Properties →
    </div>
  </div>
</section>

   
       <section
       className="abbas"
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
            <h2
              style={{ color: "white", fontSize: "5rem", letterSpacing: "1px" }}
            >
              Free
            </h2>
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

       <section
       className="abbas"
        onClick={() => history.push("/properties-zanzibar")}
        style={{
          padding: "0.8rem",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
        }}
      >
        <div
          className="filter-filter-holder-second"
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
          </div>
        </div>
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
        Find properties in Zanzibar as houses, plots and apartments for sale or for rent. Zanzihome offers a wide selection of properties in Zanzibar to choose from.
          {/* Advertise your own property or your vehicle. Or maybe you drive taxi,
          arrange tours and safaris and want more customers. Get started today,
          it's super easy. */}
        </p>
      </section>
      </div>

    </div>
  );
};

export default BannerSection;