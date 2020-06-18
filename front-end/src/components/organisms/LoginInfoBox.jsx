import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";


const logout = () =>{
    window.sessionStorage.clear();
    window.sessionStorage.setItem('userType', 0);
    window.location.reload(true);
}
  

class LoginInfoBox extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userType: window.sessionStorage.getItem('userType'),
        };
        console.log(this.state.userType);
    }
    render(){
        if(this.state.userType == 2){
            return(
            <Container>
                <h6>로그인 되었습니다</h6>
                <h6>상단에서 원하는 메뉴를 선택하세요.</h6>
                <Row >
                    <Col>
                        <h5 onClick={() => logout()}>로그아웃</h5>
                    </Col>
                    <Col>
                        <h5>내정보</h5>
                    </Col>
                    <Col>
                        <Link to={"/message"}>
                            <h5>메세지함</h5>
                        </Link>
                        
                    </Col>
                </Row>
            </Container>
        )
        }else{
            return(
            <Container>
                <h6>로그인 되었습니다</h6>
                <h6>상단에서 원하는 메뉴를 선택하세요.</h6>
                <Row >
                    <Col>
                        <h5 onClick={() => logout()}>로그아웃</h5>
                    </Col>
                    <Col>
                        <h5>내정보</h5>
                    </Col>
                </Row>
            </Container>
        )
        }
        
    }
}

export default LoginInfoBox

