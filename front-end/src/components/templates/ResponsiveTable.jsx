import React from "react";
import { Table } from "react-bootstrap";
import TableHeader from "../organisms/TableHeader";
import TableBody from "../organisms/TableBody";

const ResponsiveTable = ({ headers, rows }) => {
  return (
    <Table responsive>
      <TableHeader headers={headers} />
      <TableBody rows={rows} />
    </Table>
  );
};

export default ResponsiveTable;
