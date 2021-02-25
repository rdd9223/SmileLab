import Button from "components/atoms/Button";
import React from "react";
import { Modal } from "react-bootstrap";
import QuestionButton from "../molecules/buttons/QuestionButton";
import IdeaTextArea from "../molecules/textArea/IdeaTextArea";

const img_example = require("../../images/img_example_code.png")

const ExpressToCodeArea = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [text, setText] = React.useState(window.localStorage.getItem("text_idea") || "#")

  const handleDelete = () => {
    setText("#")
    window.localStorage.removeItem("text_idea")
  }

  const handleSave = () => {
    window.localStorage.setItem("text_idea", text)
  }

  return (
    <div style={{ height: "750px" }}>
      <IdeaTextArea text={text} setText={setText} />
      <div style={{display:'flex'}}>
        <div>
          <Button onClick={() => setModalShow(true)} name="예시" size="xs" />
          <Modal show={modalShow} onHide={() => setModalShow(false)} >
            <div>
              <img src={img_example} alt="example" width="100%" />
            </div>
          </Modal>
        </div>
        <div style={{flexGrow: 1}} />
        <div style={{marginRight: 6}}>
          <Button onClick={handleDelete} name="전체삭제" size="xs" />
        </div>
        <div style={{marginRight: 6}}>
          <Button onClick={handleSave} name="중간저장" size="xs" />
        </div>
        <div>
          <Button name="제출" size="xs" />
        </div>
      </div>
    </div>
  );
};

export default ExpressToCodeArea;
