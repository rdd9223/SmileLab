import React from "react";
import MainIntro from "../components/molecules/jumbotron/MainIntro";
import { Row, Col } from "react-bootstrap";
import LoginForm from "../components/organisms/LoginForm";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 60em;
  margin: 50px auto;
  height: 600px;
`;

const MainContainer = () => {
  return (
    <Wrapper>
      <Row style={{ height: "100%" }}>
        <Col lg={8}>
          <MainIntro />
        </Col>
        <Col lg={4}>
          <LoginForm />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default MainContainer;
