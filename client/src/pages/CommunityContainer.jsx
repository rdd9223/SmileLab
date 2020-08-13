import React from "react";
import styled from "styled-components";
import CommunityTable from "../components/templates/CommunityTable";
import Jumbotron from "components/atoms/Jumbotron";
import Modal1 from "components/atoms/Modal";
import Button from "components/atoms/Button";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getBoardList } from "./../service/board.js";

const Wrapper = styled.div`
  width: 50em;
  margin: 50px auto;
  div {
    height: 200px;
  }
`;


const CommunityContainer = () => {
  const headers = ["#", "제목", "작성자", "작성일"];
  const [data, setData] = React.useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [currentModal, setCurrentModal] = React.useState({
    title: "",
    writer: "",
    contents: "",
    date: "",
  })
  const [currentPage, setCurrentPage] = React.useState(1);

  const loadBoard = async(idx) => {
    const res = await getBoardList(idx);
    if (res != null && res.data.status === 200 && res.data.success) {
      if (res.data.data.length > 0) {
        setData(res.data.data);
        setCurrentModal({
          title: data[0].title,
          contents: data[0].contents,
          writer: data[0].writer,
          date: data[0].date,
        });
      }
    }
  }

  const getPrevBoard = async() => {
    setCurrentPage(currentPage - 1);
    await loadBoard(currentPage);
  }

  const getNextBoard = async() => {
     setCurrentPage(currentPage + 1);
     await loadBoard(currentPage);
  }

  const onClickList = (idx) => {
      setCurrentModal({
        title: this.state.data[idx].title,
        contents: this.state.data[idx].contents,
        writer: this.state.data[idx].writer,
        date: this.state.data[idx].date,
      },
    );
    setModalShow();
  }

  return (
    <Wrapper>
      <div>
        <Jumbotron
          header={"Class Community"}
          text={"자유롭게 생각을 나눠보는 공간입니다."}
        />
      </div>
      <CommunityTable
        headers={headers}
        rows={data}
        setModalShow={() => setModalShow(true)}
        onClick={onClickList}
      />
      <Modal1
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={currentModal.title}
        contents={currentModal.contents}
        writer={currentModal.writer}
        date={currentModal.date}
      />
      <Wrapper>
        <Row>
          <Col lg={4}>
            <Button
              name={"이전"}
              size={"md"}
              onClick={getPrevBoard}
              style={{ margin: "10px" }}
            />
            <Button name={"다음"} size={"md"} onClick={getNextBoard} />
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

export default CommunityContainer;
