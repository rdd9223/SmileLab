import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import CompileContainer from '../organisms/CompileContainer';
import ExpressionContainer from '../organisms/ExpressionContainer';
import Navbar from '../organisms/MainNavbar';

const App = () => {

  return (
    <Container className="App">
      <Navbar/>
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
}

export default App;