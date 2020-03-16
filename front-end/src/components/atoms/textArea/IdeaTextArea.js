import React from 'react';
import {Form} from 'react-bootstrap';

const IdeaTextArea = () => {

  return (
    <Form.Control as="textarea" defaultValue='#' style={{height: '100%', width: '100%'}}/>
  )
}

export default IdeaTextArea;