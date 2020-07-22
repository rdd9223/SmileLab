import React from "react";
import { Modal , Button } from "react-bootstrap";

const Modal1 = ({ show = false, onHide, title, contents, writer, date }) => {
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
      <Modal.Body style={{height: "300px"}}>
        <small>작성자 : {writer}</small>
        <br/>
        <small>{date}</small>
        <br/><br/>
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
