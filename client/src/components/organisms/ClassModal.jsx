import React from "react";
import FormLabel from "../atoms/FormLabel";
import FormControl from "../atoms/FormControl";
import { Modal, Row, Col, Table } from "react-bootstrap";
import Button from "../atoms/Button";
import ClassSelectBody from "./ClassSelectBody";
import ClassSelectHeader from "./ClassSelectHeader";
import { getClass } from "./../../service/class.js";
import { getTake } from "./../../service/take.js";

class ClassModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHide: false,
      header: ["과목 명", "교수"],
      data: null,
      currentClassName: "",
    };
    this.onClick = this.onClick.bind(this);
    this.loadClass = this.loadClass.bind(this);
    this.loadTake = this.loadTake.bind(this);
    this.loadClass();
    this.loadTake();
  }

  async loadClass() {
    const res1 = await getClass();
    this.setState({ data: res1.data.data });
  }

  async loadTake() {
    if (window.sessionStorage.getItem("loginToken") != null) {
      const res2 = await getTake();
      this.setState({ currentClassName: res2.data.data[0].name });
      this.props.updateClass(res2.data.data[0]);
    }
  }

  handleModalShowHide(event) {
    this.setState({ showHide: !this.state.showHide });
  }

  onClick(idx) {
    this.setState({ currentClassName: this.state.data[idx].class_name });
    this.props.updateClass(this.state.data[idx]);
    this.handleModalShowHide();
  }

  render() {
    return (
      <div>
        <FormLabel name="클래스" />
        <Row>
          <Col md={9}>
            <FormControl
              type="text"
              placeholder=""
              value={this.state.currentClassName}
            />
          </Col>
          <Col md={3}>
            <Button
              name="검색하기"
              variant="primary"
              onClick={(event) => this.handleModalShowHide(event)}
            />
          </Col>
        </Row>
        <Modal show={this.state.showHide}>
          <Modal.Header
            closeButton
            onClick={(event) => this.handleModalShowHide()}
          >
            <Modal.Title>클래스를 선택 해 주세요.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.data != null && (
              <Table responsive>
                <ClassSelectHeader headers={this.state.header} />
                <ClassSelectBody
                  rows={this.state.data}
                  onClick={this.onClick}
                />
              </Table>
            )}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ClassModal;
