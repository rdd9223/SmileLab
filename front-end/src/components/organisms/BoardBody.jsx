import React, { useCallback, useState } from "react";
import BoardRow from "../molecules/table/BoardRow";

const BoardBody = ({ rows, setModalShow }) => {
  return (
    <tbody>
      {rows.map((item) => {
        return <BoardRow key={item.idx} body={item} setModalShow={setModalShow} />;
      })}
    </tbody>
  );
};

export default BoardBody;
