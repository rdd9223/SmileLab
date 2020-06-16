import React, {useState} from "react";
import MainIntro from "../components/molecules/jumbotron/MainIntro";
import { Row, Col } from "react-bootstrap";
import LoginForm from "../components/organisms/LoginForm";
import styled from "styled-components";
import axios from "axios";



class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    var token = localStorage.getItem('loginToken')
    if(token!=null){
      axios.get("http://localhost:4000/auth/user" , { headers: { token: token } })
      .then((res) => {
        if(res.data.status === 200){
          this.setState({isLogin: true});
        }
        //토큰 만료 시 예외처리는 나중에
      });
    }
    this.state = {
      isLogin: false,
    };
  }

  logout(){
    localStorage.removeItem('loginToken');
    this.setState({isLogin: false});
    console.log(localStorage.getItem('loginToken'));
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
              <h6>로그인 되었습니다</h6>
              <h6>상단에서 원하는 메뉴를 선택하세요.</h6>
              <Row >
                <Col>
                  <h5 onClick={this.logout.bind(this)}>로그아웃</h5>
                </Col>
                <Col>
                <h5>내정보</h5>
                </Col>
                <Col>
                <h5>메세지함</h5>
                </Col>
              </Row>
            </Col>
          </Row>
          
        </Wrapper>
        );
    }
    
  }
  
};

export default MainContainer;
