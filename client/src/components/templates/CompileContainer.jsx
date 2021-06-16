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
import CompileInputContainer from "components/templates/CompileInputContainer";

const CompileContainer = () => {
  const [code, setCode] = useState(
    localStorage.getItem("currentCode") != null ? localStorage.getItem("currentCode") : ""
  );
  const [modalShow, setModalShow] = useState(false);
  const [resultCode, setResultCode] = useState("");
  const [inputList, setInputList] = useState([""]);

  const onChange = (e) => {
    setCode(e);
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
          <CompileButton code={code} input={inputList} setResultCode={setResultCode} />
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
      <CompileInputContainer
        inputList={inputList}
        setInputList={setInputList}
        modalShow={modalShow}
        handleClose={handleClose}
      />
    </div>
  );
};

const ButtonArea = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
`;

export default CompileContainer;
