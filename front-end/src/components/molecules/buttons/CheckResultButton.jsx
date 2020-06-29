import React from "react";
import Button from "../../atoms/Button";
import { compileResult } from "../../../service/app";

const CheckResultButton = (props) => {
  const { onClick } = props;
/*
  const fetchCompileResult = async (code) => {
    const result = await compileResult(code);
    return result;
  };
*/
  return (
    <Button
      style={{ float: "right" }}
      variant={"primary"}
      onClick={onClick}
      name={"결과 확인하기"}
    />
  );
};

export default CheckResultButton;
