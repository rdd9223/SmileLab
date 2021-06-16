import React from "react";
import { Form } from "react-bootstrap";

const Check = ({ type, label, checked, name, id, onChange, disabled = false, onClick }) => {
  return (
    <Form.Check
      type={type}
      checked={checked}
      label={label}
      name={name}
      id={id}
      onChange={onChange}
      disabled={disabled}
      onClick={(event) => onClick(event)}
    />
  );
};

export default Check;
