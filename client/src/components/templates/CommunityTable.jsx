import React from "react";
import { Table } from "react-bootstrap";
import BoardHeader from "../organisms/BoardHeader";
import BoardBody from "../organisms/BoardBody";

const CommunityTable = ({ headers, rows, setModalShow, onClick }) => {
  return (
    <Table hover>
      <BoardHeader headers={headers} />
      <BoardBody rows={rows} setModalShow={setModalShow} onClick={onClick} />
    </Table>
  );
};

export default CommunityTable;
