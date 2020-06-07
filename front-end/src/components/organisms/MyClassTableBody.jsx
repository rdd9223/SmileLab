import React from "react";
import Td from "../molecules/table/Td";

const MyClassTableBody = ({ rows }) => {
  return (
    <tbody>
      {rows.map((item) => {
        return <Td key={item.idx} body={item} />;
      })}
    </tbody>
  );
};

export default MyClassTableBody;
