import React from "react";
import CodeEditor from "../../atoms/CodeEditor";

const CodeOutput = (props) => {
  const { resultCode } = props;
  return (
    <CodeEditor
      style={{ height: "200px", width: "100%" }}
      name={"result"}
      readOnly={true}
      value={resultCode}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
};

export default CodeOutput;
