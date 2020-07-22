import React from "react";
import Jumbotron from "./../components/atoms/Jumbotron"
import { Form, Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import FormLabelSet from "./../components/molecules/form/FormLabelSet";
import Button from "./../components/atoms/Button";
import { postClass } from "./../service/class.js";

const Wrapper = styled.div`
  width: 60rem;
  margin: 50px auto;
`;


class CreateClassContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      className : null,
    }
    this.createClass = this.createClass.bind(this);
  }

  async createClass(){
    await postClass(this.state.className);
  }

  render(){
    return(
      <Wrapper>
        <Jumbotron header={"클래스 생성"} text={"이 페이지에서 클래스를 생성 할 수 있습니다."} />
        <br />
        <Container>
          <Form>
            <Row>
              <FormLabelSet name={"생성 할 클래스 이름"} onChange={(e) => this.setState({ className: e.target.value })} />
              <br />
              <br />
              <Button name={"생성하기"} onClick={this.createClass} />
            </Row>
          </Form>
        </Container>
      </Wrapper>
    )
  }
}

export default CreateClassContainer;