import React from "react";
import { Button } from "react-bootstrap";

const Button1 = ({ style, variant = "primary", onClick, name, type }) => {
  return (
    <Button style={style} variant={variant} onClick={onClick} type={type}>
      {name}
    </Button>
  );
};

export default Button1;
