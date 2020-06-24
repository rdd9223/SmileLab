import React from "react";
import { Modal , Button } from "react-bootstrap";

const Modal1 = ({ show = false, onHide, title, contents }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-rbmodal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-rbmodal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4></h4>
        <p>
          {contents}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modal1;
