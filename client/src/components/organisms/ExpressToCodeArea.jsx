import Button from "components/atoms/Button";
import React from "react";
import QuestionButton from "../molecules/buttons/QuestionButton";
import IdeaTextArea from "../molecules/textArea/IdeaTextArea";

const ExpressToCodeArea = () => {
  return (
    <div style={{ height: "750px" }}>
      <IdeaTextArea />
      <div style={{display:'flex'}}>
        <div>
          <Button name="예시" size="xs" />
        </div>
        <div style={{flexGrow: 1}} />
        <div style={{marginRight: 6}}>
          <Button name="전체삭제" size="xs" />
        </div>
        <div style={{marginRight: 6}}>
          <Button name="중간저장" size="xs" />
        </div>
        <div>
          <Button name="제출" size="xs" />
        </div>
      </div>
    </div>
  );
};

export default ExpressToCodeArea;
