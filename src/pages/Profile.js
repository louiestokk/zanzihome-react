import React, { useState, useEffect } from "react";
import { useUserContext } from "../user_context";
import styled from "styled-components";
import { BsHeart } from "react-icons/bs";
import { RiAdvertisementLine } from "react-icons/ri";
import {
  getAllObjects,
  filterObjects,
} from "../redux-toolkit/objects/objectSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const allObjects = useSelector(getAllObjects);
  const { user, active, setActive } = useUserContext();
  const [items, setItem] = useState([]);
  const [myAdsId, setMyAdsId] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("zanzihomeAdId")) {
      setMyAdsId([localStorage.getItem("zanzihomeAdId")]);
    }
    if (localStorage.getItem("zanzihomeSaved")) {
      setItem([localStorage.getItem("zanzihomeSaved")]);
    }

    localStorage.setItem("zanzifoodOrder", "544653");
  }, []);
  localStorage.setItem("zanzihomeAdId", 544653);
  return (
    <Wrapper>
      <h2>Welcome {user && user.nickname}</h2>
      <div
        className="divider"
        style={{ margin: "0 auto", width: "8rem" }}
      ></div>
      <div className="user-profile-info" style={{ height: "200px" }}>
        <div>
          <img src={user && user.picture} alt="user icon" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>
            Name:
            <span> {user && user.nickname}</span>
          </p>
          <p>
            Email: <span>{user && user.email} </span>
          </p>
        </div>
      </div>
      <article>
        <h2>Your activity</h2>

        <div className="pop">
          <button
            type="button"
            className={`${active ? "pop-btn pop-active" : "pop-btn"}`}
            onClick={() => setActive(!active)}
          >
            <BsHeart className="pop-icon-user" />
            Saved items
          </button>
          <button
            type="button"
            className={`${!active ? "pop-btn pop-active" : "pop-btn"}`}
            onClick={() => setActive(!active)}
          >
            <RiAdvertisementLine className="pop-icon-user" />
            My ads
          </button>
        </div>
      </article>
      {items &&
        active &&
        items.map((el) => {
          const r = allObjects.filter((ob) => ob.id === +el);
          return (
            <div key={el.id} style={{ height: "100%" }}>
              {r.map((ob) => {
                const image = ob.url[0].split("./")[1];
                const { id, desc, price, location, size, to } = ob;
                return (
                  <div
                    key={id}
                    className={active ? "saved-item" : "saved-item hidden"}
                  >
                    <img src={`../${image}`} alt={location} />
                    <h4 style={{ opacity: "0.7" }}>
                      {desc} {location}
                    </h4>

                    <p style={{ color: "green" }}>
                      {to === "Rent" ? `${price}$ / week` : `${price}.000$`}
                    </p>
                    <Link
                      to={`/propertys/zanzibar/${id}`}
                      style={{
                        padding: "0.2rem",
                        border: "1px solid green",
                        borderRadius: "5px 5px",
                      }}
                    >
                      more info
                    </Link>
                  </div>
                );
              })}
            </div>
          );
        })}

      {myAdsId &&
        !active &&
        allObjects
          .filter((el) => el.id === +myAdsId[0])
          .map((ad) => {
            return (
              <section className="saved-section">
                <div key={ad.id} className="savedss">
                  {ad.active === true && (
                    <p style={{ color: "green" }}>Active</p>
                  )}
                  <span style={{ fontSize: "0.8rem" }}>
                    Published: {ad.date}
                  </span>
                  <p>{ad.desc}</p>
                  <p>{ad.size}sq.m</p>
                  <p>
                    {ad.to === "Rent"
                      ? `${ad.price}$ / week`
                      : `${ad.price}.000$`}
                  </p>
                  <Link
                    to={`/propertys/zanzibar/${ad.id}`}
                    style={{
                      color: "white",
                      border: "1px solid green",
                      width: "100px",
                      textAlign: "center",
                      borderRadius: "5px 5px",
                      background: "green",
                    }}
                  >
                    more info
                  </Link>
                </div>
              </section>
            );
          })}
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.section`
  display: column;
  height: 100%;
  width: 100%;
  margin-bottom: 3rem;

  .user-profile-info {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 6rem;
    border-bottom: 0.5px solid rgb(201, 197, 197);
  }
  h2 {
    margin: 1rem auto;
    text-align: center;
    opacity: 0.7;
    font-size: 1.1rem;
  }
  p {
    font-size: 0.9rem;
  }

  img {
    height: 3.2rem;
    width: 3.2rem;
    border-radius: 50%;
    margin-bottom: 0.1rem;
  }
  div p {
    margin: 0.3rem 0;
    font-weight: bold;
  }
  div span {
    font-weight: 100;
  }
  article {
    margin-top: 2rem;
  }

  .pop-icon-user {
    margin-right: 0.3rem;
    font-size: 1.2rem;
  }
  .saved-item {
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    img {
      width: 4rem;
      height: 4rem;
    }
    button,
    a {
      color: #0b8b3a;
      margin: 0;
      font-size: 0.7rem;
    }
    h4 {
      font-size: 0.8rem;
      margin-left: 0.3rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
`;
