import React from "react";

const BoardRow = ({ idx, body, setModalShow, onClick }) => {
  return (
    <>
      <tr onClick={() => onClick(idx)}>
        <td>{body.class_name}</td>
        <td>{body.professor_name}</td>
      </tr>
    </>
  );
};

export default BoardRow;
