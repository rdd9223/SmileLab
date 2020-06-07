import React from "react";
import BoardRow from "../molecules/table/BoardRow";

const BoardBody = ({ rows }) => {
  return (
    <tbody>
      {rows.map((item) => {
        return <BoardRow key={item.idx} body={item} />;
      })}
    </tbody>
  );
};

export default BoardBody;
