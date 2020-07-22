import React from "react";
import Button from "../../atoms/Button";

const QuestionButton = () => {
  return (
    <Button
      style={{ position: "absolute", bottom: "15px", right: "4%" }}
      variant={"primary"}
      onClick={() => alert("의사코드 표현하는 방법")}
      name={"?"}
    />
  );
};

export default QuestionButton;
