import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Intro from "../components/molecules/jumbotron/Intro";
import Image from "../components/atoms/Images";

const Wrapper = styled.div`
  width: 60rem;
  margin: 50px auto;
  height: 600px;
`;

const Img = styled(Image)`
  height: auto;
  width: 100%;
`;

const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
`;

const IntroContainer = () => {
  return (
    <Wrapper>
      <Row>
        <Col>
          <Intro />
        </Col>
        <StyledCol>
          <Img src={"images/code.png"} />
        </StyledCol>
      </Row>
    </Wrapper>
  );
};

export default IntroContainer;
