import React, { useState } from "react";
import { useUserContext } from "../user_context";
import styled from "styled-components";
import { BsHeart } from "react-icons/bs";
import { RiAdvertisementLine } from "react-icons/ri";
import UserActivity from "../components/UserActivity";
const Profile = () => {
  const { myUser, active, setActive } = useUserContext();

  const { nickname, picture, name, email, sub } = myUser;

  return (
    <Wrapper>
      <h2>Welcome {nickname}</h2>
      <div
        className="divider"
        style={{ margin: "0 auto", width: "8rem" }}
      ></div>
      <div className="user-profile-info">
        <div>
          <img src={picture} alt="user icon" />
        </div>
        <p>
          Name: <span> {nickname}</span>
        </p>
        <p>
          Email: <span> {email}</span>
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
      <UserActivity />
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
    height: 3.4rem;
    width: 3.4rem;
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
`;
