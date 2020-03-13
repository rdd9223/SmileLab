import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';
import 'brace/snippets/python';
import 'brace/ext/language_tools';
import { useAsync } from './useAsync';
import axios from 'axios';

const postSource = async(code) => {
  try {
    const response = await axios.post('http://localhost:4000', {
      source: code
    });
    console.log('👉 Returned data:', response);
    return response.data;
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
  }
}

function App() {
  const [code, setCode] = useState("");
  const [state, refetch] = useAsync(postSource(code), [], true);
  // const {loading, data: result, error} = state;

  // if (loading) return <div>로딩중 ...</div>;
  // if (error) return <div>에러!!!</div>;
  // if (!code) return <button onClick={refetch}>불러오기</button>;

  const onChange = (e) => {
    console.log("change", e)
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
            <Button variant="primary" on>실행</Button>
            <AceEditor
              placeholder="코드를 입력해주세요"
              mode="python"
              theme="monokai"
              name="result"
              readOnly={true}
              fontSize={14}
              value={code}
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
