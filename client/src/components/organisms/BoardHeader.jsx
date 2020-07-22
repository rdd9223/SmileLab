import React from "react";
import BoardCol from "../molecules/table/BoardCol";

const BoardHeader = ({ headers }) => {
  return (
    <thead>
      <BoardCol headers={headers} />
    </thead>
  );
};

export default BoardHeader;
