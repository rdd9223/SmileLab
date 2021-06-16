import React from "react";
import produce from "immer";
import { Modal, Button, Container, InputGroup, FormControl } from "react-bootstrap";

const CodeInputContainer = ({ inputList, setInputList, modalShow, handleClose }) => {
  const handleDeleteList = (index) => {
    if (index === 0) {
      alert("첫 번째 열은 삭제할 수 없습니다.");
    } else {
      setInputList(
        produce(inputList, (draft) => {
          draft = draft.splice(index, 1);
        })
      );
    }
  };

  const handleAddList = (index) => {
    setInputList(
      produce(inputList, (draft) => {
        draft = draft.splice(index + 1, 0, "");
      })
    );
  };

  const handleChangeList = (e, index) => {
    const value = e.target.value;
    setInputList(
      produce(inputList, (draft) => {
        draft[index] = value;
      })
    );
  };

  const renderItem = (item, index) => {
    return (
      <InputGroup key={index} style={{ margin: 6 }}>
        <InputGroup.Prepend>
          <InputGroup.Text style={{ width: 40 }}>{index}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="input값을 순서대로 입력해주세요."
          onChange={(e) => handleChangeList(e, index)}
          value={item}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={() => handleDeleteList(index)}>
            삭제
          </Button>
          <Button variant="outline-primary" onClick={() => handleAddList(index)}>
            추가
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  };

  return (
    <Modal
      show={modalShow}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Input값 입력</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {inputList.map((item, index) => {
            return renderItem(item, index);
          })}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleClose}>
          적용
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CodeInputContainer;
