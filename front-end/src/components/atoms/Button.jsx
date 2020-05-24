import React from "react";
import { Button } from "react-bootstrap";

const Button1 = (props) => {
  const { style, variant, onClick, name } = props;

  return (
    <Button style={style} variant={variant} onClick={onClick}>
      {name}
    </Button>
  );
};

export default Button1;
