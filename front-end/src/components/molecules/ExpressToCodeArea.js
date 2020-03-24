import React from 'react';
import HintButton from '../atoms/buttons/HintButton';
import IdeaTextArea from '../atoms/textArea/IdeaTextArea';

const ExpressToCodeArea = () => {

  return (
    <div style={{position: "relative", height: '750px'}}>
      <IdeaTextArea />
      <HintButton message={"의사코드 활용 예시"}/>
    </div>
  )
}

export default ExpressToCodeArea;