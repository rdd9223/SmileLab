import React from "react";
import { Button as Button1 } from "react-bootstrap";

const Button = ({ style, variant = "primary", onClick, name, type }) => {
  return (
    <Button1 style={style} variant={variant} onClick={onClick} type={type}>
      {name}
    </Button1>
  );
};

export default Button;
