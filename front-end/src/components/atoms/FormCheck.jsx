import React from "react";
import { Form } from "react-bootstrap";

const FormCheck = ({ type, label, name, id }) => {
  return <Form.Check type={type} label={label} name={name} id={id} />;
};

export default FormCheck;
