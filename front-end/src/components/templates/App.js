import React, {useState} from 'react';
import CodeInput from '../atoms/aceEditor/CodeInput';
import CodeOutput from '../atoms/aceEditor/CodeOutput';
import CompileButton from '../atoms/buttons/Compile';

function App() {
  const [code, setCode] = useState("");
  const [resultCode, setResultCode] = useState("");
  
  

  const onChange = (e) => {
    setCode(e);
  }

  return (
    <div className="App">
      <header className="App-header">
          <div style={{position: "relative"}}>
            <CodeInput code={code} onChange={onChange} />
            <CompileButton code={code} resultCode={resultCode} setResultCode={setResultCode} />
          </div>
            <CodeOutput resultCode={resultCode} />
      </header>
    </div>
  );
}

export default App;
