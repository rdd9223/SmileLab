import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import FormLabel from "../../atoms/FormLabel";
import FormText from "../../atoms/FormText";
import FormControl from "../../atoms/FormControl";
import Button from "../../atoms/Button";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 10rem;
`;

const Column = styled(Col)`
  display: flex;
  justify-content: center;
  Button {
    width: 100%;
  }
`;

const LoginForm = () => {
  return (
    <Wrapper>
      <Form>
        <Form.Group>
          <FormText name={"아이디와 비밀번호를 입력해주세요"} />
          <FormLabel name={"ID"} />
          <FormControl type={"id"} placeholder={"ID"} />
          <FormLabel name={"PW"} />
          <FormControl type={"password"} placeholder={"Password"} />
        </Form.Group>
        <Row>
          <Column>
            <Button type={"submit"} onClick={""} variant={"primary"} name={"로그인"} />
          </Column>
          <Column>
            <Button onClick={""} variant={"primary"} name={"회원가입"} />
          </Column>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default LoginForm;
