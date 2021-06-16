import React from "react";
import { Form } from "react-bootstrap";

const IdeaTextArea = ({ text, setText }) => {
  return (
    <Form.Control
      as="textarea"
      value={text}
      onChange={(e) => setText(e.target.value)}
      style={{ height: "100%", float: "center", margin: "10px" }}
    />
  );
};

export default IdeaTextArea;
