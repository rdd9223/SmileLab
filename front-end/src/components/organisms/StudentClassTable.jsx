import React from "react";
import { Table } from "react-bootstrap";
import StudentClassTableHeader from "./StudentClassTableHeader";
import StudentClassTableBody from "./StudentClassTableBody";

const StudentClassTable = ({ headers, rows, onClick }) => {
  return (
    <Table responsive>
      <StudentClassTableHeader headers={headers} />
      <StudentClassTableBody rows={rows} onClick={onClick} />
    </Table>
  );
};

export default StudentClassTable;
