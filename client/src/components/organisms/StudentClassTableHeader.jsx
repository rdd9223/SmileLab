import React from "react";

const StudentClassTableHeader = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((item, i) => {
          return <th key={i}>{item}</th>;
        })}
      </tr>
    </thead>
  );
};

export default StudentClassTableHeader;
