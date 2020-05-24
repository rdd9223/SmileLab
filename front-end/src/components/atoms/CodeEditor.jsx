import React from "react";
import AceEditor from "react-ace";
import "brace/mode/python";
import "brace/theme/monokai";
import "brace/snippets/python";
import "brace/ext/language_tools";
import styled from "styled-components";

const CodeEditor = (props) => {
  const { setOptions, value, name, readOnly, onChange, style } = props;

  return (
    <AceEditor
      style={style}
      placeholder="코드를 입력해주세요"
      onChange={onChange}
      readOnly={readOnly}
      mode="python"
      theme="monokai"
      name={name}
      fontSize={14}
      value={value}
      showGutter={true}
      setOptiosns={setOptions}
    />
  );
};

export default CodeEditor;
