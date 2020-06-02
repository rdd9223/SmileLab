import React from "react";

const Th = ({ headers }) => {
  return (
    <tr>
      {headers.map((item, i) => {
        return <th key={i}>{item}</th>;
      })}
    </tr>
  );
};

export default Th;
