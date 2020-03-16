import React from "react";
import { Button } from "react-bootstrap";

const HintButton = props => {

  return (
    <Button
      style={{ position: "absolute", bottom: "15px", left: "450px" }}
      variant="primary"
      onClick={() => alert('힌트를 보여줘요')}
    >
      ?
    </Button>
  );
};

export default HintButton;