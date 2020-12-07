import React from "react";
import Button from "../../atoms/Button";
import styled from "styled-components";

const CompileInputButton = (props) => {
  const { onClick } = props;

  return <InputButton variant={"primary"} onClick={onClick} name={"Input"} size={"sm"} />;
};

const InputButton = styled(Button)`
  margin: 15px;
`;

export default CompileInputButton;
