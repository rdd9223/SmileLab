import React from "react";

const Td = ({ body }) => {
  return (
    <tr>
      {Object.keys(body).map((key, i) => (
        <td key={i}>{body[key]}</td>
      ))}
    </tr>
  );
};

export default Td;
