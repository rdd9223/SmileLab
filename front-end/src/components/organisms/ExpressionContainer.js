import React, { useState } from "react";
import ExpressToCodeArea from "../molecules/ExpressToCodeArea";
import DragAndDrop from "../molecules/DragAndDrop";
import ExpressRadioGroup from '../molecules/ExpressRadioGroup';

const ExpressionContainer = () => {

  const [selectOption, setSelectOption] = useState('순서도로 표현하기');
  const onChange = (e) => {
    setSelectOption(e.target.value);
  }

  const ToggleExpressionArea = () => {
    return selectOption==='순서도로 표현하기'?(<DragAndDrop/>):(<ExpressToCodeArea/>)
  }

  return (
    <div style={{ height: "60%", float: "center" }}>
      <ExpressRadioGroup selectOption={selectOption} onChange={onChange}/>
      <ToggleExpressionArea/>
    </div>
  );
};

export default ExpressionContainer;
