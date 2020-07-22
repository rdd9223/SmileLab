import React from "react";
import ClassSelectCol from "../molecules/table/ClassSelectCol";

const ClassSelectHeader = ({ headers }) => {
  return (
    <thead>
      <ClassSelectCol headers={headers} />
    </thead>
  );
};

export default ClassSelectHeader;
