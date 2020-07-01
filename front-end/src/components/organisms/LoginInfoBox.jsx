import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiLogOut, FiUser, FiMail } from "react-icons/fi";


const logout = () =>{
    window.sessionStorage.clear();
    window.sessionStorage.setItem('userType', 0);
    window.location.reload(true);
}
  
class LoginInfoBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        if(this.props.userType == 2){
            return(
                <Container style={{textAlign: "center", paddingTop: "200px", paddingBottom: "200px"}} >
                    <h6>로그인 되었습니다</h6>
                    <h6>상단에서 원하는 메뉴를 선택하세요.</h6>
                    <Row style={{marginTop : "100px"}}>
                        <Col>
                            <Link>
                                <h1 onClick={() => logout()}><FiLogOut /></h1>
                            </Link>
                        </Col>
                        <Col>
                            <Link to={"/mypage"}>
                                <h1><FiUser /></h1>
                            </Link>
                        </Col>
                        <Col>
                            <Link to={"/message"}>
                                <h1><FiMail /></h1>
                            </Link>
                            
                        </Col>
                    </Row>
                </Container>
            )
        }else{
            return(
                <Container style={{textAlign: "center", paddingTop: "200px", paddingBottom: "200px"}} >
                    <h6>로그인 되었습니다</h6>
                    <h6>상단에서 원하는 메뉴를 선택하세요.</h6>
                    <Row style={{marginTop : "100px"}}>
                        <Col>
                            <Link>
                                <h1 onClick={() => logout()}><FiLogOut /></h1>
                            </Link>
                        </Col>
                        <Col>
                            <Link to={"/mypage"}>
                                <h1><FiUser /></h1>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default LoginInfoBox

