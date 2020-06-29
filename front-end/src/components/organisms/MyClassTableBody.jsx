import React from "react";
import Td from "../molecules/table/Td";

const MyClassTableBody = ({ rows, onClick }) => {
  return (
    <tbody>
      {rows.map((item, i) => {
        return <Td body={item} key={item.result_idx} onClick={onClick} />;
      })}
    </tbody>
  );
};

export default MyClassTableBody;
