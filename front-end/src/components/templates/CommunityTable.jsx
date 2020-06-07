import React from "react";
import { Table } from "react-bootstrap";
import BoardHeader from "../organisms/BoardHeader";
import BoardBody from "../organisms/BoardBody";

const CommunityTable = ({ headers, rows }) => {
  return (
    <Table hover>
      <BoardHeader headers={headers} />
      <BoardBody rows={rows} />
    </Table>
  );
};

export default CommunityTable;
