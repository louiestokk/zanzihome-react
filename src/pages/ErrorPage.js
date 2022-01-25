import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <Wrapper>
      <h3>Sorry this page dont exist.</h3>

      <Link to="/">Back home</Link>
    </Wrapper>
  );
};

export default ErrorPage;
const Wrapper = styled.div`
  height: 14rem;
  display: flex;
  background: #dfe6d8;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    background: green;
    text-align: center;
    width: 7rem;
    height: 2rem;
    line-height: 30px;
    border-radius: 5px 5px;
    margin-top: 1.2rem;
    color: white;
  }
`;
