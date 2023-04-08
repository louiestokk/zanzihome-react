import React from "react";
import { makeStyles, Card } from "@material-ui/core";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { useSelector } from "react-redux";
const useStyles = makeStyles({
  root: { margin: "1rem 0" },
  card: {
    width: "80%",
    height: "210px",
    margin: "1rem 0.4rem",
    borderRadius: "5px",
    position: "relative",
    marginLeft: "0.8rem",
    position: "relative"
  },
  img: {
    height: "200px",
    minWidth: "340px",
    borderRadius: "5px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    cursor: "pointer",
    objectFit: "cover",
    backgroundPosition: "center"
  }
});
const RelatedObjects = (adId) => {
  const current = Number(
    window.location.pathname.split("/propertys/property/")[1]
  );

  const objects = useSelector(getFirestoreData);
  const classes = useStyles();
  const currentArea = objects?.filter(
    (el) => el?.adId === Number(adId?.adId)
  )[0]?.Area;
  const currentCategory = objects?.filter(
    (el) => el?.adId === Number(adId?.adId)
  )[0]?.category;
  const currentCatgoryToUse =
    currentCategory === "Hand" ? "Land" : currentCategory;
  const objectsInSameAreaNotSameCatgory = objects?.filter(
    (el) => el?.Area === currentArea && el.category !== currentCategory
  );
  const objectssameAreaAndCategory = objects?.filter(
    (el) => el?.category === currentCategory && el?.Area === currentArea
  );

  return (
    <div className={classes.root}>
      {objectssameAreaAndCategory?.length > 0 && current !== Number(adId.adId) && (
        <section>
          <h3
            style={{
              marginLeft: "0.5rem",
              width: "100%",
              color: "#334155",
              fontSize: "1rem"
            }}
          >
            Other {currentCatgoryToUse && currentCatgoryToUse} in{" "}
            {currentArea && currentArea}
          </h3>
          <div style={{ display: "flex", overflowX: "scroll" }}>
            {objectssameAreaAndCategory?.map((el) => {
              if (Number(el.adId) === Number(adId.adId)) return;
              return (
                <div
                  key={el.id}
                  onClick={() =>
                    (window.location.href = `/propertys/property/${el.adId}`)
                  }
                >
                  <div className={classes.card}>
                    <img src={el.uri} alt={el.Area} className={classes.img} />
                    <div
                      style={{
                        position: "absolute",
                        zIndex: "10000",
                        color: "white",
                        top: "5%",
                        left: "2%"
                      }}
                    >
                      <h5>{el.Size}.sqm</h5>
                      <h5>{el.Price}$</h5>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {objectsInSameAreaNotSameCatgory?.length > 0 && (
        <section className={classes.container}>
          <h3
            style={{
              marginLeft: "0.5rem",
              width: "100%",
              color: "#334155",
              fontSize: "1rem"
            }}
          >
            Other properties in {currentArea && currentArea}
          </h3>
          <div style={{ display: "flex", overflowX: "scroll" }}>
            {objectsInSameAreaNotSameCatgory?.map((el) => {
              if (Number(el.adId) === Number(adId.adId)) return;
              return (
                <div
                  key={el.id}
                  onClick={() =>
                    (window.location.href = `/propertys/property/${el.adId}`)
                  }
                >
                  <div className={classes.card}>
                    <img src={el.uri} alt={el.Area} className={classes.img} />
                    <div
                      style={{
                        position: "absolute",
                        zIndex: "10000",
                        color: "white",
                        top: "5%",
                        left: "2%"
                      }}
                    >
                      <h5>{el.Size}.sqm</h5>
                      <h5>{el.Price}$</h5>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default RelatedObjects;
