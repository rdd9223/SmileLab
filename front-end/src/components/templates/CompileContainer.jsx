import React, { useState } from "react";
import CodeInput from "../molecules/aceEditor/CodeInput";
import CodeOutput from "../molecules/aceEditor/CodeOutput";
import CompileButton from "../molecules/buttons/CompileButton";
import HintButton from "../molecules/buttons/HintButton";
import CodeLoadButton from "../molecules/inputs/CodeLoadInput";
import CodeSaveButton from "../molecules/buttons/CodeSaveButton";
import CheckResultButton from "../molecules/buttons/CheckResultButton";
import { Link } from "react-router-dom";

const CompileContainer = () => {
  const [code, setCode] = useState((localStorage.getItem('currentCode') != null) ? localStorage.getItem('currentCode') : "");
  const [resultCode, setResultCode] = useState("");
  const [isSuccess, setSuccess] = useState(false);

  const onChange = (e) => {
    setCode(e);
  };

  return (
    <div style={{ float: "center" }}>
      <div style={{ position: "relative", margin: "10px" }}>
        <CodeLoadButton onChange={onChange} />
        <CodeInput code={code} onChange={onChange} />
        <CompileButton code={code} setResultCode={setResultCode} />
      </div>
      <div style={{ position: "relative", height: "200px", margin: "10px" }}>
        <CodeOutput resultCode={resultCode} />
        <HintButton resultCode={resultCode} />
      </div>
      <div style={{ height: "200px", margin: "10px" }}>
        <CodeSaveButton code={code} />
        <Link to="/result">
          <CheckResultButton code={code} />
        </Link>
      </div>
    </div>
  );
};

export default CompileContainer;
