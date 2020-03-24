import React from 'react';
import {Form} from 'react-bootstrap';

const FormRadio = (props) => {

  return (
    <Form.Check
      custom
      type="radio"
      label={props.name}
      name={props.group}
      id={props.name}
      checked={props.checked}
      value={props.name}
      onChange={props.onChange}
    />
  );
}

export default FormRadio;
