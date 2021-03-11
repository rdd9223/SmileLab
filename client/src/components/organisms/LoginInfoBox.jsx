import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiLogOut, FiUser, FiMail } from "react-icons/fi";



const  LoginInfoBox = ({ userType }) => {
  const logout = () => {
    window.sessionStorage.clear();
    window.sessionStorage.setItem("userType", 0);
    window.location.reload();
  };
  
  return (
    <Container
      style={{
        textAlign: "center",
        paddingTop: "150px",
        paddingBottom: "150px",
      }}
    >
      <h6>SMILE Python에 오신걸 환영합니다.</h6>
      <h6>SMILE Python은 초보자를 위해 설계된 컴퓨팅 사고력에 기반한 학습 지원 시스템입니다.</h6>
      <h6>위의 활용방법을 보고 학습을 시작해보세요!</h6>
      <Row style={{ marginTop: "100px" }}>
        <Col>
          <Link to="/">
            <h1 onClick={() => logout()}>
              <FiLogOut />
            </h1>
          </Link>
        </Col>
        <Col>
          <Link to={"/mypage"}>
            <h1>
              <FiUser />
            </h1>
          </Link>
        </Col>
        <Col>
          <Link to={"/message"}>
            <h1>
              <FiMail />
            </h1>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginInfoBox;
