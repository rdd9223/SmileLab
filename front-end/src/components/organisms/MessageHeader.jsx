import React from "react";
import MessageCol from "../molecules/table/MessageCol";

const MessageHeader = ({ headers }) => {
  return (
    <thead>
      <MessageCol headers={headers} />
    </thead>
  );
};

export default MessageHeader;
