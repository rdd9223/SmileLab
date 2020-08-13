import React from "react";
import MessageRow from "../molecules/table/MessageRow";

const MessageBody = ({ rows, onClick }) => {
  return (
    <tbody>
      {rows.map((item) => {
        return (
          <MessageRow
            key={item.message_idx}
            body={item}
            onClick={onClick}
          />
        );
      })}
    </tbody>
  );
  
}

export default MessageBody;
