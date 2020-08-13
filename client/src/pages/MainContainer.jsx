import React from "react";
import MainIntro from "../components/molecules/jumbotron/MainIntro";
import { Row, Col } from "react-bootstrap";
import LoginForm from "../components/organisms/LoginForm";
import styled from "styled-components";
import LoginInfoBox from "../components/organisms/LoginInfoBox";
import { getUser } from "./../service/user.js"

const Wrapper = styled.div`
  width: 60em;
  margin: 50px auto;
  height: 600px;
`;


const MainContainer = () => {
  const [isLogin, setIsLogin] = React.useState(false);
  const [userType, setUserType] = React.useState(0);

  React.useEffect(() => {
    load();
  },[])

  const load = async() => {
    var token = window.sessionStorage.getItem('loginToken')
    if(token!=null){
      const res = await getUser();
      if(res != null && res.data.status === 200){
        setIsLogin(true);
        setUserType(res.data.data.type);
        window.sessionStorage.setItem('userId', res.data.data.id);
        window.sessionStorage.setItem('userType', res.data.data.type);
      }
    }
  }

  if(isLogin === false){
    return (
      <Wrapper>
        <Row style={{ height: "100%" }}>
          <Col lg={8}>
            <MainIntro />
          </Col>
          <Col lg={4}>
            <LoginForm />
          </Col>
        </Row>
      </Wrapper>
    );
  }else{
    return (
      <Wrapper>
        <Row style={{ height: "100%" }}>
          <Col lg={8}>
            <MainIntro />
          </Col>
          <Col lg={4}>
            <LoginInfoBox userType={userType}/>
          </Col>
        </Row>
      </Wrapper>
    );
  }
    
  
};

export default MainContainer;
