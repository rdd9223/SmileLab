import React from "react";
import ClassSelectRow from "../molecules/table/ClassSelectRow";

const ClassSelect = ({ rows, setModalShow, onClick }) => {
  return (
    <tbody>
      {rows.map((item, idx) => {
        return (
          <ClassSelectRow
            key={idx}
            idx={idx}
            body={item}
            setModalShow={setModalShow}
            onClick={onClick}
          />
        );
      })}
    </tbody>
  );
};

export default ClassSelect;
