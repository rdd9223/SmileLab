import React from "react";
import { Container , Form, Row, Col } from "react-bootstrap";
import MyClassContainer from "./MyClassContainer";
import MyClassTable from "../components/organisms/MyClassTable";
import { Link } from "react-router-dom";
import Button from "../components/molecules/buttons/SendMessageButton";
import axios from "axios";
import styled from "styled-components"
import Jumbotron from "./../components/atoms/Jumbotron";
import StudentClassTable from "./../components/organisms/StudentClassTable";

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
            student: [],
            currentStudent: null,
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
        const idx = e.target.value
        axios.get("http://localhost:4000/take/"+idx, { headers: {
            token: window.sessionStorage.getItem('loginToken')
        }}).then((res) => {
            if(res.data.data != null){
                this.setState({
                    student: res.data.data,
                    currentClass : idx,
                    currentData : [],
                });
            }
            
        });
    }

    changeStudent(e){
        const idx = e.target.value;
        axios.get("http://localhost:4000/take/"+this.state.currentClass+"/"+idx,{ headers: {
            token: window.sessionStorage.getItem('loginToken')
        }}).then((res) => {
            console.log(res);
            this.setState({
                currentData: res.data.data,
                currentStudent: idx,
            });
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
                        <Form.Control as="select" defaultValue={this.state.currentClass} onChange={this.changeClass}>
                            <option>강의를 선택 하세요.</option>
                            {this.state.class.map((item, idx) => {
                                return <option key={idx} value={item.class_idx}>{item.name}</option>;
                            })}
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Control as="select" defaultValue={this.state.currentStudent} onChange={this.changeStudent}>
                            <option>학생을 선택 하세요.</option>
                            {this.state.student.map((item, idx) => {
                                return <option key={idx} value={item.student_idx}>{item.name}</option>;
                            })}
                        </Form.Control>
                    </Col>
                </Row>
                <br/>

                {this.state.currentData != null &&
                    <Row>
                        <StudentClassTable headers={this.state.header} rows={this.state.currentData} />
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