import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import FormLabel from "../../atoms/FormLabel";
import FormText from "../../atoms/FormText";
import FormControl from "../../atoms/FormControl";
import Button from "../../atoms/Button";

const LoginForm = () => {
  return (
    <div>
      <Form>
        <Form.Group>
          <FormText name={"아이디와 비밀번호를 입력해주세요"} />
          <FormLabel name={"ID"} />
          <FormControl type={"id"} placeholder={"Press ID"} />
          <FormLabel name={"PW"} />
          <FormControl type={"password"} placeholder={"Password"} />
        </Form.Group>
        <Row>
          <Col>
            <Button type={"submit"} onClick={""} variant={"primary"} name={"로그인"} />
          </Col>
          <Col>
            <Button onClick={""} variant={"primary"} name={"회원가입"} />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default LoginForm;
