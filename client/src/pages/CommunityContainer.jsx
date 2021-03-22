import React from "react";
import styled from "styled-components";
import CommunityTable from "../components/templates/CommunityTable";
import Jumbotron from "components/atoms/Jumbotron";
import Button from "components/atoms/Button";
import { Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getBoardList } from "./../service/board.js";
import CommunityPostContainer from "./CommunityPostContainer";
import { getUser } from "service/user";
import { getProfClass, getProfClassAll } from "service/class";
import { current } from "immer";

const Wrapper = styled.div`
  width: 50em;
  margin: 50px auto;
`;

const CommunityContainer = () => {
  const [data, setData] = React.useState([]);
  const [clazz, setClass] = React.useState([]);
  const [currentClass, setCurrentClass] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [type, setType] = React.useState(0);
  const [userType, setUserType] = React.useState(null)
  const [userIdx, setUserIdx] = React.useState(null)

  const typeHeader = ["아이디어 얻기", "동료찾기", "질문하기", "코드공유/리뷰"];

  const loadUser = async () => {
    const res = await getUser();
    if (res != null && res.data.status === 200) {
      setUserType(res.data.data.type);
      setUserIdx(res.data.data.user_idx);
    }
  };

  React.useEffect(() => {
    loadUser()
  }, [])

  React.useEffect(() => {
    if(userType === 2){
      loadBoard(currentPage, type);
    }else{
      initClassList()
    }
    
  }, [userType])

  const initClassList = async() => {
    if(userType != null && userType != 2){
      const res = await getProfClassAll();
      if (res != null) {
        setClass(res.data.data);
        loadBoard(currentPage, type);
      }
    }
  }

  React.useEffect(() => {
    if(currentClass != null){
      loadBoard(currentPage, type);
    }
  }, [currentClass])

  React.useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    setCurrentClass(Number(params.get("class")));
    setType(Number(params.get("type")));
  }, [currentPage]);

  const loadBoard = async (idx, type) => {
    const res = await getBoardList(idx, type, currentClass);
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

  const handleType = (_type) => {
    if(userType === 2){
      window.location.href = "/community?type=" + _type;
    }else{
      window.location.href = "/community?type=" + _type+"&class="+currentClass;
    }
  };

  const changeClass = async (event) => {
    const idx = event.target.value;
    if (idx != null) {
      setCurrentClass(idx);
      window.location.href = "/community?type=0&class="+idx;
    }
  };


  const renderDescription = () => {
    if(type === 0){
      return(
        <div style={{borderRadius: 10, border:'1px solid #000', padding :10}}>
          문제해결에 대한 아이디어를 동료들에게 얻는 공간입니다.
          내 아이디어에 동료의 아이디어가 더해졌을 때, 더 정교하고 타당한 문제해결 방안을 찾을 수 있게 될 것입니다
        </div>
      )
    }else if(type === 1){
      return(
        <div style={{borderRadius: 10, border:'1px solid #000', padding :10}}>
          함께 프로젝트를 수행할 동료를 찾는 공간입니다.
          동료와의 공동 프로젝트를 통해 조금 더 복잡한 코드를 학습할 수 있고, 나의 부족한 부분을 동료가 채워줄 수도 있습니다.
          나와 마음이 맞는 동료를 찾아보세요.
        </div>
      )
    }else if(type === 2){
      return(
        <div style={{borderRadius: 10, border:'1px solid #000', padding :10}}>
          코드 작성 시 궁금증을 해결하기 위한 공간입니다.
          이해하기 어려운 에러나 문제 개선에 대한 궁금점 등을 질문하거나, 반대로 동료들에게 내 지식을 활용하여 조언을 할 수도 있습니다.
          질문을 하는것, 질문에 내 지식을 나누어 주는 것 또한 여러분의 학습능력과 사고력 향상을 위해 매우 중요한 과정입니다.
        </div>
      )
    }else{
      return(
        <div style={{borderRadius: 10, border:'1px solid #000', padding :10}}>
          내 코드를 공유하거나 동료의 코드를 리뷰하는 공간입니다. 코드에 대한 평가 뿐만 아니라 동료의 코드를 재사용하여 아이디어를 더해 더 훌륭한 코드를 만들어 볼 수도 있습니다.
          내 코드 뿐만 아니라 다른 사람의 코드를 이해하고 개선시키는 것 또한 프로그래밍에 필요한 사고력을 기르는데 매우 중요한 과정입니다.
        </div>
      )
    }
  }

  if(userType === null){
    return(
      <div>잠시만 기다려주세요...</div>
    )
  }else if(userType === 2){
    return (
      <Wrapper>
        <div>
          <Jumbotron header={"Class Community"} text={"자유롭게 생각을 나눠보는 공간입니다."} />
        </div>
        <div style={{ display: "flex", height: 'auto' }}>
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
        <div>
          {renderDescription()}
        </div>
        {data.map((item, idx) => {
          return <div><CommunityPostContainer item={item} currentUser={userIdx} /></div>
        })}
        <Wrapper>
          <Row>
            <Col lg={4}>
              <Button name={"이전"} size={"md"} onClick={getPrevBoard} style={{ margin: "10px" }} />
              <Button name={"다음"} size={"md"} onClick={getNextBoard} />
            </Col>
            <Col lg={6}></Col>
            <Col lg={2}>
              <Link to={"/write?type="+type}>
                <Button name={"글쓰기"} size={"md"} />
              </Link>
            </Col>
          </Row>
        </Wrapper>
      </Wrapper>
    );
  }else{
    return(
      <Wrapper>
        <div>
          <Jumbotron header={"Class Community"} text={"자유롭게 생각을 나눠보는 공간입니다."} />
        </div>
        <Form.Control as="select" defaultValue={currentClass} onChange={changeClass}>
          <option key={0} value={null}>
            강의를 선택 하세요.
          </option>
          {clazz != null &&
            clazz.map((item, idx) => {
              return (
                <option key={idx + 1} value={item.class_idx}>
                  {item.name}
                </option>
              );
            })}
        </Form.Control>
        <div style={{ display: "flex", height: 'auto' }}>
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
        <div>
          {renderDescription()}
        </div>
        {data.map((item, idx) => {
          return <div><CommunityPostContainer item={item} currentUser={userIdx} /></div>
        })}
        <Wrapper>
          <Row>
            <Col lg={4}>
              <Button name={"이전"} size={"md"} onClick={getPrevBoard} style={{ margin: "10px" }} />
              <Button name={"다음"} size={"md"} onClick={getNextBoard} />
            </Col>
            <Col lg={6}></Col>
            <Col lg={2}>
              <Link to={"/write?type="+type+"&class="+currentClass}>
                <Button name={"글쓰기"} size={"md"} />
              </Link>
            </Col>
          </Row>
        </Wrapper>
      </Wrapper>
    )
  }
  
};

export default CommunityContainer;
