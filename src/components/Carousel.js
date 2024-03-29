import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const CarouselComponent = ({ imagesArray, uri }) => {
  return (
    <Carousel autoPlay={true} showArrows={true}>
      {imagesArray &&
        imagesArray.map((el, i) => (
          <div
            key={i}
            style={{
              maxHeight: "500px",
              backgroundPosition: "center",
              objectFit: "cover"
            }}
          >
            <img src={el} alt={"img-house"} loading={"lazy"} />
          </div>
        ))}
    </Carousel>
  );
};

export default CarouselComponent;
