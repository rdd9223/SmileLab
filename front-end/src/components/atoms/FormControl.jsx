import React from "react";
import { Form } from "react-bootstrap";

const FormControl = ({ type, placeholder, onChange, id }) => {
  return <Form.Control type={type} placeholder={placeholder} onChange={onChange} id={id} />;
};

export default FormControl;
