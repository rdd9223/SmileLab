import React from "react";
import Td from "../molecules/table/Td";

const MyClassTableBody = ({ rows }) => {
  return (
    <tbody>
      {rows.map((item, i) => {
        return <Td body={item} key={i} />;
      })}
    </tbody>
  );
};

export default MyClassTableBody;
