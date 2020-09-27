import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import FormText from "../components/atoms/FormText";
import FormLabelSet from "../components/molecules/form/FormLabelSet";
import { Form } from "react-bootstrap";
import Button from "../components/atoms/Button";
import Modal from "../components/organisms/ClassModal";
import Jumbotron from "../components/atoms/Jumbotron";
import Text from "../components/atoms/Text";
import { updateUser, getUser } from "./../service/user.js";

const Wrapper = styled.div`
  width: 60rem;
  margin: 50px auto;
  height: 600px;
`;

const MyPageContainer = () => {
  const [id, setId] = React.useState(null);
  const [password1, setPassword1] = React.useState(null);
  const [password2, setPassword2] = React.useState(null);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [name, setName] = React.useState("");
  const [classIdx, setClassIdx] = React.useState(null);
  const [isValidPwd, setIsValidPwd] = React.useState(false);

  React.useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    const res = await getUser();
    setId(res.data.data.id);
    setName(res.data.data.name);
    setPhoneNumber(res.data.data.phone_number);
  };

  const updateClass = (data) => {
    setClassIdx(data.class_idx);
  };

  const handlePassword1 = (event) => {
    const value = event.target.value;
    setPassword1(value);
  };

  const handlePassword2 = (event) => {
    const value = event.target.value;
    setPassword2(value);
  };

  const handleName = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handlePhoneNumber = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
  };

  //checkPassword를 통한 검사 뒤 유효한지 한번 더 확인
  const isValidPassword = () => {
    console.log(password1, ":", password2);
    if (password1 != null && password1 === password2) {
      setIsValidPwd(true);
    } else {
      setIsValidPwd(false);
    }
  };

  const handleSubmit = async (event) => {
    console.log(password1, password2);
    event.preventDefault();
    isValidPassword();
    if (!isValidPwd) {
      alert("비밀번호를 확인 해 주세요.");
    } else {
      const res = await updateUser(password1, name, phoneNumber, classIdx);
      if (res != null && res.data.status === 200) {
        alert(res.data.message);
        window.location.href = "/";
      }
    }
  };

  return (
    <Wrapper>
      <Container>
        <Jumbotron
          header={"회원 정보 수정"}
          text={"이름과 전화번호, 비밀번호를 변경할 수 있습니다."}
        />
      </Container>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <br />
            <Text text={"아이디  " + id} />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group>
                <FormLabelSet
                  name={"비밀번호"}
                  type={"password"}
                  id={"password1"}
                  onChange={(event) => handlePassword1(event)}
                />
                <FormText name="6자 이상, 영문/숫자/특수문자 포함" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <FormLabelSet
                  name={"비밀번호 확인"}
                  type={"password"}
                  id={"password2"}
                  onChange={(event) => handlePassword2(event)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <FormLabelSet
                  name={"이름 *"}
                  type={"name"}
                  value={name}
                  onChange={(event) => handleName(event)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <FormLabelSet
                  name={"휴대전화 *"}
                  type={"phoneNumber"}
                  value={phoneNumber}
                  onChange={(event) => handlePhoneNumber(event)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Modal updateClass={updateClass} />
          </Form.Group>
          <Form.Group>
            <Button name="변경하기" type="submit" />
          </Form.Group>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default MyPageContainer;
