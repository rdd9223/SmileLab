import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';
import 'brace/snippets/python';
import 'brace/ext/language_tools';

const CodeInput = (props) => {
  return (
    <AceEditor
      style={{
        width: "100%"
      }}
      placeholder="코드를 입력해주세요"
      onChange={props.onChange}
      mode="python"
      theme="monokai"
      name="answer"
      fontSize={14}
      value={props.code}
      showGutter={true}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        showLineNumbers: true,
        tabSize: 2,
      }
    }/>
  )
}

export default CodeInput;