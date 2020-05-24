import React from "react";
import MainIntro from "../components/molecules/jumbotron/MainIntro";
import { Row, Col } from "react-bootstrap";
import LoginForm from "../components/molecules/form/LoginForm";

const MainContainer = () => {
  return (
    <div>
      <Row>
        <Col>
          <MainIntro />
        </Col>
        <Col>
          <LoginForm />
        </Col>
      </Row>
    </div>
  );
};

export default MainContainer;
