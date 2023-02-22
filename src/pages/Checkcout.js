import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import StripeCheckout from "../components/StripeCheckout";
import AdsForm from "../components/AdsForm";
import { Paper, Stepper, Step, StepLabel } from "@material-ui/core";
import { useFormContext } from "../form_ads_context";
import PageHero from "../components/PageHero";
import { HiArrowCircleDown } from "react-icons/hi";
import { Link } from "react-router-dom";
const steps = ["Ads content", "Confirmation"];

const Checkcout = ({ logedinUser }) => {
  const { activeStep, setActiveStep } = useFormContext();
  return (
    <Wrapper>
      <Paper>
        <Stepper activeStep={activeStep}>
          {steps.map((step) => {
            return (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Paper>
      {activeStep === 0 && <AdsForm setActiveStep={setActiveStep} />}
      {activeStep === 1 && (
        <main
          style={{ background: "#dfe6d8", height: "100%" }}
          className="call-main"
        >
          <PageHero
            icon={<HiArrowCircleDown />}
            title={"Thank you for your ad"}
            subtitle={"We have emailed you an order confirmation"}
            sub2={"with link for payment of your ad."}
            sub3={"The ad is now published on the page."}
            sub4={"Pay for the ad within 2 hours"}
            sub5={"otherwise the ad will be removed."}
            name={".contact-adress"}
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
              <a href="mailto:louiestokk@gmail.com" className="ring">
                ZanziHome.com
              </a>
            </div>
          </section>
        </main>
      )}
    </Wrapper>
  );
};

export default Checkcout;
const Wrapper = styled.section``;
