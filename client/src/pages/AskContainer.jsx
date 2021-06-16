import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";

const Container1 = styled(Container)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled(Container)`
  text-align: center;
  vertical-align: middle;
`;

const AskContainer = () => {
  return (
    <Container1>
      <TextContainer>
        <h5>시스템에 대한 피드백이나 궁금한 점은 </h5>
        <h5>SMILE LAB 에 연락주세요</h5>
        <br />
        <h5>Email: kej1987@nate.com</h5>
      </TextContainer>
    </Container1>
  );
};

export default AskContainer;
