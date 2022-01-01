import React, { useState } from "react";
import { useUserContext } from "../user_context";
import styled from "styled-components";
import { BsHeart } from "react-icons/bs";
import { RiAdvertisementLine } from "react-icons/ri";
import { objects } from "../utils/data";
import { savedItemsArray } from "../components/SingleObject";
// import { img } from "../../public/images";
const Profile = () => {
  const { myUser, active, setActive } = useUserContext();
  const items = objects.filter((el) => savedItemsArray.includes(el.id));
  console.log(savedItemsArray);
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
          console.log(to);
          return (
            <div key={id} className="saved-item">
              <img src={`../${image}`} alt={location} />
              <h4>
                {desc} {location}
              </h4>
              <p>{size} sq.m</p>
              <p style={{ color: "green" }}>
                {to === "Rent" ? `${price}$ / week` : `${price}.000$`}
              </p>
              <button type="button">send interest</button>
              <button type="button">more info</button>
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
  height: 500px;
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
      border: none;
      background: #0b8b3a;
      color: white;
      padding: 0.1rem;
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
