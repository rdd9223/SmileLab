import React from "react";
import FormLabel from "../atoms/FormLabel";
import FormControl from "../atoms/FormControl";
import { Modal, Row, Col, Table } from "react-bootstrap";
import Button from "../atoms/Button";
import ClassSelectBody from "./ClassSelectBody";
import ClassSelectHeader from "./ClassSelectHeader";
import { getClass } from "./../../service/class.js";
import { getTake } from "./../../service/take.js";

const ClassModal = ({ updateClass }) => {
  const header = ["과목 명", "교수"];
  const [data, setData] = React.useState(null);
  const [currentClass, setCurrentClass] = React.useState("");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const loadClass = async () => {
      const res = await getClass();
      if (res != null) {
        setData(res.data.data);
      }
    };

    const loadTake = async () => {
      if (window.sessionStorage.getItem("loginToken") != null) {
        const res = await getTake();
        if (res != null && res.data.data.length !== 0) {
          setCurrentClass(res.data.data[0].name);
          if (updateClass != null) updateClass(res.data.data[0]);
        }
      }
    };
    loadClass();
    loadTake();
  }, [updateClass]);

  const handleClick = (idx) => {
    setCurrentClass(data[idx].class_name);
    if (updateClass != null) updateClass(data[idx]);
    setOpen(false);
  };

  return (
    <div>
      <FormLabel name="클래스" />
      <Row>
        <Col md={9}>
          <FormControl type="text" placeholder="클래스를 선택 해 주세요." readOnly={true} value={currentClass} />
        </Col>
        <Col md={3}>
          <Button name="검색하기" variant="primary" onClick={() => setOpen(true)} />
        </Col>
      </Row>
      <Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton onClick={() => setOpen(false)}>
          <Modal.Title>클래스를 선택 해 주세요.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data !== null && (
            <Table responsive>
              <ClassSelectHeader headers={header} />
              <ClassSelectBody rows={data} onClick={handleClick} />
            </Table>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ClassModal;
