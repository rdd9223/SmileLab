import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import FormText from "../atoms/FormText";
import Button from "../atoms/Button";
import styled from "styled-components";
import FormLabelSet from "../molecules/form/FormLabelSet";
import FormLabel from "../atoms/FormLabel";
import FormControl from "../atoms/FormControl";
import { Link } from "react-router-dom";
import axios from "axios";

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
  handleSubmit(event) {
    axios.post("http://localhost:4000/auth/signin", {
      id: this.state.id,
      pw: this.state.pw
    })
    .then((res) => {
      console.log(res);
      if(res.data.status === 200){
        localStorage.setItem('loginToken', res.data.data.token);
        this.setState({isLogin : true});
        window.location.reload();
      }
      return res;
    })
    .catch((e) => {
      console.log(e);
      return;
    });

    //임시로 submit 되는 현상을 막음
    event.preventDefault();
  }

  render() {
    
        return (
          <Wrapper>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <FormText name={"아이디와 비밀번호를 입력해주세요"} />
                <FormLabelSet onChange={(event) => this.setState({id: event.target.value })} type={"id"} placeholder={"ID"} />
                <FormLabelSet onChange={(event) => this.setState({pw: event.target.value })} type={"password"} placeholder={"Password"} />
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
  
  }
};

export default LoginForm;
