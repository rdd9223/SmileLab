import React from "react";
import Text from "../components/atoms/Text"
import { Row, Col, Container, Jumbotron } from "react-bootstrap";
import Button from "../components/atoms/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import FormCheck from "../components/atoms/FormCheck";

const Wrapper = styled.div`
  width: 60rem;
  margin: 50px auto;
  height: 600px;
`;

const resetCode = () => {
    localStorage.setItem('currentCode','');
}

class CodeResultContainer extends React.Component {
    constructor(props){
        super(props);
        //console.log(window.sessionStorage.getItem('userId'));
        this.loadResult = this.loadResult.bind(this);
        this.loadResult();

        this.state = {
            data: null,
        }
    }

    async loadResult(){
        await axios.post("http://localhost:4000/compile/result",{ userId: window.sessionStorage.getItem('userId') })
        .then((res) => {
            //console.log(res.data.data);
            this.setState({data: eval("("+res.data.data+")")});
            console.log(this.state.data)
        });
    }

    async saveResult(){
        await axios.post("http://localhost:4000/result/save",{ })
        .then((res) => {
            console.log(res);
        });
    }

    render(){
        return (
            <Container>
                <Wrapper>
                    <h3>프로젝트를 통해 확인된 CT 영역은?</h3>
                    <Wrapper>
                        <Row>
                            <Col lg={4}>
                                <Jumbotron>
                                    <Row>
                                        <Col><Text text={"변수"}/></Col>
                                        { this.state.data !=null && this.state.data.Name.length !== 0 &&
                                            <Col><FormCheck checked={true}  /></Col>
                                        }
                                        { this.state.data !=null && this.state.data.Name.length === 0 &&
                                            <Col><FormCheck checked={false}  /></Col>
                                        }
                                    </Row>
                                    <Row>
                                        <Col><Text text={"연산자"}/></Col>
                                        { this.state.data !=null && this.state.data.Expr !== 0 &&
                                            <Col><FormCheck checked={true}  /></Col>
                                        }
                                        { this.state.data !=null && this.state.data.Expr === 0 &&
                                            <Col><FormCheck checked={false}  /></Col>
                                        }
                                    </Row>
                                    <Row>
                                        <Col><Text text={"데이터"}/></Col>
                                        <Col><FormCheck checked={true}  /></Col>
                                    </Row>
                                    <Row>
                                        <Col><Text text={"조건문"}/></Col>
                                        { (this.state.data !=null && this.state.data.If !== 0) &&
                                            <Col><FormCheck checked={true}  /></Col>
                                        }
                                        { (this.state.data !=null && this.state.data.If === 0) &&
                                            <Col><FormCheck checked={false}  /></Col>
                                        }
                                    </Row>
                                    <Row>
                                        <Col><Text text={"반복"}/></Col>
                                        { this.state.data !=null && (this.state.data.For !==0 || this.state.data.While !== 0) &&
                                            <Col><FormCheck checked={true}  /></Col>
                                        }
                                        { this.state.data !=null && (this.state.data.For ===0 && this.state.data.While === 0) &&
                                            <Col><FormCheck checked={false}  /></Col>
                                        }
                                    </Row>
                                    <Row>
                                        <Col><Text text={"함수"}/></Col>
                                        { this.state.data !=null && this.state.data.Function !== 0 &&
                                            <Col><FormCheck checked={true}  /></Col>
                                        }
                                        { this.state.data !=null && this.state.data.Function === 0 &&
                                            <Col><FormCheck checked={false}  /></Col>
                                        }
                                    </Row>
                                </Jumbotron>
                            </Col>
                            <Col lg={8}>
                                <Container>
                                    <Jumbotron>
                                    { this.state.data != null &&
                                        <Text text={"가장 많이 사용한 영역은 "+this.state.data.Assign+" 입니다."}/>
                                    }
                                        
                                    </Jumbotron>
                                </Container>
                                
                                <Row>
                                    <Col lg={2}/>
                                    <Col lg={4}>
                                        <Link to="/start">
                                            <Button name="코드로 돌아가기" />
                                        </Link>
                                        
                                    </Col>
                                    <Col lg={3}>
                                        <Link to="/start">
                                            <Button name="새 프로젝트" onClick={resetCode}/>
                                        </Link>
                                        
                                    </Col>
                                    <Col lg={3}>
                                        <Button name="결과 저장" onClick={this.saveResult}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Wrapper>
                    
                </Wrapper>
            </Container>
            
        )
    }
    
}

export default CodeResultContainer