import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import CompileContainer from '../molecules/CompileContainer';
import ExpressionContainer from '../molecules/ExpressionContainer';

const App = () => {

  return (
    <Container className="App">
      <Row>
        <Col xl={6}>
          <ExpressionContainer />
        </Col>
        <Col xl={6}>
          <CompileContainer />
        </Col>
      </Row>
    </Container>
  );
}

export default App;