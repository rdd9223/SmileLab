import React from "react";
import Text from "../components/atoms/Text"
import { Row, Col, Container } from "react-bootstrap";
import Button from "../components/atoms/Button";
import { Link } from "react-router-dom";


const CodeResultContainer = () => {
    const data = "test data";
    return (
        <Container>
            <Text text={"프로젝트를 통해 확인된 CT 영역은?"}/>
            <Row>
                <Col lg={4}>
                    <Text text={"변수"}/>
                    <Text text={"연산자"}/>
                    <Text text={"데이터"}/>
                    <Text text={"조건문"}/>
                    <Text text={"반복"}/>
                    <Text text={"함수"}/>
                </Col>
                <Col lg={8}>
                    <Text text={"가장 많이 사용한 영역은 "+data+" 입니다."}/>
                    <Row>
                        <Col lg={2}/>
                        <Col lg={4}>
                            <Link to="/start">
                                <Button name="코드로 돌아가기"/>
                            </Link>
                            
                        </Col>
                        <Col lg={3}>
                            <Link to="/">
                                <Button name="새 프로젝트"/>
                            </Link>
                            
                        </Col>
                        <Col lg={3}>
                            <Button name="결과 저장"/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default CodeResultContainer