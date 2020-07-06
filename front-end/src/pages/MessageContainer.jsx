import React from "react";
import Jumbotron from "../components/atoms/Jumbotron";
import MessageTable from "../components/templates/MessageTable";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import MessageBox from "../components/organisms/MessageBox";
import Button from "../components/atoms/Button";
import { getMessage } from "./../service/message.js";

class MessageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: ["#", "보낸사람", "날짜 및 시간", ""],
      data: [],
      setModalShow: false,
      currentMessage: null,
      currentPage: 1,
    };

    this.loadMessage(this.state.currentPage);
    this.onClickMessage = this.onClickMessage.bind(this);
    this.getNextMessage = this.getNextMessage.bind(this);
    this.getPrevMessage = this.getPrevMessage.bind(this);
  }

  async loadMessage(idx) {
    this.setState({ data: [] });
    const res = await getMessage(idx);
    if (this.state.currentPage !== 1 && res.data.data.length === 0) {
      alert("마지막페이지입니다!");
    } else {
      this.setState({ data: this.state.data.concat(res.data.data) });
    }
  }

  // 각 메세지 별 "보기" 버튼 클릭 시 이벤트
  onClickMessage(idx) {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].message_idx == idx) {
        this.setState({ currentMessage: this.state.data[i] });
      }
    }
  }

  async getPrevMessage() {
    await this.setState({ currentPage: this.state.currentPage - 1 });
    this.loadMessage(this.state.currentPage);
  }

  async getNextMessage() {
    await this.setState({ currentPage: this.state.currentPage + 1 });
    this.loadMessage(this.state.currentPage);
  }

  render() {
    const Wrapper = styled.div`
      width: 50em;
      margin: 50px auto;
      div {
        height: 200px;
      }
    `;

    const Container1 = styled.div`
      margin: 30px auto;
    `;

    return (
      <Wrapper>
        <Jumbotron header={"Messages"} text={"메세지를 확인하세요."} />
        <Container>
          <Row>
            <Col lg={7}>
              <Container1>
                <MessageTable
                  headers={this.state.headers}
                  rows={this.state.data}
                  onClick={this.onClickMessage}
                />
                <Button
                  name={"이전"}
                  size="sm"
                  onClick={this.getPrevMessage}
                  style={{ margin: "10px" }}
                />
                <Button name={"다음"} size="sm" onClick={this.getNextMessage} />
              </Container1>
            </Col>
            <Col lg={5}>
              <Container1>
                <MessageBox message={this.state.currentMessage} />
              </Container1>
            </Col>
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default MessageContainer;
