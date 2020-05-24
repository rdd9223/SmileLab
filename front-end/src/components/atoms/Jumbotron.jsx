import React from "react";
import { Jumbotron, Container } from "react-bootstrap";

const Jumbotron1 = ({ header, text }) => {
  return (
    <Jumbotron fluid>
      <Container>
        <h1>{header}</h1>
        <p>{text}</p>
      </Container>
    </Jumbotron>
  );
};

export default Jumbotron1;
