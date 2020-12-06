import React from "react";

const BoardRow = ({ idx, body, onClick }) => {
  return (
    <>
      <tr onClick={() => onClick(idx)}>
        <td>{idx + 1}</td>
        <td>{body.title}</td>
        <td>{body.writer}</td>
        <td>{body.date}</td>
      </tr>
    </>
  );
};

export default BoardRow;
