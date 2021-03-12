import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import Jumbotron from "../components/atoms/Jumbotron";
import styled from "styled-components";
import Button from "../components/atoms/Button";
import { postMessage } from "./../service/message.js";
import { getProfClassAll, getProfClass } from "./../service/class.js";
import { getTake } from "./../service/take.js";
import { getUser } from "./../service/user.js";

const Wrapper = styled.div`
  width: 50em;
  margin: 50px auto;
  div {
    height: 200px;
  }
`;

const SendMessageContainer = () => {
  const [clazz, setClass] = React.useState([]);
  const [student, setStudent] = React.useState([]);
  const [currentClass, setCurrentClass] = React.useState(null);
  const [currentReceiver, setCurrentReceiver] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [userType, setUserType] = React.useState(null);

  React.useEffect(() => {
    const loadClass = async (userType) => {
      if (userType === 2) {
        const res = await getTake();
        if (res != null && res.data.status === 200) {
          await loadStudentList(res.data.data[0].class_idx);
        }
      } else {
        const res = await getProfClassAll();
        if (res != null) {
          setClass(res.data.data);
        }
      }
    };
    const loadUser = async () => {
      const res = await getUser();
      if (res != null && res.data.status === 200) {
        setUserType(res.data.data.type);
        loadClass(res.data.data.type);
      }
    };
    loadUser();
  }, []);

  const loadStudentList = async (event) => {
    const idx = event;
    if (idx != null) {
      const res = await getProfClass(idx);
      //console.log(res);
      if (res != null) {
        setStudent(res.data.data);
        setCurrentClass(idx);
      }
    }
  };

  const changeClass = async (event) => {
    const idx = event.target.value;

    if (idx != null) {
      const res = await getProfClass(idx);
      //console.log(res);
      if (res != null) {
        setStudent(res.data.data);
        setCurrentClass(idx);
      }
    }
  };

  const changeStudent = (event) => {
    const idx = event.target.value;
    setCurrentReceiver(idx);
  };

  const sendMessage = async () => {
    //console.log(currentClass, currentReceiver, message);
    if (currentClass == null) {
      alert("강의를 선택 해 주세요.");
    } else if (message.length === 0) {
      alert("메세지를 입력 해 주세요.");
    } else {
      const res = await postMessage(currentClass, currentReceiver, message);
      if (res != null && res.data.status === 201) {
        alert(res.data.message);
        window.location.href = "/message";
      } else {
        if (student.length === 0) {
          alert(`${res.data.message}. 수강학생이 존재하는지 확인 해 주세요.`);
        } else {
          alert(`${res.data.message}`);
        }
      }
    }
  };

  const changeMessage = (event) => {
    const value = event.target.value;
    setMessage(value);
  };

  if (userType === 2) {
    return (
      <Wrapper>
        <div>
          <Jumbotron header={"메세지 보내기"} text={"학생들에게 메세지를 보내세요."} />
        </div>
        <small>보낼 사람을 선택 해 주세요.</small>
        <Row style={{ height: "4em" }}>
          <Col style={{ height: "4em" }}>
            <Form.Control as="select" defaultValue={0} onChange={changeStudent}>
              <option key={0} value={0}>
                전체
              </option>
              {student != null &&
                student.map((item, idx) => {
                  return (
                    <option key={idx + 1} value={item.student_idx}>
                      {item.name}
                    </option>
                  );
                })}
            </Form.Control>
          </Col>
        </Row>
        <small>보낼 메세지를 작성 해 주세요.</small>
        <Form.Control
          onChange={(event) => changeMessage(event)}
          placeholder={"메세지를 입력 해 주세요."}
          type="name"
          as="textarea"
          rows="10"
        />
        <br />
        <Button name="보내기" onClick={sendMessage} />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <div>
          <Jumbotron header={"메세지 보내기"} text={"학생들에게 메세지를 보내세요."} />
        </div>
        <br />
        <Row style={{ height: "4em" }}>
          <Col style={{ height: "4em" }}>
            <Form.Control as="select" defaultValue={currentClass} onChange={changeClass}>
              <option key={0} value={null}>
                강의를 선택 하세요.
              </option>
              {clazz != null &&
                clazz.map((item, idx) => {
                  return (
                    <option key={idx + 1} value={item.class_idx}>
                      {item.name}
                    </option>
                  );
                })}
            </Form.Control>
          </Col>
          <Col style={{ height: "4em" }}>
            <Form.Control as="select" defaultValue={currentReceiver} onChange={changeStudent}>
              <option key={0} value={0}>
                전체
              </option>
              {student != null &&
                student.map((item, idx) => {
                  return (
                    <option key={idx + 1} value={item.student_idx}>
                      {item.name}
                    </option>
                  );
                })}
            </Form.Control>
          </Col>
        </Row>
        <Form.Control
          onChange={(event) => changeMessage(event)}
          placeholder={"메세지를 입력 해 주세요."}
          type="name"
          as="textarea"
          rows="10"
        />
        <br />
        <Button name="보내기" onClick={sendMessage} />
      </Wrapper>
    );
  }
};

export default SendMessageContainer;
