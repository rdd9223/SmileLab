import React from "react";
import Jumbotron from "../atoms/Jumbotron";
import { Jumbotron as Jumbotron1, Container } from "react-bootstrap";
import styled from "styled-components";

class MessageBox extends React.Component {
  render() {
    const Wrapper = styled(Jumbotron1)`
      margin: 0 auto;
      height: 100%;
    `;

    if (this.props.message != null) {
      return (
        <>
          <Wrapper fluid>
            <Container>
              <h4>{this.props.message.class_name}님이 보낸 메세지</h4>
              {this.props.message.contents}
            </Container>
          </Wrapper>
        </>
      );
    } else {
      return (
        <>
          <Jumbotron header={""} text={"메세지를 선택 해 주세요."} />
        </>
      );
    }
  }
}

export default MessageBox;
