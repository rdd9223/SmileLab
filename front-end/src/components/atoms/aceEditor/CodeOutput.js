import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';
import 'brace/snippets/python';
import 'brace/ext/language_tools';

const CodeOutput = (props) => {
  return (
    <AceEditor
      placeholder="코드를 입력해주세요"
      mode="python"
      theme="monokai"
      name="result"
      readOnly={true}
      fontSize={14}
      value={props.resultCode}
      showGutter={true}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2,
      }
    }/>
  )
}

export default CodeOutput;