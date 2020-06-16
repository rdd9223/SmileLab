import React from "react";
import { Form } from "react-bootstrap";

const FormCheck = ({ type, label, name, id, onChange }) => {
  return <Form.Check type={type} label={label} name={name} id={id} onChange={onChange}/>;
};

export default FormCheck;
