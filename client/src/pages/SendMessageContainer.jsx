import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import Jumbotron from "../components/atoms/Jumbotron";
import styled from "styled-components";
import Button from "../components/atoms/Button";
import { postMessage } from "./../service/message.js";
import { getProfClassAll, getProfClass } from "./../service/class.js"

class SendMessageContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      class : [],
      student: [],
      currentClass: null,
      currentReceiver: 0,
      message: "",
    }
        
    this.loadClass      = this.loadClass.bind(this);
    this.changeClass    = this.changeClass.bind(this);
    this.changeStudent  = this.changeStudent.bind(this);
    this.changeMessage  = this.changeMessage.bind(this);
    this.sendMessage    = this.sendMessage.bind(this);

    this.loadClass();
  }

  async loadClass(){
    const res = await getProfClassAll();
    this.setState({class : res.data.data});
  }

  async changeClass(e){
    const idx = e.target.value
    if(idx != null){
      const res = await getProfClass(idx);
      if(res.data.data != null){
        this.setState({
          student         : res.data.data,
          currentClass    : idx,
          currentData     : [],
        });
      }
    }
  }

  async changeStudent(e){
    const idx = e.target.value
    await this.setState({currentReceiver: idx});
  }

  async sendMessage(){
    const res = await postMessage(
      this.state.currentClass,
      this.state.currentReceiver,
      this.state.message,
    );
    if(res.data.status === 201){
      alert(res.data.message);
    }
  }

  changeMessage(e){
    const idx = e.target.value
    //console.log(e.target.value)
    this.state.message = e.target.value
    //console.log(this.state.message);
    //this.setState({message: idx});
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
            <Form.Control as="select" defaultValue={this.state.currentClass} onChange={this.changeClass}>
              <option key={0} value={null} >강의를 선택 하세요.</option>
              {this.state.class.map((item, idx) => {
                  return <option key={idx+1} value={item.class_idx}>{item.name}</option>;
              })}
            </Form.Control>
          </Col>
          <Col style={{height: '4em'}}>
            <Form.Control as="select" defaultValue={this.state.currentReceiver} onChange={this.changeStudent}>
              <option key={0} value={0}>전체</option>
              {this.state.student.map((item, idx) => {
                  return <option key={idx+1} value={item.student_idx}>{item.name}</option>;
              })}
            </Form.Control>
          </Col>
        </Row>   
        <Form.Control 
          onChange={(event) => this.changeMessage(event)} 
          placeholder={"메세지를 입력 해 주세요."} 
          type="name"
          as="textarea"
          rows="10"/>
        <br/>
        <Button name="보내기" onClick={this.sendMessage} /> 
      </Wrapper>    
    );
  }
} 

export default SendMessageContainer;