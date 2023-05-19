import React from "react";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  imgHolder: {
    textAlign: "center",
    cursor: "pointer",
    background: "white",
    margin: "0.5rem 0rem"
  },
  imgp: {
    fontSize: "0.8rem"
  },
  imgcontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    maxWidth: "700px",
    margin: "0 auto"
  },
  img: {
    width: "45px",
    height: "45px"
  }
});
const CategoryImageIcons = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.imgcontainer}>
      <div
        className={classes.imgHolder}
        onClick={() => history.push("/properties-zanzibar")}
      >
        <img
          loading="lazy"
          src="https://www.svgrepo.com/show/485294/house.svg"
          alt="real estate zanizbar"
          className={classes.img}
        />
        <p className={classes.imgp}>Properties</p>
      </div>
      <div
        className={classes.imgHolder}
        onClick={() => history.push("/car-rental-zanzibar")}
      >
        <img
          loading="lazy"
          src="https://www.svgrepo.com/show/397650/oncoming-automobile.svg"
          alt="car rental Zanzibar"
          className={classes.img}
        />
        <p className={classes.imgp}>Vehicle</p>
      </div>
      {/* <div
        className={classes.imgHolder}
        onClick={() => history.push("/tours-zanzibar")}
      >
        <img
          loading="lazy"
          src="https://www.svgrepo.com/show/368341/speedboat.svg"
          alt="Safari & Tours Zanzibar"
          className={classes.img}
        />
        <p className={classes.imgp}>Tours</p>
      </div> */}
      {/* <div
        className={classes.imgHolder}
        onClick={() => history.push("/taxi-zanzibar")}
      >
        <img
          loading="lazy"
          src="https://www.svgrepo.com/show/398448/taxi.svg"
          alt="Taxi Zanzibar"
          className={classes.img}
        />
        <p className={classes.imgp}>Taxi</p>
      </div> */}
    </div>
  );
};

export default CategoryImageIcons;
