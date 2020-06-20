import React from "react";
import { Form } from "react-bootstrap";

const FormControl = ({ type, placeholder, onChange, id, value }) => {
  return <Form.Control type={type} placeholder={placeholder} onChange={onChange} id={id} value={value} />;
};

export default FormControl;
