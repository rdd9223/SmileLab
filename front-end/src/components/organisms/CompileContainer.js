import React, {useState} from 'react';
import CodeInput from '../atoms/aceEditor/CodeInput';
import CodeOutput from '../atoms/aceEditor/CodeOutput';
import CompileButton from '../atoms/buttons/CompileButton';
import HintButton from '../atoms/buttons/HintButton';
import CodeLoadButton from '../atoms/inputs/CodeLoadInput';
import CodeSaveButton from '../atoms/buttons/CodeSaveButton';
import CheckResultButton from '../atoms/buttons/CheckResultButton';

const CompileContainer = () => {
  const [code, setCode] = useState("");
  const [resultCode, setResultCode] = useState("");
  
  const onChange = (e) => {
    setCode(e);
  }

  return (
    <div style={{float: 'center'}}>
      <div style={{position: "relative", margin: '10px'}}>
        <CodeLoadButton onChange={onChange}/>
        <CodeInput code={code} onChange={onChange} />
        <CompileButton code={code} resultCode={resultCode} setResultCode={setResultCode} />
      </div>
      <div style={{position: "relative", height: '200px', margin: '10px'}}>
        <CodeOutput resultCode={resultCode} />
        <HintButton resultCode={resultCode} />
      </div>
      <div style={{height: '200px', margin: '10px'}}>
        <CodeSaveButton code={code} />
        <CheckResultButton code={code} />
      </div>
    </div>
  );
}

export default CompileContainer;
