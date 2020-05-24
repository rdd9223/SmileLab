import React from "react";
import { Button } from "react-bootstrap";

const Button1 = (props) => {
  const { style, variant, onClick, name, type } = props;

  return (
    <Button style={style} variant={variant} onClick={onClick} type={type}>
      {name}
    </Button>
  );
};

export default Button1;
