import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import StripeCheckout from "../components/StripeCheckout";
import AdsForm from "../components/AdsForm";
import { Paper, Stepper, Step, StepLabel } from "@material-ui/core";
import { useFormContext } from "../form_ads_context";
import PageHero from "../components/PageHero";
import { HiArrowCircleDown } from "react-icons/hi";
import { Link } from "react-router-dom";
import PaypalCheckout from "../components/PaypalCheckout";
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
        <main>
          <PageHero
            title={"Thank you for your ad"}
            subtitle={"We have emailed you an order confirmation"}
            sub2={"with link for payment of your ad."}
            sub3={"The ad is now published on the page."}
            sub4={"Pay for the ad within 6 hours"}
            sub5={"otherwise the ad will be removed."}
            name={".contact-adress"}
          />
          {/* <PaypalCheckout /> */}
        </main>
      )}
    </Wrapper>
  );
};

export default Checkcout;
const Wrapper = styled.section``;
