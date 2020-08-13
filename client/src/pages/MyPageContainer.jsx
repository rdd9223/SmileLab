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

class MyPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      password1: null,
      password2: null,
      phone_number: "",
      name: "",
      class_idx: null,
      isValidPassword: false,
      modalShow: false,
      isSuccess: false,
    };
    this.updateClass = this.updateClass.bind(this);
    this.loadClass = this.loadClass.bind(this);
    this.loadClass();
  }

  async loadClass() {
    const res = await getUser();
    this.setState({
      id: res.data.data.id,
      name: res.data.data.name,
      phone_number: res.data.data.phone_number,
    });
  }

  updateClass(data) {
    this.setState({
      class_idx: data.class_idx,
    });
  }

  checkPassword(event) {
    const { value, id } = event.target;

    this.setState({ [id]: value }, () => {
      if (id === "password1" || id === "password2") this.isValidPassword();
    });
  }

  isValidPassword() {
    if (this.state.password1 !== null && this.state.password1 === this.state.password2) {
      this.setState({ isValidPassword: true });
    } else {
      this.setState({ isValidPassword: false });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (!this.state.isValidPassword) {
      alert("비밀번호를 확인 해 주세요.");
    } else {
      const res = await updateUser(
        this.state.password1,
        this.state.name,
        this.state.phone_number,
        this.state.class_idx
      );
      if (res.data.status === 200) {
        alert(res.data.message);
        window.location.href = "/";
      }
    }
  }

  render() {
    return (
      <Wrapper>
        <Container>
          <Jumbotron
            header={"회원 정보 수정"}
            text={"이름과 전화번호, 비밀번호를 변경할 수 있습니다."}
          />
        </Container>
        <Container>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Form.Group>
              <br />
              <Text text={"아이디  " + this.state.id} />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  <FormLabelSet
                    name={"비밀번호"}
                    type={"password"}
                    id={"password1"}
                    onChange={(event) => this.checkPassword(event)}
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
                    onChange={(event) => this.checkPassword(event)}
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
                    value={this.state.name}
                    onChange={(event) => this.setState({ name: event.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <FormLabelSet
                    name={"휴대전화 *"}
                    type={"phoneNumber"}
                    value={this.state.phone_number}
                    onChange={(event) => this.setState({ phone_number: event.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Modal updateClass={this.updateClass} />
            </Form.Group>
            <Form.Group>
              <Button name="변경하기" type="submit" />
            </Form.Group>
          </Form>
        </Container>
      </Wrapper>
    );
  }
}

export default MyPageContainer;
