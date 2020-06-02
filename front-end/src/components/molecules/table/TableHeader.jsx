import React from "react";
import Th from "../../atoms/Th";

const TableHeader = ({ headers }) => {
  return (
    <thead>
      <Th headers={headers} />
    </thead>
  );
};

export default TableHeader;
