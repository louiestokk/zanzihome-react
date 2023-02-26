import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { getFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { useSelector } from "react-redux";
const CarouselComponent = () => {
  const data = useSelector(getFirestoreData);
  console.log(data && data);
  return (
    <Carousel autoPlay={true}>
      {data &&
        data.map((el) => (
          <div
            key={el.adId}
            style={{
              height: "200px",
              backgroundPosition: "center",
              objectFit: "cover"
            }}
          >
            <img src={el.uri} alt={el.Area} loading={"lazy"} />
          </div>
        ))}
    </Carousel>
  );
};

export default CarouselComponent;
