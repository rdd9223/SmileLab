import React from "react";
import { Button } from "react-bootstrap";
import { compileResult } from "../../../service/app";

const CheckResultButton = ({code}) => {

  const fetchCompileResult = async(code) => {
    const result = await compileResult(code);
    return result;
  }

  return (
    <Button
      style={{float: 'right'}}
      variant="primary"
      onClick={() => console.log(fetchCompileResult(code))}
    >
      결과 확인하기
    </Button>
  );
};

export default CheckResultButton;