import React from "react";
import { Button } from "react-bootstrap";

const CodeSaveButton = props => {

  const handleCodeDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([props.code], {type: "text/plain;charset=utf-8"});
    element.href = URL.createObjectURL(file);
    element.download = "myCode.py";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
  return (
    <Button
      variant="primary"
      onClick={handleCodeDownload}
    >
      저장하기
    </Button>
  );
};

export default CodeSaveButton;