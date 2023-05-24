import React from "react";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    background: "white",
    margin: "2rem 0"
  },
  top: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: "0.7rem"
  },
  line: {
    width: "70px",
    height: "2px",
    background: "black"
  },
  tourImg: {
    height: "125px",
    width: "165px",
    objectFit: "cover",
    borderRadius: "5px"
  },
  tours: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  imgContainer: {
    margin: "0.3rem 0.3rem",
    position: "relative",
    cursor: "pointer",
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
  },
  imgText: {
    position: "absolute",
    bottom: "10%",
    left: "3%",
    color: "white"
  }
});
const Popular = ({ title, images }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <section className={classes.root}>
      <div className={classes.top}>
        <div className={classes.line} style={{ marginRight: "1rem" }}></div>
        <h3>{title}</h3>
        <div className={classes.line} style={{ marginLeft: "1rem" }}></div>
      </div>
      <div className={classes.tours}>
        {images?.map((tour, i) => (
          <div
            key={i}
            className={classes.imgContainer}
            onClick={() => {
              if (tour.type === "Properties") {
                history.push(`/propertys/property/${tour.adId}`);
              } else {
                history.push(`/cars/${tour.id}`);
              }
            }}
          >
            <img
              loading="lazy"
              src={tour.url}
              alt={`${tour.imgText} Zanzibar`}
              title={`${tour.imgText} Zanzibar`}
              className={classes.tourImg}
            />
            <h4 className={classes.imgText}>{tour.imgText}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Popular;
