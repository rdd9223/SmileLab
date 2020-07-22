import React from "react";
import styled from "styled-components";
import CommunityTable from "../components/templates/CommunityTable";
import Jumbotron from "components/atoms/Jumbotron";
import Modal1 from "components/atoms/Modal";
import Button from "components/atoms/Button";
import { Form, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getBoardList } from "./../service/board.js";


class CommunityContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headers: ["#", "제목", "작성자", "작성일"],
      data: [],
      modalShow: false,
      currentModal: {
        title: "",
        writer: "",
        contents: "",
        date: "",
      },
      currentPage: 1,
    };

    this.setModalHide   = this.setModalHide.bind(this);
    this.setModalShow   = this.setModalShow.bind(this);
    this.onClickList    = this.onClickList.bind(this);
    this.getNextBoard   = this.getNextBoard.bind(this);
    this.getPrevBoard   = this.getPrevBoard.bind(this);

    this.loadBoard(this.state.currentPage);
  }
  async loadBoard(idx) {
    const res = await getBoardList(idx);
    if (res.data.status === 200 && res.data.success) {
      if (res.data.data.length > 0) {
        this.setState({ data: res.data.data });
        this.setState({
          currentModal: {
            title: this.state.data[0].title,
            contents: this.state.data[0].contents,
            writer: this.state.data[0].writer,
            date: this.state.data[0].date,
          },
        });
      }
    }
  }

  async getPrevBoard() {
    await this.setState({ currentPage: this.state.currentPage - 1 });
    this.loadBoard(this.state.currentPage);
  }

  async getNextBoard() {
    await this.setState({ currentPage: this.state.currentPage + 1 });
    this.loadBoard(this.state.currentPage);
  }

  setModalShow() {
    this.setState({ modalShow: true });
  }

  setModalHide() {
    this.setState({ modalShow: false });
  }

  onClickList(idx) {
    this.setState({
      currentModal: {
        title: this.state.data[idx].title,
        contents: this.state.data[idx].contents,
        writer: this.state.data[idx].writer,
        date: this.state.data[idx].date,
      },
    });
    this.setModalShow();
  }

  render() {
    const Wrapper = styled.div`
      width: 50em;
      margin: 50px auto;
      div {
        height: 200px;
      }
    `;
    return (
      <Wrapper>
        <div>
          <Jumbotron
            header={"Class Community"}
            text={"자유롭게 생각을 나눠보는 공간입니다."}
          />
        </div>
        <CommunityTable
          headers={this.state.headers}
          rows={this.state.data}
          setModalShow={this.setModalShow}
          onClick={this.onClickList}
        />
        <Modal1
          show={this.state.modalShow}
          onHide={this.setModalHide}
          title={this.state.currentModal.title}
          contents={this.state.currentModal.contents}
          writer={this.state.currentModal.writer}
          date={this.state.currentModal.date}
        />
        <Wrapper>
          <Row>
            <Col lg={4}>
              <Button
                name={"이전"}
                size={"md"}
                onClick={this.getPrevBoard}
                style={{ margin: "10px" }}
              />
              <Button name={"다음"} size={"md"} onClick={this.getNextBoard} />
            </Col>
            <Col lg={6}></Col>
            <Col lg={2}>
              <Link to="/write">
                <Button name={"글쓰기"} size={"md"} />
              </Link>
            </Col>
          </Row>
        </Wrapper>
      </Wrapper>
    );
  }
}

export default CommunityContainer;
