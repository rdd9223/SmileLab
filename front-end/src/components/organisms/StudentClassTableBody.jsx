import React from "react";
import StudentClassRow from "../molecules/table/StudentClassRow";

const StudentClassTableBody = ({ rows }) => {
  return (
    <tbody>
      {rows.map((item, i) => {
        return <StudentClassRow body={item} key={item.result_idx} />;
      })}
    </tbody>
  );
};

export default StudentClassTableBody;
