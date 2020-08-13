import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import FormText from "../atoms/FormText";
import Button from "../atoms/Button";
import styled from "styled-components";
import FormLabelSet from "../molecules/form/FormLabelSet";
import { Link } from "react-router-dom";
import { signIn } from "./../../service/user.js";

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

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      pw: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(event) {
    event.preventDefault();
    const res = await signIn(this.state.id, this.state.pw);
    //로그인 성공 시 반환되는 토큰을 session에 저장
    if (res.data.status === 200) {
      window.sessionStorage.clear();
      window.sessionStorage.setItem("loginToken", res.data.data.token);
      window.location.reload(true);
    } else if (res.data.status === 400) {
      alert(res.data.message);
    }
  }

  render() {
    return (
      <Wrapper>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <FormText name={"아이디와 비밀번호를 입력해주세요"} />
            <FormLabelSet
              onChange={(event) => this.setState({ id: event.target.value })}
              type={"id"}
              placeholder={"ID"}
            />
            <FormLabelSet
              onChange={(event) => this.setState({ pw: event.target.value })}
              type={"password"}
              placeholder={"Password"}
            />
          </Form.Group>
          <Row>
            <Column>
              <Button type={"submit"} name={"로그인"} />
            </Column>
            <Column>
              <StyledLink to="/signup">
                <Button name={"회원가입"} />
              </StyledLink>
            </Column>
          </Row>
        </Form>
      </Wrapper>
    );
  }
}

export default LoginForm;
