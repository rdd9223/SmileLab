import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CompileContainer from "../components/templates/CompileContainer";
import ExpressionContainer from "../components/templates/ExpressionContainer";

const CodeContainer = () => {
  return (
    <Container>
      <Row>
        <Col>
          <ExpressionContainer />
        </Col>
        <Col>
          <CompileContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default CodeContainer;
