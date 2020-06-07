import React from "react";
import { Table } from "react-bootstrap";
import TableHeader from "../organisms/TableHeader";
import MyClassTableBody from "../organisms/MyClassTableBody";

const MyClassTable = ({ headers, rows }) => {
  return (
    <Table responsive>
      <TableHeader headers={headers} />
      <MyClassTableBody rows={rows} />
    </Table>
  );
};

export default MyClassTable;
