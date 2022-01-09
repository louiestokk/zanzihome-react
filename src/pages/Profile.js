import React, { useState, useEffect } from "react";
import { useUserContext } from "../user_context";
import { useGlobalContext } from "../context";
import styled from "styled-components";
import { BsHeart } from "react-icons/bs";
import { RiAdvertisementLine } from "react-icons/ri";
import { objects } from "../utils/data";

const Profile = () => {
  const { myUser, active, setActive } = useUserContext();
  const savedItem = new Array(JSON.parse(localStorage.getItem("savedobjects")));
  const current = savedItem.map((el) => {
    return el[0];
  });

  let items = objects.filter((el) => {
    if (localStorage.getItem("savedobjects") === null) return;
    else return el.id === savedItem;
  });
  const removeItem = (e) => {
    e.currentTarget.parentElement.remove();
  };
  console.log(current);
  return (
    <Wrapper>
      <h2>Welcome {myUser && myUser.nickname}</h2>
      <div
        className="divider"
        style={{ margin: "0 auto", width: "8rem" }}
      ></div>
      <div className="user-profile-info">
        <div>
          <img src={myUser && myUser.picture} alt="user icon" />
        </div>
        <p>
          Name: <span> {myUser && myUser.nickname}</span>
        </p>
        <p>
          Email: <span> {myUser && myUser.email}</span>
        </p>
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
          const { id, url, info, desc, price, location, size, to } = el;
          const image = el.url[0].split("./")[1];
          return (
            <div
              key={id}
              className={active ? "saved-item" : "saved-item hidden"}
            >
              <img src={`../${image}`} alt={location} />
              <h4 style={{ opacity: "0.7" }}>
                {desc} {location}
              </h4>
              <p style={{ color: "rgb(124, 12, 20) " }}> {size} sq.m</p>
              <p style={{ color: "green" }}>
                {to === "Rent" ? `${price}$ / week` : `${price}.000$`}
              </p>
              <button type="button">more info</button>
              <button type="button" onClick={removeItem}>
                remove
              </button>
            </div>
          );
        })}
      {/* här skall det va en section med saved items eller my ads och finns det inga return h4 no no saved items eller no ads och en knapp explore eller advertise property */}
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.section`
  display: column;
  height: auto;
  wiidth: 100%;

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
    margin-bottom: 0.3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    border-bottom: 1px solid #0b8b3a;
    img {
      width: 4rem;
      height: 4rem;
    }
    button {
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
