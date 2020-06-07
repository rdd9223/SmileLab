import React from "react";

const BoardBody = ({ body }) => {
  return (
    <tr>
      <td>{body.idx}</td>
      <td>{body.title}</td>
      <td>{body.writer}</td>
      <td>{body.date}</td>
    </tr>
  );
};

export default BoardBody;
