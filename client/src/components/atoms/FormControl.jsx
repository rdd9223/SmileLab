import React from "react";
import { Form } from "react-bootstrap";

const FormControl = ({ type, placeholder, onChange, id, value, rows, readOnly = false }) => {
  return (
    <Form.Control
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      id={id}
      value={value}
      rows={rows}
      readOnly={readOnly}
    />
  );
};

export default FormControl;
