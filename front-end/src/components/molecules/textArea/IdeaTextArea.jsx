import React from "react";
import { Form } from "react-bootstrap";

const IdeaTextArea = () => {
  return (
    <Form.Control
      as="textarea"
      defaultValue="#"
      style={{ height: "100%", float: "center", margin: "10px" }}
    />
  );
};

export default IdeaTextArea;
