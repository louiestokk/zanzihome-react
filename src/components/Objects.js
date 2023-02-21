import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ImHome } from "react-icons/im";
import { BsSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllObjects } from "../redux-toolkit/objects/objectSlice";
import { getImages } from "../redux-toolkit/ImagesSlice";
import { setFirestoreData } from "../redux-toolkit/firebaseDataSlice";
import { db } from "../firebase";
const Objects = () => {
  const dispatch = useDispatch();
  const allObjects = useSelector(getAllObjects);
  const [firestoreData, setfirestoreData] = useState();
  const fetchFirestoreData = async () => {
    await getDocs(collection(db, "newAd")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setfirestoreData(newData);
      dispatch(setFirestoreData(newData));
    });
  };
  useEffect(() => {
    fetchFirestoreData();
  }, []);

  return (
    <>
      <h4 className="antal-objects">
        {allObjects?.length + firestoreData?.length} properties
      </h4>
      <div className="objects-container">
        {allObjects?.map((object) => {
          const { id, url, location, price, size, type, to, desc } = object;

          return (
            <div className="objects" key={id}>
              <img
                src={url.includes("firebase") ? url[1] : url[0]}
                alt={location}
                loading={"lazy"}
              />
              <div className="objects-footer-first">
                <div className="objects-logo">
                  <h3 className="object-location-text">{location}</h3>
                  <div className="logo">
                    <div className="logo-circle circlar">
                      <ImHome className="logo-icon ccc" />
                    </div>
                    <div
                      className="logo-text objectsreal-logo"
                      style={{ marginRight: "0.75rem" }}
                    >
                      <h4>ZanziHom</h4>
                      <p className="pp">e</p>
                    </div>
                  </div>
                </div>
                <p>
                  {type === "House" || type === "Apartment" ? (
                    <ImHome style={{ color: "#22c55e" }} />
                  ) : (
                    <BsSquare
                      style={{ color: "#22c55e", background: "#22c55e" }}
                    />
                  )}{" "}
                  {desc}
                </p>
                <div className="objects-footer">
                  <span>
                    {to === "Rent" ? `$${price}/week` : `$${price}.000`}
                  </span>
                  <span>{size}sqm</span>
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </div>
              </div>
              <div className="objects-btn-container">
                <Link to={`/propertys/zanzibar/${id}`}>
                  <button type="button">Contact</button>
                </Link>
                <Link to={`/propertys/zanzibar/${id}`}>
                  <button type="button">Info</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="objects-container">
        {firestoreData &&
          firestoreData?.map((object, index) => {
            const {
              Name,
              Email,
              Phone,
              Sell,
              Area,
              Adress,
              Rent,
              top3,
              rocket3,
              rocket10,
              top10,
              category,
              Zip,
              Title,
              Text,
              Price,
              adId,
              About,
              Size,
              uri
            } = object;
            return (
              <div key={index} className="objects">
                <img src={uri && uri} alt={Adress} loading={"lazy"} />
                <div className="objects-footer-first">
                  <div className="objects-logo">
                    <h3 className="object-location-text">{Area}</h3>
                    <div className="logo">
                      <div className="logo-circle circlar">
                        <ImHome className="logo-icon ccc" />
                      </div>
                      <div
                        className="logo-text objectsreal-logo"
                        style={{ marginRight: "0.75rem" }}
                      >
                        <h4>ZanziHom</h4>
                        <p className="pp">e</p>
                      </div>
                    </div>
                  </div>
                  <p>
                    {category === "House" || category === "Apartment" ? (
                      <ImHome style={{ color: "#22c55e" }} />
                    ) : (
                      <BsSquare
                        style={{ color: "#22c55e", background: "#22c55e" }}
                      />
                    )}{" "}
                    {Title}
                  </p>
                  <div className="objects-footer">
                    <span>
                      {Rent === null && Sell === null
                        ? `$${Price}.00`
                        : `$${Price}/week`}
                    </span>
                    <span>{Size}sqm</span>
                    <span>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="objects-btn-container">
                  <Link to={`/propertys/property/${adId}`}>
                    <button type="button">Contact</button>
                  </Link>
                  <Link to={`/propertys/property/${adId}`}>
                    <button type="button">Info</button>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Objects;
