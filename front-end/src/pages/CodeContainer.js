import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CompileContainer from "../components/organisms/CompileContainer";
import ExpressionContainer from "../components/organisms/ExpressionContainer";

const App = () => {
  return (
    <Container className="App">
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

export default App;
