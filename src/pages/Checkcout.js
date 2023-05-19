import React, { useState } from "react";
import styled from "styled-components";
import AdsForm from "../components/AdsForm";
import { Paper, Stepper, Step, StepLabel } from "@material-ui/core";
import { useFormContext } from "../form_ads_context";
import PageHero from "../components/PageHero";
const steps = ["Category", "Ad", "Confirmation"];

const Checkcout = ({ logedinUser }) => {
  const [adType, setadType] = useState(null);
  const { activeStep, setActiveStep } = useFormContext();
  const Category = () => {
    const types = [
      {
        title: "Properties",
        icon: "https://www.svgrepo.com/show/485294/house.svg",
        description:
          "For example, houses, apartments, plots, bungalows or businesses"
      },
      {
        title: "Vehicle",
        icon: "https://www.svgrepo.com/show/397650/oncoming-automobile.svg",
        description: "For example, cars, motorbikes, scooters or bicycles"
      }
      // {
      //   title: "Tours",
      //   icon: "https://www.svgrepo.com/show/368341/speedboat.svg",
      //   description: "For example tours, safaris and activities"
      // },
      // {
      //   title: "Taxi",
      //   icon: "https://www.svgrepo.com/show/398448/taxi.svg",
      //   description: "To be able to book a taxi or airport transfer"
      // }
    ];
    return (
      <div>
        <h1 style={{ textAlign: "center", margin: "1rem 0" }}>
          What do you want to advertise?
        </h1>
        <div>
          {types?.map((el, i) => {
            return (
              <section
                onClick={() => {
                  setadType(el.title);
                  setActiveStep(1);
                }}
                key={i}
                style={{
                  width: "92%",
                  margin: "0.75rem auto",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  padding: "0.75rem",
                  cursor: "pointer",
                  borderRadius: "5px"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={el.icon}
                      alt={`${el.description} in Zanzibar`}
                      title={`${el.description} in Zanzibar`}
                      loading="lazy"
                      style={{
                        width: "35px",
                        height: "35px",
                        marginRight: "0.75rem"
                      }}
                    />
                    <h4>{el.title}</h4>
                  </div>

                  <p style={{ fontSize: "1.1rem" }}>0 $</p>
                </div>
                <p style={{ margin: "0.5rem 0", fontSize: "0.85rem" }}>
                  {el.description}
                </p>
              </section>
            );
          })}
        </div>
      </div>
    );
  };

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
      {activeStep === 0 && <Category />}
      {activeStep === 1 && (
        <AdsForm setActiveStep={setActiveStep} adType={adType} />
      )}
      {activeStep === 2 && (
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
