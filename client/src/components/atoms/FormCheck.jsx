import React from "react";
import { Form } from "react-bootstrap";

const FormCheck = ({ type, label, checked, name, id, onChange, disabled = false }) => {
  return (
    <Form.Check
      type={type}
      checked={checked}
      label={label}
      name={name}
      id={id}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default FormCheck;
