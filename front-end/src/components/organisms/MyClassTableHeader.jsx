import React from "react";

const MyClassTableHeader = ({ headers }) => {
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

export default MyClassTableHeader;
