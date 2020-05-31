import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import FormText from "../atoms/FormText";
import Button from "../atoms/Button";
import styled from "styled-components";
import FormLabelSet from "../molecules/form/FormLabelSet";
import { Link } from "react-router-dom";

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

const StyledLink = styled(Link)`
  width: 100%;
`;

const LoginForm = () => {
  return (
    <Wrapper>
      <Form>
        <Form.Group>
          <FormText name={"아이디와 비밀번호를 입력해주세요"} />
          <FormLabelSet name={"ID"} type={"id"} placeholder={"ID"} />
          <FormLabelSet name={"PW"} type={"password"} placeholder={"Password"} />
        </Form.Group>
        <Row>
          <Column>
            <Button type={"submit"} onClick={""} name={"로그인"} />
          </Column>
          <Column>
            <StyledLink to="/signup">
              <Button onClick={""} name={"회원가입"} />
            </StyledLink>
          </Column>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default LoginForm;
