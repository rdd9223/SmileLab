import React from "react";
import Td from "../../atoms/Td";

const TableBody = ({ rows }) => {
  return (
    <tbody>
      {rows.map((item, i) => {
        return <Td key={i} body={item} />;
      })}
    </tbody>
  );
};

export default TableBody;
