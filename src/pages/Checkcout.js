import React from "react";
import styled from "styled-components";
import StripeCheckout from "../components/StripeCheckout";
import AdsForm from "../components/AdsForm";
import { Paper, Stepper, Step, StepLabel } from "@material-ui/core";
import { useFormContext } from "../form_ads_context";

const steps = ["Ads content", "Payment"];

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
      {activeStep === 1 && <AdsForm setActiveStep={setActiveStep} />}
      {activeStep === 0 && (
        <StripeCheckout
          setActiveStep={setActiveStep}
          logedinUser={logedinUser}
        />
      )}
    </Wrapper>
  );
};

export default Checkcout;
const Wrapper = styled.section``;
