import React from "react";
import { Table } from "react-bootstrap";
import MyClassTableHeader from "../molecules/table/MyClassTableHeader";
import MyClassTableBody from "./MyClassTableBody";

const MyClassTable = ({ headers, rows }) => {
  return (
    <Table responsive>
      <MyClassTableHeader headers={headers} />
      <MyClassTableBody rows={rows} />
    </Table>
  );
};

export default MyClassTable;
