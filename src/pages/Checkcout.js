import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import StripeCheckout from "../components/StripeCheckout";
import AdsForm from "../components/AdsForm";
import { Paper, Stepper, Step, StepLabel } from "@material-ui/core";
import { useFormContext } from "../form_ads_context";
import PageHero from "../components/PageHero";
import { HiArrowCircleDown } from "react-icons/hi";
import { Link } from "react-router-dom";
import PaypalCheckout from "../components/PaypalCheckout";
const steps = ["Ad", "Confirmation"];

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
      {/* {activeStep === 1 && <PaypalCheckout setActiveStep={setActiveStep} />} */}
      {activeStep === 1 && (
        <main>
          <PageHero
            title={"Thank you for your ad!"}
            subtitle={"We have emailed you an confirmation."}
            sub3={"The ad is now published on the page."}
            sub4={
              "Log in with the same email you created the ad with. You can log in directly with Google and Facebook or create an account. When you are logged in, you can edit your ad and add more images."
            }
            name={".contact-adress"}
          />
        </main>
      )}
    </Wrapper>
  );
};

export default Checkcout;
const Wrapper = styled.section``;
