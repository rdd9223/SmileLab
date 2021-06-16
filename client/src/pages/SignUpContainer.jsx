import React from "react";
import styled from "styled-components";
import FormText from "../components/atoms/FormText";
import FormLabelSet from "../components/molecules/form/FormLabelSet";
import FormLabelButtonSet from "../components/molecules/form/FormLabelButtonSet";
import { Form } from "react-bootstrap";
import FormLabel from "../components/atoms/FormLabel";
import FormCheck from "../components/atoms/FormCheck";
import Button from "../components/atoms/Button";
import Modal from "../components/organisms/ClassModal";
import SignUpSuccess from "../components/organisms/SignUpSuccess";
import { checkDouble, postUser } from "./../service/user.js";

const Wrapper = styled.div`
  width: 40em;
  margin: 50px auto;
`;

const SignUpContainer = () => {
  const [id, setId] = React.useState(null);
  const [password1, setPassword1] = React.useState(null);
  const [password2, setPassword2] = React.useState(null);
  const [phoneNumber, setPhoneNumber] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [userType, setUserType] = React.useState(null);
  const [classIdx, setClassIdx] = React.useState(null);
  const [isDoubleId, setIsDoubleId] = React.useState(true);
  const [isSuccess, setIsSuccess] = React.useState(false);

  //alert 가 안뜨는 현상 발생
  const handleIsDoubleId = async () => {
    const res = await checkDouble(id);
    if (res != null && res.data.status === 200) {
      setIsDoubleId(false);
    } else {
      setIsDoubleId(true);
    }
    alert(res.data.message);
  };

  const updateClass = (data) => {
    setClassIdx(data.class_idx);
  };

  //비밀번호와 비밀번호 확인이 일치하는지 확인
  const handlePassword1 = (event) => {
    const value = event.target.value;
    setPassword1(value);
  };

  const handlePassword2 = (event) => {
    const value = event.target.value;
    setPassword2(value);
  };

  //checkPassword를 통한 검사 뒤 유효한지 한번 더 확인
  const isValidPassword = () => {
    return password1 != null && password1 === password2 ? true : false;
  };

  const handleName = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handlePhoneNumber = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
  };

  //id가 변경 되었을 시 중복검사를 다시 시행하도록 함
  const handleId = (event) => {
    setId(event.target.value);
    setIsDoubleId(true);
  };

  //회원가입 버튼 처리
  const handleSubmit = async (event) => {
    event.preventDefault();
    isValidPassword();
    //console.log(classIdx);
    if (isDoubleId) {
      alert("아이디 중복 검사를 해 주세요!");
    } else if (!isValidPassword) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      if (userType === 2 && classIdx === null) {
        alert("학습자는 반드시 클래스를 선택하세요!");
      } else {
        const res = await postUser(id, password1, phoneNumber, name, userType, classIdx);
        if (res != null && res.data.status === 201) {
          setIsSuccess(true);
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      }
    }
  };

  if (isSuccess) {
    return (
      <Wrapper>
        <SignUpSuccess />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <FormText name={"* 표시는 필수 입력 항목입니다."} />
            <br />
            <FormLabelButtonSet
              name={"아이디 *"}
              type={"id"}
              buttonName={"중복확인"}
              onChange={(event) => handleId(event)}
              onClick={handleIsDoubleId}
            />
            <FormText name="이메일 형식으로 된 아이디를 입력해주세요." />
          </Form.Group>
          <Form.Group>
            <FormLabelSet
              name={"비밀번호 *"}
              onChange={(event) => handlePassword1(event)}
              type={"password"}
              id={"password1"}
            />
            <FormText name="6자 이상, 영문/숫자/특수문자 포함" />
          </Form.Group>
          <Form.Group>
            <FormLabelSet
              name={"비밀번호 확인 *"}
              onChange={(event) => handlePassword2(event)}
              type={"password"}
              id={"password2"}
            />
          </Form.Group>
          <Form.Group>
            <FormLabelSet name={"이름 *"} onChange={(event) => handleName(event)} type={"name"} />
          </Form.Group>
          <Form.Group>
            <FormLabelSet
              name={"휴대전화 *"}
              onChange={(event) => handlePhoneNumber(event)}
              type={"phoneNumber"}
            />
          </Form.Group>
          <Form.Group>
            <Modal updateClass={updateClass} />
          </Form.Group>
          <Form.Group>
            <FormLabel name={"가입유형 *"} />
            <FormCheck
              type="radio"
              label="교수자"
              name="userType"
              id="1"
              onChange={(event) => setUserType(event.target.id)}
            />
            <FormCheck
              type="radio"
              label="학습자"
              name="userType"
              id="2"
              onChange={(event) => setUserType(event.target.id)}
            />
          </Form.Group>
          <Form.Group>
            <Button name="회원가입" type="submit" />
          </Form.Group>
        </Form>
      </Wrapper>
    );
  }
};

export default SignUpContainer;
