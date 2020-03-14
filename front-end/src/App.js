import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import AceEditor from 'react-ace';
import {postSource} from './service/app';
import 'brace/mode/python';
import 'brace/theme/monokai';
import 'brace/snippets/python';
import 'brace/ext/language_tools';

function App() {
  const [code, setCode] = useState("");
  const [resultCode, setResultCode] = useState("");
  
  const fetchPostSource = async(code) => {
    const result = await postSource(code);
    setResultCode(result.data.data);
  }

  const onChange = (e) => {
    setCode(e);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <form>
            <AceEditor
              placeholder="코드를 입력해주세요"
              onChange={onChange}
              mode="python"
              theme="monokai"
              name="answer"
              fontSize={14}
              value={code}
              showGutter={true}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                showLineNumbers: true,
                tabSize: 2,
              }
            }/>
            <Button variant="primary" onClick={() => fetchPostSource(code)}>실행</Button>
            <AceEditor
              placeholder="코드를 입력해주세요"
              mode="python"
              theme="monokai"
              name="result"
              readOnly={true}
              fontSize={14}
              value={resultCode}
              showGutter={true}
              setOptions={{
                showLineNumbers: true,
                tabSize: 2,
              }
            }/>
          </form>
      </header>
      
    </div>
  );
}

export default App;
