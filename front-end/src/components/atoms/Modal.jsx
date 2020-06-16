import React from "react";
import { Modal as rbModal, Button } from "react-bootstrap";

const Modal = ({ show, onHide }) => {
  return (
    <rbModal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-rbmodal-title-vcenter"
      centered
    >
      <rbModal.Header closeButton>
        <rbModal.Title id="contained-rbmodal-title-vcenter">rbModal heading</rbModal.Title>
      </rbModal.Header>
      <rbModal.Body>
        <h4>Centered rbModal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
      </rbModal.Body>
      <rbModal.Footer>
        <Button onClick={onHide}>Close</Button>
      </rbModal.Footer>
    </rbModal>
  );
};

export default Modal;
