import React from "react";
import { Button } from "react-bootstrap";

const CheckResultButton = props => {

  return (
    <Button
      style={{float: 'right'}}
      variant="primary"
      onClick={() => alert('코드 결과보기')}
    >
      결과 확인하기
    </Button>
  );
};

export default CheckResultButton;