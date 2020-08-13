import React from "react";
import Button from "../../atoms/Button";


const MessageRow = ({ body, onClick }) => {
  const idx = body.message_idx;
  return (
    <>
      <tr>
        <td>{body.message_idx}</td>
        <td>{body.class_name}</td>
        <td>{body.date}</td>
        <td>
          <Button
            name={"보기"}
            size="sm"
            onClick={() => onClick(idx)}
          />
        </td>
      </tr>
    </>
  );
  
}

export default MessageRow;
