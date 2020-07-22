import React from "react";
import Button from "../../atoms/Button";
import { postSource } from "../../../service/app";

const CompileButton = (props) => {
  return (
    <Button
      variant={"primary"}
      name={"메세지 보내기"}
    />
  );
};

export default CompileButton;
