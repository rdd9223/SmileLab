import React from 'react';
import QuestionButton from '../atoms/buttons/QuestionButton';
import IdeaTextArea from '../atoms/textArea/IdeaTextArea';

const ExpressToCodeArea = () => {

  return (
    <div style={{position: "relative", height: '750px'}}>
      <IdeaTextArea />
      <QuestionButton />
    </div>
  )
}

export default ExpressToCodeArea;