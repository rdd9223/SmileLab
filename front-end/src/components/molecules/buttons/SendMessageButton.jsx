import React from "react";
import Button from "../../atoms/Button";
import { postSource } from "../../../service/app";

const CompileButton = (props) => {
  const { code, setResultCode } = props;

  return (
    <Button
      style={{ position: "absolute", bottom: "15px", right: "4%" }}
      variant={"primary"}
      name={"메세지 보내기"}
    />
  );
};

export default CompileButton;
