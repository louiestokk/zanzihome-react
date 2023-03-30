import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { faqdata } from "../utils/faq";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  heading: {
    fontWeight: "bold",
    fontSize: "1rem",
    letterSpacing: "0.5px"
  }
}));
const Faq = () => {
  const classes = useStyles();
  return (
    <div style={{ margin: "2rem auto" }} className="faq-root">
      <div className={classes.root}>
        <h2 style={{ marginLeft: "0.5rem", marginBottom: "0.5rem" }}>
          Common questions
        </h2>
        {faqdata?.map((el, i) => {
          return (
            <Accordion key={i}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading} variant="h6">
                  {el.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontSize: "0.85rem",
                    lineHeight: "22px",
                    letterSpacing: "1px"
                  }}
                >
                  {el.text}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
