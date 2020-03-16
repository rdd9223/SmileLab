import React from "react";
import { Button } from "react-bootstrap";

const CodeLoadButton = props => {

  return (
    <Button
      variant="primary"
      onClick={() => alert('코드 laod')}
    >
      불러오기
    </Button>
  );
};

export default CodeLoadButton;