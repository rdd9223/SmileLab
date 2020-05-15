import React from "react";
import QuestionButton from "../molecules/buttons/QuestionButton";
import IdeaTextArea from "../molecules/textArea/IdeaTextArea";

const ExpressToCodeArea = () => {
  return (
    <div style={{ position: "relative", height: "750px" }}>
      <IdeaTextArea />
      <QuestionButton />
    </div>
  );
};

export default ExpressToCodeArea;
