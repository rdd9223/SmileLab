import React from "react";
import CodeEditor from "../../atoms/CodeEditor";

const CodeInput = (props) => {
  const { onChange, code } = props;

  return (
    <CodeEditor
      style={{ width: "100%" }}
      onChange={onChange}
      name={"answer"}
      value={code}
      readOnly={false}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
};

export default CodeInput;
