import React from "react";
import Jumbotron from "../components/atoms/Jumbotron";
import MessageTable from "../components/templates/MessageTable";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import MessageBox from "../components/organisms/MessageBox";
import Button from "../components/atoms/Button";
import { getMessage } from "./../service/message.js";

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

const MessageContainer = () => {
  const headers = ["#", "보낸사람", "날짜 및 시간", ""];
  const [data, setData] = React.useState([]);
  const [currentMessage, setCurrentMessage] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const loadMessage = async (idx) => {
    const res = await getMessage(idx);
    if (currentPage !== 1 && res.data.data.length === 0) {
      alert("마지막페이지입니다!");
    } else {
      //setData(data.concat(res.data.data));
      setData(res.data.data);
    }
  };

  React.useEffect(() => loadMessage(currentPage), []);

  // 각 메세지 별 "보기" 버튼 클릭 시 이벤트
  const onClickMessage = (idx) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].message_idx === idx) {
        setCurrentMessage(data[i]);
      }
    }
  };

  const getPrevMessage = async () => {
    loadMessage(currentPage - 1);
    setCurrentPage(currentPage - 1);
  };

  const getNextMessage = async () => {
    loadMessage(currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  const sendMessage = () => {
    window.location.href = "/sendMessage";
  };

  return (
    <Wrapper>
      <Jumbotron header={"Messages"} text={"메세지를 확인하세요."} />
      <Container>
        <Row>
          <Col lg={7}>
            <Container1>
              <MessageTable headers={headers} rows={data} onClick={onClickMessage} />
              <Button name={"이전"} size="sm" onClick={getPrevMessage} style={{ margin: "10px" }} />
              <Button name={"다음"} size="sm" onClick={getNextMessage} />
            </Container1>
          </Col>
          <Col lg={5}>
            <Container1>
              <MessageBox message={currentMessage} />
            </Container1>
            <Container1>
              <Button name={"메세지 보내기"} size="sm" onClick={sendMessage} />
            </Container1>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default MessageContainer;
