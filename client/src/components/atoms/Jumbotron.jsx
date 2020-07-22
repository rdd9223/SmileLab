import React from "react";
import { Jumbotron as Jumbotron1, Container } from "react-bootstrap";
import styled from "styled-components";

const Wrapper = styled(Jumbotron1)`
  margin: 0 auto;
  height: 100%;
`;

const Jumbotron = ({ header, text }) => {
  return (
    <Wrapper fluid>
      <Container>
        <h1>{header}</h1>
        {text}
      </Container>
    </Wrapper>
  );
};

export default Jumbotron;
