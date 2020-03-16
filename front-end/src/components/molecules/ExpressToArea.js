import React from 'react';
import HintButton from '../atoms/buttons/HintButton';
import IdeaTextArea from '../atoms/textArea/IdeaTextArea';

const ExpressToCodeArea = () => {

  return (
    <div style={{position: "relative", height: '750px'}}>
      <IdeaTextArea />
      <HintButton />
    </div>
  )
}

export default ExpressToCodeArea;