import React from "react";
import { Button } from "react-bootstrap";

const CodeSaveButton = props => {

  return (
    <Button
      variant="primary"
      onClick={() => alert('코드 저장하기')}
    >
      저장하기
    </Button>
  );
};

export default CodeSaveButton;