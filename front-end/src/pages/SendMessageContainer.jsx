import React from "react";
import { Container , Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import Jumbotron from "../components/atoms/Jumbotron";
import styled from "styled-components";
import Button from "../components/atoms/Button";
import FormControl from "../components/atoms/FormControl";
import FormLabelSet from "../components/molecules/form/FormLabelSet"

class SendMessageContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            class : [],
            currentStudent: [],
            currentClass: null,
            currentReceiver: 0,
            message1: null,
        }

        axios.get("http://localhost:4000/take",{ headers: {
            token: window.sessionStorage.getItem('loginToken')
        }}).then((res) => {
            this.setState({class : res.data.data});
        });

        this.changeClass = this.changeClass.bind(this);
        this.changeStudent = this.changeStudent.bind(this);
        this.changeMessage = this.changeMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    async changeClass(e){
        axios.get("http://localhost:4000/take/"+e.target.value, { headers: {
            token: window.sessionStorage.getItem('loginToken')
        }}).then((res) => {
            console.log(res);
            if(res.data.data != null){
                this.setState({
                    currentStudent: res.data.data,
                    currentClass : res.data.data[0].class_idx,
                    currentData : []
                });
            }else{
                this.setState({
                    currentStudent: [],
                    currentClass : null,
                    currentData : []
                });
            }
        });
    }

    changeStudent(e){
        this.setState({currentReceiver: e.target.value});
    }

    async sendMessage(){
        console.log(this.state.message1);
        console.log(this.state.currentClass);
        console.log(this.state.currentReceiver);
        axios.post("http://localhost:4000/message",{
            class_idx: this.state.currentClass,
            receiver: this.state.currentReceiver,
            contents: this.state.message1,
        },{
            headers:{
                token : window.sessionStorage.getItem('loginToken'),
            }
        }).then((res) => {
            console.log(res);
            if(res.data.status === 201){
                alert(res.data.message);
            }
        });
    }

    changeMessage(e){
        //console.log(e.target.value)
        this.state.message1 = e.target.value
        //console.log(this.state.message1);
        //this.setState({message1: e.target.value});
    }

    render(){
        const Wrapper = styled.div`
                width: 50em;
                margin: 50px auto;
                div {
                    height: 200px;
                }
            `;
        return(
            <Wrapper>
                <div>
                    <Jumbotron header={"메세지 보내기"} text={"학생들에게 메세지를 보내세요."} />
                </div>
                <br/>
                <Row style={{height: '4em'}}>
                    <Col style={{height: '4em'}}>
                        <Form.Control as="select" defaultValue="강의를 선택 하세요." onChange={this.changeClass}>
                            <option>강의를 선택 하세요.</option>
                            {this.state.class.map((item, idx) => {
                                return <option key={idx} value={item.class_idx}>{item.name}</option>;
                            })}
                        </Form.Control>
                    </Col>
                    <Col style={{height: '4em'}}>
                        <Form.Control as="select" defaultValue="0" onChange={this.changeStudent}>
                            <option>전체</option>
                            {this.state.currentStudent.map((item, idx) => {
                                return <option key={idx} value={item.student_idx}>{item.name}</option>;
                            })}
                        </Form.Control>
                    </Col>
                </Row>
             
                <Form.Control 
                    onChange={(event) => this.changeMessage(event)} 
                    placeholder={"메세지를 입력 해 주세요."} 
                    value={ this.state.message1 } 
                    type="name"
                    as="textarea"
                    rows="10"/>
                <br/>
                <Button name="보내기" onClick={this.sendMessage} />
             
            </Wrapper>
            
        )
    }
} 

export default SendMessageContainer;