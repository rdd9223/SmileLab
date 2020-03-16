import React from 'react';
import ExpressToCodeArea from '../molecules/ExpressToArea';
import ExpressRadioGroup from '../molecules/ExpressRadioGroup';

const ExpressionContainer = () => {

  return (
    <div style={{height: '60%', float: 'center'}}>
      <ExpressRadioGroup />
      <ExpressToCodeArea />
    </div>
  );
}

export default ExpressionContainer;
