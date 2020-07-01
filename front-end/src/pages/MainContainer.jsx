import React, {useState} from "react";
import MainIntro from "../components/molecules/jumbotron/MainIntro";
import { Row, Col } from "react-bootstrap";
import LoginForm from "../components/organisms/LoginForm";
import styled from "styled-components";
import axios from "axios";
import LoginInfoBox from "../components/organisms/LoginInfoBox";



class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    var token = window.sessionStorage.getItem('loginToken')
    if(token!=null){
      axios.get("http://localhost:4000/auth/user" , { headers: { token: token } })
      .then((res) => {
        if(res.data.status === 200){
          this.setState({
            isLogin : true,
            userType: res.data.data.type,
          });
          window.sessionStorage.setItem('userId',res.data.data.id);
          window.sessionStorage.setItem('userType', res.data.data.type);
        }
        //토큰 만료 시 예외처리는 나중에
      });
    }
    this.state = {
      isLogin: false,
      userType: 0,
    };
  }

  render(){
    const Wrapper = styled.div`
    width: 60em;
    margin: 50px auto;
    height: 600px;
  `;
  
    if(this.state.isLogin == false){
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
              <LoginInfoBox userType={this.state.userType}/>
            </Col>
          </Row>
          
        </Wrapper>
        );
    }
    
  }
  
};

export default MainContainer;
