import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { MdApartment } from "react-icons/md";
import { MdOutlineHouseSiding } from "react-icons/md";
import { GiIsland } from "react-icons/gi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { objects } from "../utils/data";
import styled from "styled-components";
import { useGlobalContext } from "../context";
import {
  getAllObjects,
  filterObjects
} from "../redux-toolkit/objects/objectSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  getFirestoreData,
  setFirestoreData
} from "../redux-toolkit/firebaseDataSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
const Filter = () => {
  const firebaseData = useSelector(getFirestoreData);
  const allObjects = useSelector(getAllObjects);
  const dispatch = useDispatch();
  const { loading } = useGlobalContext();
  const [showList, setShowList] = useState(false);
  const [rental, setRental] = useState(false);
  const [size, setSize] = useState(0);
  const [price, setprice] = useState(0);
  const [extendFilter, setExtendFilter] = useState(false);
  const [active, setActive] = useState(true);
  const [alertmsg, setAlertMsg] = useState(false);
  const [query, setQuery] = useState();
  const [memo, setMemo] = useState([]);
  // rent null och sell null = sell
  const handleClick = (e) => {
    if (e.currentTarget.className === "loc-btn") {
      const newitems = allObjects.filter(
        (el) => el.location === e.currentTarget.textContent
      );
      dispatch(filterObjects(newitems));
    }

    if (e.currentTarget.className === "btn") {
      const newitems = allObjects.filter(
        (el) => el.type === e.currentTarget.textContent
      );
      if (newitems.length === 0) {
        setAlertMsg(!alertmsg);
      }
      dispatch(filterObjects(newitems));
    }
    setTimeout(() => {
      setAlertMsg(false);
    }, 5000);
    if (e.currentTarget.className === "button") {
      setActive(!active);
    }
  };

  const handleSubmit = () => {
    // if (adressQuery) {
    //   const newItems = objects.filter(
    //     (el) =>
    //       el.location ===
    //       adressQuery.charAt(0).toUpperCase() + adressQuery.slice(1)
    //   );
    //   setPropertys(newItems);
    // }
    if (query) {
      const newitems = allObjects.filter((el) => el.query.includes(query));
      dispatch(filterObjects(newitems));
    }
  };

  const handleChange = (e) => {
    const newItems = firebaseData?.filter(
      (el) =>
        el.Adress === e.target.value.toUpperCase() ||
        el.Area === e.target.value.toUpperCase()
    );
    dispatch(setFirestoreData(newItems));

    if ((e.currentTarget.className = "querys area")) {
      const query =
        e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
      console.log(query);
      const newitems = allObjects.filter((el) => el.location === query);
      dispatch(filterObjects(newitems));
    }

    // här skall du bygga for firestoredatan
  };
  const handleSizePrice = (e) => {
    if (e.currentTarget.name === "size") {
      const newitems = objects.filter(
        (el) => +el.size >= Number(e.currentTarget.value)
      );

      dispatch(filterObjects(newitems));
    }
    if (e.currentTarget.name === "price") {
      const newitems = allObjects.filter(
        (el) => el.price * 1000 <= +e.currentTarget.value
      );
      dispatch(filterObjects(newitems));
    }
  };
  const fetchFirestoreData = async () => {
    await getDocs(collection(db, "newAd")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setMemo(newData);
    });
  };

  useEffect(() => {
    fetchFirestoreData();
  }, []);

  return (
    <Wrapper
      className="filter-filter-holder"
      style={{ height: extendFilter && "680px" }}
    >
      <article className="buttons">
        <button
          type="button"
          className={active ? "button active" : "button"}
          onClick={() => {
            setRental(false);
            setActive(true);
            dispatch(filterObjects(objects.filter((el) => el.to === "Buy")));
            dispatch(setFirestoreData(memo?.filter((el) => el.Rent === null)));
          }}
        >
          Sale
        </button>
        <button
          type="button"
          className={!active ? "button active" : "button"}
          onClick={() => {
            setRental(true);
            setActive(false);
            dispatch(filterObjects(objects.filter((el) => el.to === "Rent")));
            firebaseData.length > 0 &&
              dispatch(setFirestoreData(memo.filter((el) => el.Rent !== null)));
          }}
        >
          Rental
        </button>
      </article>
      <div className="holder" style={{ height: extendFilter && "520px" }}>
        <article className="filter" style={{ marginBottom: "1rem" }}>
          {/* {!alertmsg ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center"
              }}
            >
              <h4 style={{ marginLeft: "0.5rem" }}>Area</h4>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "1rem"
                }}
              >
                <FaBars
                  style={{ color: "#0369A1", cursor: "pointer" }}
                  onClick={() => setShowList(!showList)}
                />
                <p style={{ marginLeft: "0.2rem", fontSize: "0.8rem" }}>
                  Select from list
                </p>
              </div>
            </div>
          ) : (
            <p
            style={{
              margin: "0 auto",
              color: "red",
              fontSize: "0.8rem",
              maxWidth: "300px"
            }}
            >
           
            </p>
          )} */}
          {/* {showList && (
            <div
              style={{
                background: "white",
                height: "1rem",
                width: "100%",
                fontSize: "0.9rem",
                marginBottom: "1.5rem",
                flexWrap: "wrap",
                display: "flex",
                alignItems: "center"
              }}
            >
              {Array.from(new Set(objects.map((el) => el.location))).map(
                (el) => {
                  return (
                    <button
                      type="button"
                      className="loc-btn"
                      key={el}
                      onClick={handleClick}
                    >
                      {el}
                    </button>
                  );
                }
              )}
              <button
                type="button"
                className="loc-btn"
                onClick={() => objects.filter((el) => el.to === "Buy")}
              >
                All
              </button>
            </div>
          )} */}
          <div style={{ position: "relative" }} className="filter">
            <div
              style={{
                position: "absolute",
                top: "30%",
                left: "3%",
                fontSize: "1.3rem",
                color: "gray",
                display: "flex",

                alignItems: "center"
              }}
            >
              <BiSearch style={{ marginRight: "1rem" }} />
            </div>

            <input
              type="text"
              placeholder="Search area"
              onChange={handleChange}
              className="querys area"
            />
          </div>
        </article>
        <article
          className="filter"
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          <button
            className="btn"
            type="button"
            onClick={() => dispatch(filterObjects(objects))}
          >
            <BsThreeDotsVertical />
            <span
              style={{
                fontSize: "0.85rem",
                marginLeft: "0.6rem",
                color: "black"
              }}
            >
              All types
            </span>
          </button>
          <button className="btn" type="button" onClick={handleClick}>
            <BsFillHouseDoorFill
              style={{ color: "#0b8b3a", marginLeft: "0.25rem" }}
            />
            <span
              style={{
                fontSize: "0.85rem",
                marginLeft: "0.6rem",
                color: "black"
              }}
            >
              House
            </span>
          </button>
          <button className="btn" type="button" onClick={handleClick}>
            <MdApartment
              style={{
                color: "#0369A1",
                fontSize: "1.2rem",
                marginLeft: "0.25rem"
              }}
            />
            <span
              style={{
                fontSize: "0.85rem",
                marginLeft: "0.6rem",
                color: "black"
              }}
            >
              Apartment
            </span>
          </button>
          <button className="btn" type="button" onClick={handleClick}>
            <MdOutlineHouseSiding
              style={{
                color: "#15803D",
                fontSize: "1.4rem",
                marginLeft: "0.25rem"
              }}
            />
            <span
              style={{
                fontSize: "0.85rem",
                marginLeft: "0.6rem",
                color: "black"
              }}
            >
              Bangalow
            </span>
          </button>
          <button className="btn" type="button" onClick={handleClick}>
            <GiIsland
              style={{
                color: "#65A30D",
                fontSize: "1.6rem",
                marginLeft: "0.4rem"
              }}
            />
            <span
              style={{
                fontSize: "0.85rem",
                marginLeft: "0.8rem",
                color: "black"
              }}
            >
              Plot
            </span>
          </button>
        </article>
        {extendFilter && (
          <article className="filters">
            <div className="choice">
              <label htmlFor="size">Minimum size sq.m</label>
              <select name="size" value={size} onChange={handleSizePrice}>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="1000">1000</option>
                <option value="2000">2000</option>
                <option value="3000">30000</option>
                <option value="10000">10.000</option>
              </select>
            </div>
            <div className="choice">
              <label htmlFor="min">Maximum price $</label>
              <select name="price" value={price} onChange={handleSizePrice}>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="1000">1000</option>
                <option value="2000">2000</option>
                <option value="3000">30000</option>
                <option value="10000">10.000</option>
                <option value="50000">50.000</option>
                <option value="100000">100.000</option>
                <option value="1000000">1.000 000</option>
              </select>
            </div>
          </article>
        )}

        {extendFilter && (
          <div className="query">
            <label htmlFor="query" style={{ marginLeft: "0.5rem" }}>
              Query
            </label>
            <input
              type="text"
              placeholder="Beach, parking etc"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: "70%",
                margin: "1rem 0rem",
                textAlign: "center",
                textTransform: "lowercase"
              }}
            />
          </div>
        )}
        <p
          className="extend"
          style={{
            textAlign: "center",
            fontSize: "0.9rem",
            color: "#0369A1",
            cursor: "pointer",
            margin: "0.3rem 0"
          }}
          onClick={() => setExtendFilter(!extendFilter)}
        >
          {!extendFilter && (
            <>
              Extend filters
              <MdKeyboardArrowDown />
            </>
          )}
          {extendFilter && (
            <>
              Reduce filter <MdKeyboardArrowUp />
            </>
          )}
        </p>

        <button type="button" className="submit" onClick={handleSubmit}>
          {rental ? "Find property for rent" : "Find properties for sale"}
        </button>
        {allObjects.length === 0 && !loading && (
          <div
            style={{
              display: "flex",
              margin: "0 auto",
              justifyContent: "center"
            }}
          >
            <p
              style={{
                textAlign: "center",
                color: "red",
                fontSize: "0.75rem",
                margin: "0 0"
              }}
            >
              No result match you search citeria. Clear filter and start over
            </p>
            <button
              onClick={() => dispatch(filterObjects(objects))}
              style={{
                margin: "0 0.5rem",
                border: "1px solid red",
                padding: "0.1rem",
                color: "red"
              }}
            >
              clear filter
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Filter;
const Wrapper = styled.section`
  height: 510px;
  width: 100%;
  transition: all 0.4s linear;
  .button {
    height: 3rem;
    width: 8rem;
    color: #0b8b3a;
    font-weight: bold;
    background: white;
    font-size: 1rem;
    margin-top: 2rem;
    margin-bottom: 0rem;
    border: none;
    opacity: 0.82;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
  .holder {
    background: white;
    height: 380px;
    width: 600px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    border-radius: 5px 5px;
    border: none;
    overflow: hidden;
    transition: all 0.4s linear;
  }
  .filter {
    margin: 1rem 0.2rem;
    width: 100%;
  }
  input {
    height: 3rem;
    width: 94%;
    border: 2px solid #0b8b3a;
    text-align: center;
  }
  .btn {
    background: #f3f4f6;
    height: 2.4rem;
    width: 8rem;
    margin: 0.3rem 0.3rem;
    display: flex;
    align-items: center;
    font-size: 1rem;
  }
  .submit {
    width: 96%;
    background: #0b8b3a;
    height: 3rem;
    color: white;
    box-shadow: none;
    opacity: 0.9;
    letter-spacing: 1px;
    font-size: 0.9rem;
  }
  .choice {
    display: flex;
    flex-direction: column;
  }
  .filters {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
  select {
    width: 140px;
    cursor: pointer;
    font-size: 0.8rem;
    background: #f3f4f6;
    margin-bottom: 0.5rem;
  }
  label {
    font-size: 0.9rem;
  }
  .query {
    display: flex;
    align-items: center;
  }
  .active {
    background: #0b8b3a;
    color: white;
    opacity: 1;
  }
  .area {
    text-transform: capitalized;
  }

  .loc-btn {
    margin-bottom: 1rem;
    color: #0369a1;
    cursor: pointer;
  }
  .loc-btn:hover {
    border-bottom: 1px solid #0369a1;
  }

  @media only screen and (max-width: 600px) {
    .holder {
      width: 96vw;
    }
  }
  @media only screen and (min-width: 600px) {
    select {
      width: 220px;
    }
  }
`;
