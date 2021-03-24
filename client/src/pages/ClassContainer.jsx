import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import SendMessageButton from "../components/molecules/buttons/SendMessageButton";
import ClassCreateButton from "../components/molecules/buttons/ClassCreateButton";
import styled from "styled-components";
import Jumbotron from "./../components/atoms/Jumbotron";
import StudentClassTable from "./../components/organisms/StudentClassTable";
import { getProfClassAll, getProfClass } from "./../service/class.js";
import { getStuResult } from "./../service/result.js";
import ClassDeleteButton from "components/molecules/buttons/ClassDeleteButton";

const ClassContainer = () => {
  const header = ["날짜", "변수", "연산자", "데이터", "조건문", "반복문", "함수"];
  const [clazz, setClass] = React.useState([]);
  const [student, setStudent] = React.useState([]);
  const [currentStudent, setCurrentStudent] = React.useState(null);
  const [currentData, setCurrentData] = React.useState([]);
  const [currentClass, setCurrentClass] = React.useState(null);

  React.useEffect(() => {
    loadClass();
  }, []);

  const loadClass = async () => {
    const res = await getProfClassAll();
    if (res != null) {
      setClass(res.data.data);
    }
  };

  const changeClass = async (e) => {
    const idx = e.target.value;
    const res = await getProfClass(idx);
    if (res != null) {
      setStudent(res.data.data);
      setCurrentClass(idx);
      setCurrentData([]);
    }
  };

  const changeStudent = async (e) => {
    const idx = e.target.value;
    const res = await getStuResult(currentClass, idx);
    if (res != null) {
      setCurrentData(res.data.data);
      setCurrentStudent(idx);
    }
  };

  const Wrapper = styled.div`
    width: 50em;
    margin: 50px auto;
    height: 600px;
  `;
  return (
    <Wrapper>
      <div>
        <Jumbotron header={"클래스 관리"} text={"학생들을 학습 내용을 조회 할 수 있습니다."}></Jumbotron>
      </div>
      <br />
      <Row>
        <Col>
          <Form.Control as="select" defaultValue={currentClass} onChange={changeClass}>
            <option>강의를 선택 하세요.</option>
            {clazz.map((item, idx) => {
              return (
                <option key={idx} value={item.class_idx}>
                  {item.name}
                </option>
              );
            })}
          </Form.Control>
        </Col>
        <Col>
          <Form.Control as="select" defaultValue={currentStudent} onChange={changeStudent}>
            <option>학생을 선택 하세요.</option>
            {student.map((item, idx) => {
              return (
                <option key={idx} value={item.student_idx}>
                  {item.name}
                </option>
              );
            })}
          </Form.Control>
        </Col>
      </Row>
      <br />
      {currentData != null && (
        <Row>
          <StudentClassTable headers={header} rows={currentData} />
        </Row>
      )}
      <div style={{ float: "right" }}>
        <Link to="/sendMessage">
          <SendMessageButton size={"sm"} />
        </Link>{" "}
        <Link to="/createClass">
          <ClassCreateButton size={"sm"} />
        </Link>{" "}
        <ClassDeleteButton class_idx={currentClass} loadClass={loadClass} size={"sm"} />
      </div>
    </Wrapper>
  );
};

export default ClassContainer;
