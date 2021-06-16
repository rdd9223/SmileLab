import React from "react";
import { Table } from "react-bootstrap";
import MessageHeader from "../organisms/MessageHeader";
import MessageBody from "../organisms/MessageBody";

const MessageTable = ({ headers, rows, onClick }) => {
  return (
    <Table hover>
      <MessageHeader headers={headers} />
      <MessageBody rows={rows} onClick={onClick} />
    </Table>
  );
};

export default MessageTable;
