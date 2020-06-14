import React, { useCallback, useState } from "react";

const BoardRow = ({ body, setModalShow }) => {
  return (
    <>
      <tr onClick={() => setModalShow(true)}>
        <td>{body.idx}</td>
        <td>{body.title}</td>
        <td>{body.writer}</td>
        <td>{body.date}</td>
      </tr>
    </>
  );
};

export default BoardRow;
