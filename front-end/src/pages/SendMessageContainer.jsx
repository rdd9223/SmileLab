import React from "react";
import { Container , Form, Row, Col } from "react-bootstrap";
import axios from "axios";


class SendMessageContainer extends React.Component {
    constructor(props){
        super(props);
        axios.get("http://localhost:4000/take",{ headers: {
            token: window.sessionStorage.getItem('loginToken')
        }}).then((res) => {
            this.setState({class : res.data.data});
        });
        this.changeClass = this.changeClass.bind(this);
        this.changeStudent = this.changeStudent.bind(this);
    }

    changeClass(e){
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

    }

    render(){
        return(
            <Container>
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
                        <Form.Control as="select" defaultValue="전체" onChange={this.changeStudent}>
                            <option>전체</option>
                            {this.state.currentStudent.map((item, idx) => {
                                return <option key={idx} value={item.student_idx}>{item.name}</option>;
                            })}
                        </Form.Control>
                    </Col>
                </Row>
            </Container>
            
        )
    }
}

export default SendMessageContainer;