import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import styled from "styled-components";

const Wrapper = styled(Jumbotron)`
  margin: 0 auto;
  height: 100%;
`;

const Jumbotron1 = ({ header, text }) => {
  return (
    <Wrapper fluid>
      <Container>
        <h1>{header}</h1>
        <p>{text}</p>
      </Container>
    </Wrapper>
  );
};

export default Jumbotron1;
