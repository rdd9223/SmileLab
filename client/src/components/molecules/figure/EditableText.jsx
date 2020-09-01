import React, { useState, Fragment, useRef } from "react";
import { Text } from "react-konva";
import Portal from "./Portal";
import styled from "styled-components";

const EditableText = ({ shapeProps, stageRef }) => {
  const [textEditVisible, setTextEditVisible] = useState(false);
  const [textXY, setTextXY] = useState({ x: 0, y: 0 });
  const [textValue, setTextValue] = useState("여기에 입력해주세요");
  const textRef = useRef();
  const stageBox = stageRef.current.container().getBoundingClientRect();

  const handleDoubleClick = (e) => {
    const absPos = e.target.getAbsolutePosition();
    setTextEditVisible(true);
    setTextXY({ x: stageBox.left + absPos.x, y: stageBox.top + absPos.y });
  };

  const handleTextEdit = (e) => {
    setTextValue(e.target.value);
  };

  const handleTextareaKeyDown = (e) => {
    if (e.keyCode === 13) {
      setTextEditVisible(false);
    }
  };

  return (
    <Fragment>
      <Text
        ref={textRef}
        onDblClick={handleDoubleClick}
        {...shapeProps}
        text={textValue}
        draggable
      />
      <Portal>
        <CoverTextArea
          value={textValue}
          textEditVisible={textEditVisible}
          textXY={textXY}
          onChange={handleTextEdit}
          onKeyDown={handleTextareaKeyDown}
          textRef={textRef}
        />
      </Portal>
    </Fragment>
  );
};

const CoverTextArea = styled.textarea`
  display: ${(props) => (props.textEditVisible ? "block" : "none")};
  position: absolute;
  top: ${(props) => props.textXY.y - 3}px;
  left: ${(props) => props.textXY.x}px;
  width: ${(props) => props.textRef.current.getWidth() - props.textRef.current.getPadding() * 2}px;
  height: ${(props) =>
    props.textRef.current.getHeight() - props.textRef.current.getPadding() * 2}px;
  font-size: ${(props) => props.textRef.current.getFontSize()}px;
  border: none;
  padding: 0px;
  margin: 0px;
  overflow: hidden;
  background: none;
  outline: none;
  resize: none;
  transform-origin: left top;
  line-height: ${(props) => {
    props.textRef.current.getLineHeight();
  }};
  font-family: ${(props) => props.textRef.current.getFontFamily()};
  text-align: ${(props) => props.textRef.current.getAlign()};
  color: ${(props) => props.textRef.current.getFill()};
`;

export default EditableText;
