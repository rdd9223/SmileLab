import React from "react";
import Th from "../molecules/table/Th";

const TableHeader = ({ headers }) => {
  return (
    <thead>
      <Th headers={headers} />
    </thead>
  );
};

export default TableHeader;
