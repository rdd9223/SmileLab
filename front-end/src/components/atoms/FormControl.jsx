import React from "react";
import { Form } from "react-bootstrap";

const FormControl = ({ type, placeholder }) => {
  return <Form.Control type={type} placeholder={placeholder} />;
};

export default FormControl;
