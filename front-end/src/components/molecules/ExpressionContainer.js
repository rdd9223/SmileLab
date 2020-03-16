import React from 'react';
import { Container } from "react-bootstrap";
import IdeaTextArea from '../atoms/textArea/IdeaTextArea';

const ExpressionContainer = () => {

  return (
    <Container style={{width: '500px', height: '60%'}}>
      <IdeaTextArea />
    </Container>
  );
}

export default ExpressionContainer;
