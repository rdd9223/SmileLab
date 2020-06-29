import React from "react";
import FormCheck from "../../atoms/FormCheck";

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
      <td>{renderOX(body.variable)}</td>
      <td>{renderOX(body.operator)}</td>
      <td>{renderOX(body.data)}</td>
      <td>{renderOX(body.conditional)}</td>
      <td>{renderOX(body.repeat)}</td>
      <td>{renderOX(body.function)}</td>
      <td>
        <FormCheck id={body.result_idx} type="checkbox" label="" name={"deleteSelected"} onClick={onClick} />
      </td>
    </tr>
  );
};

export default Td;
