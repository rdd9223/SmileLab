import React from "react";
import { Container , Form, Row, Col } from "react-bootstrap";
import MyClassContainer from "./MyClassContainer";
import MyClassTable from "../components/organisms/MyClassTable";
import { Link } from "react-router-dom";
import Button from "../components/molecules/buttons/SendMessageButton";
import axios from "axios";
import styled from "styled-components"
import Jumbotron from "./../components/atoms/Jumbotron";

class ClassContainer extends React.Component {
    constructor(props){
        super(props);
        axios.get("http://localhost:4000/take",{ headers: {
            token: window.sessionStorage.getItem('loginToken')
        }}).then((res) => {
            this.setState({class : res.data.data});
        });

        this.state = {
            class : [],
            currentStudent: [],
            currentData: [],
            currentClass: null,
            header : [
                "날짜",
                "변수",
                "연산자",
                "데이터",
                "조건문",
                "반복문",
                "함수",
            ],
        }
        this.changeClass = this.changeClass.bind(this);
        this.changeStudent = this.changeStudent.bind(this);
    }

    changeClass(e){
        axios.get("http://localhost:4000/take/"+e.target.value, { headers: {
            token: window.sessionStorage.getItem('loginToken')
        }}).then((res) => {
            if(res.data.data != null){
                this.setState({
                    currentStudent: res.data.data,
                    currentClass : res.data.data[0].class_idx,
                    currentData : []
                });
            }
            
        });
    }

    changeStudent(e){
        axios.get("http://localhost:4000/take/"+this.state.currentClass+"/"+e.target.value,{ headers: {
            token: window.sessionStorage.getItem('loginToken')
        }}).then((res) => {
            this.setState({currentData: res.data.data});
        });
    }

    render(){
        const Wrapper = styled.div`
            width: 50em;
            margin: 50px auto;
            height: 600px;
            Button {
                float: right;
            }
        `;
        return(
            <Wrapper >
                <div>
                    <Jumbotron header={"클래스 관리"} text={"학생들을 학습 내용을 조회 할 수 있습니다."} ></Jumbotron>
                </div>
                <br/>
                <Row>
                    <Col>
                        <Form.Control as="select" defaultValue="null" onChange={this.changeClass}>
                            <option>강의를 선택 하세요.</option>
                            {this.state.class.map((item, idx) => {
                                return <option key={idx} value={item.class_idx}>{item.name}</option>;
                            })}
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Control as="select" defaultValue="null" onChange={this.changeStudent}>
                            <option>학생을 선택 하세요.</option>
                            {this.state.currentStudent.map((item, idx) => {
                                return <option key={idx} value={item.student_idx}>{item.name}</option>;
                            })}
                        </Form.Control>
                    </Col>
                </Row>
                <br/>

                {this.state.currentData != null &&
                    <Row>
                        <MyClassTable headers={this.state.header} rows={this.state.currentData} />
                    </Row>
                }
                <Link to="/sendMessage">
                    <Button />
                </Link>
            </Wrapper>
        );
    }
}

export default ClassContainer;