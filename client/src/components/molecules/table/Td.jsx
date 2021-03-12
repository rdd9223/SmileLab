import React from "react";
import Check from "../../atoms/Check";

const Td = ({ body, onClick }) => {
  const renderOX = (value) => {
    if (value === 0) {
      return "-";
    } else if (value >= 1) {
      return "✔";
    } else {
      return value;
    }
  };

  return (
    <tr>
      <td>{body.date}</td>
      <td>{renderOX(body.data_abstract)}</td>
      <td>
        <div style={{fontSize: 12}}>튜플{renderOX(body.tuple)}</div>
        <div style={{fontSize: 12}}>딕셔너리{renderOX(body.dictionary)}</div>
        <div style={{fontSize: 12}}>집합{renderOX(body.set)}</div>
        <div style={{fontSize: 12}}>리스트{renderOX(body.list)}</div>
      </td>
      <td style={{display:'flex', flexDirection:'column', justifyContent:'center', height:'100%'}}>{renderOX(body.variable)}</td>
      <td>{renderOX(body.problem_resolving)}</td>
      <td>{renderOX(body.operator)}</td>
      <td>{renderOX(body.conditional)}</td>
      <td>{renderOX(body.repeat)}</td>
      <td>{renderOX(body.function)}</td>
      <td>{renderOX(body.class_method)}</td>
      <td>{renderOX(body.import)}</td>
      <td>
        <Check id={body.result_idx} type="checkbox" label="" name={"deleteSelected"} onClick={onClick} />
      </td>
    </tr>
  );
};

export default Td;
