import React, { useState } from "react";
import CodeInput from "../molecules/aceEditor/CodeInput";
import CodeOutput from "../molecules/aceEditor/CodeOutput";
import CompileButton from "../molecules/buttons/CompileButton";
import HintButton from "../molecules/buttons/HintButton";
import CodeLoadButton from "../molecules/inputs/CodeLoadInput";
import CodeSaveButton from "../molecules/buttons/CodeSaveButton";
import CheckResultButton from "../molecules/buttons/CheckResultButton";
import CompileInputButton from "../molecules/buttons/CompileInputButton";
import styled from "styled-components";
import { Modal, Button, Container, InputGroup, FormControl } from "react-bootstrap";

const CompileContainer = () => {
  const [code, setCode] = useState(
    localStorage.getItem("currentCode") != null ? localStorage.getItem("currentCode") : ""
  );
  const [modalShow, setModalShow] = useState(false);
  const [resultCode, setResultCode] = useState("");
  const [inputList, setInputList] = useState([1, "안농", "dkslfajlakjsflkdajf"]);

  const onChange = (e) => {
    setCode(e);
  };

  // const onChangeValue = (e = {});

  const renderItem = (item, index) => {
    return (
      <InputGroup key={index}>
        <InputGroup.Prepend>
          <InputGroup.Text>{index}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl placeholder="input값을 순서대로 입력해주세요." onChange={item} />
        <InputGroup.Append>
          <Button variant="outline-secondary">삭제</Button>
          <Button variant="outline-primary">추가</Button>
        </InputGroup.Append>
      </InputGroup>
    );
  };

  const handleClose = () => {
    setModalShow(false);
  };

  const handleOpen = () => {
    setModalShow(true);
  };

  const onResultButtonClick = () => {
    if (window.sessionStorage.getItem("validCompile")) {
      window.location.href = "/result";
    } else {
      alert("컴파일을 먼저 해 주세요!");
    }
  };

  return (
    <div style={{ float: "center" }}>
      <div style={{ position: "relative", margin: "10px" }}>
        <CodeLoadButton onChange={onChange} />
        <CodeInput code={code} onChange={onChange} />
        <ButtonArea>
          <CompileInputButton onClick={handleOpen} /> {"  "}
          <CompileButton code={code} setResultCode={setResultCode} />
        </ButtonArea>
      </div>
      <div style={{ position: "relative", height: "200px", margin: "10px" }}>
        <CodeOutput resultCode={resultCode} />
        <HintButton resultCode={resultCode} />
      </div>
      <div style={{ height: "200px", margin: "10px" }}>
        <CodeSaveButton code={code} />
        <CheckResultButton code={code} onClick={onResultButtonClick} />
      </div>
      <Modal show={modalShow} onHide={handleClose} backdrop="static" keyboard={false} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Input값 입력</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {inputList.map((item, index) => {
              return renderItem(item, index);
            })}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleClose}>
            적용
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const ButtonArea = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
`;

export default CompileContainer;
