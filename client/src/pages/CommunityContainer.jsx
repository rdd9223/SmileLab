import React from "react";
import styled from "styled-components";
import CommunityTable from "../components/templates/CommunityTable";
import Jumbotron from "components/atoms/Jumbotron";
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
  const [currentPage, setCurrentPage] = React.useState(1);
  const [type, setType] = React.useState(0);

  const typeHeader = ["동료찾기", "조언받기", "공유하기", "동료평가"];

  React.useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    setType(Number(params.get("type")));
    loadBoard(currentPage, Number(params.get("type")));
  }, [currentPage]);

  const loadBoard = async (idx, type) => {
    const res = await getBoardList(idx, type);
    if (res != null && res.data.status === 200) {
      setData(res.data.data);
    }
  };

  const getPrevBoard = async () => {
    await loadBoard(currentPage - 1);
    setCurrentPage(currentPage - 1);
  };

  const getNextBoard = async () => {
    await loadBoard(currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  const onClickList = (idx) => {
    window.location.href = "/community/" + idx;
  };

  const handleType = (_type) => {
    window.location.href = "/community?type=" + _type;
  };

  return (
    <Wrapper>
      <div>
        <Jumbotron header={"Class Community"} text={"자유롭게 생각을 나눠보는 공간입니다."} />
      </div>
      <div style={{ display: "flex", height: 50 }}>
        {typeHeader.map((item, idx) => {
          if (idx === type) {
            return <Button name={item} size={"sm"} style={{ margin: 6 }} />;
          } else {
            return (
              <Button
                name={item}
                size={"sm"}
                style={{ margin: 6, backgroundColor: "#fff", color: "#000" }}
                onClick={() => handleType(idx)}
              />
            );
          }
        })}
      </div>
      <CommunityTable headers={headers} rows={data} onClick={onClickList} />
      <Wrapper>
        <Row>
          <Col lg={4}>
            <Button name={"이전"} size={"md"} onClick={getPrevBoard} style={{ margin: "10px" }} />
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
};

export default CommunityContainer;
