import React from "react";
import styled from "styled-components";
import FormText from "../components/atoms/FormText";
import FormLabelSet from "../components/molecules/form/FormLabelSet";
import FormLabelButtonSet from "../components/molecules/form/FormLabelButtonSet";
import { Form } from "react-bootstrap";
import FormLabel from "../components/atoms/FormLabel";
import FormCheck from "../components/atoms/FormCheck";
import Button from "../components/atoms/Button";

const Wrapper = styled.div`
  width: 60%;
  margin: 50px auto;
`;

const SignUpContainer = () => {
  return (
    <Wrapper>
      <Form>
        <Form.Group>
          <FormText name={"* 표시는 필수 입력 항목입니다."} />
          <br />
          <FormLabelButtonSet name={"아이디 *"} type={"id"} buttonName={"중복확인"} />
          <FormText name="이메일 형식으로 된 아이디를 입력해주세요." />
        </Form.Group>
        <Form.Group>
          <FormLabelSet name={"비밀번호 *"} type={"password1"} />
          <FormText name="6자 이상, 영문/숫자/특수문자 포함" />
        </Form.Group>
        <Form.Group>
          <FormLabelSet name={"비밀번호 확인 *"} type={"password2"} />
        </Form.Group>
        <Form.Group>
          <FormLabelSet name={"이름 *"} type={"name"} />
        </Form.Group>
        <Form.Group>
          <FormLabelSet name={"휴대전화 *"} type={"phoneNumber"} />
        </Form.Group>
        <Form.Group>
          <FormLabelButtonSet name={"클래스"} type={"class"} buttonName={"검색하기"} />
        </Form.Group>
        <Form.Group>
          <FormLabel name={"가입유형 *"} />
          <FormCheck type="radio" label="교수자" name="userType" id="1" />
          <FormCheck type="radio" label="학습자" name="userType" id="2" />
        </Form.Group>
        <Form.Group>
          <Button name="회원가입" type="submit" />
        </Form.Group>
      </Form>
    </Wrapper>
  );
};

export default SignUpContainer;
