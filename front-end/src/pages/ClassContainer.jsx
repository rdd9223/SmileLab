import React from "react";
import { Container , Form, Row, Col } from "react-bootstrap";
import MyClassContainer from "./MyClassContainer";
import MyClassTable from "../components/organisms/MyClassTable";
import { Link } from "react-router-dom";
import Button from "../components/molecules/buttons/SendMessageButton";
import axios from "axios";

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
        }

        this.changeClass = this.changeClass.bind(this);
    }

    changeClass(e){
        axios.get("http://localhost:4000/take/"+e.target.value,{ headers: {
            token: window.sessionStorage.getItem('loginToken')
        }}).then((res) => {
            console.log(res);
            this.setState({currentStudent: res.data.data});
        });
    }

    loadStudentResult(){

    }

    render(){
        return(
            <Container style={{ position: "relative", height: "200px", margin: "10px" }} >
                <h1>
                    Class Container
                </h1>
                <Row>
                    <Col>
                        <Form.Control as="select" defaultValue="Choose..." onChange={this.changeClass}>
                            <option>Choose...</option>
                            {this.state.class.map((item, idx) => {
                                return <option key={idx} value={item.class_idx}>{item.name}</option>;
                            })}
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Control as="select" defaultValue="Choose..." onChange={this.changeClass}>
                            <option>Choose...</option>
                            {this.state.currentStudent.map((item, idx) => {
                                return <option key={idx} value={item.class_idx}>{item.name}</option>;
                            })}
                        </Form.Control>
                    </Col>
                </Row>

                <Link to="/sendMessage">
                    <Button />
                </Link>
                
            </Container>
        );
    }
    
}

export default ClassContainer;