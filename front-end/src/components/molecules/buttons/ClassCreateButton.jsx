import React from "react";
import Button from "../../atoms/Button";
import { postSource } from "../../../service/app";

const ClassCreateButton = (props) => {
  return (
    <Button
      
      variant={"primary"}
      name={"클래스 생성"}
    />
  );
};

export default ClassCreateButton;
