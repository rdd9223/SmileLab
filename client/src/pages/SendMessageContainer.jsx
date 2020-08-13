import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import Jumbotron from "../components/atoms/Jumbotron";
import styled from "styled-components";
import Button from "../components/atoms/Button";
import { postMessage } from "./../service/message.js";
import { getProfClassAll, getProfClass } from "./../service/class.js"

 const Wrapper = styled.div`
  width: 50em;
  margin: 50px auto;
  div {
      height: 200px;
  }
`;


const SendMessageContainer = () => {
  const [clazz, setClass] = React.useState([]);
  const [student, setStudent] = React.useState([]);
  const [currentClass, setCurrentClass] = React.useState(null);
  const [currentReceiver, setCurrentReceiver] = React.useState(0);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    loadClass();
  }, [])

  const loadClass = async() => {
    const res = await getProfClassAll();
    if(res != null){
      setClass(res.data.data);
    }
  }

  const changeClass = async(event) => {
    const idx = event.target.value
    if(idx != null){
      const res = await getProfClass(idx);
      if(res != null){
        setStudent(res.data.data);
        setCurrentClass(idx);
      }
    }
  }

  const changeStudent = (event) =>{
    const idx = event.target.value;
    setCurrentReceiver(idx);
  }

  const sendMessage = async() => {
    const res = await postMessage(
      currentClass,
      currentReceiver,
      message,
    );
    if(res!=null && res.data.status === 201){
      alert(res.data.message);
    }
  }

  const changeMessage = (event) => {
    const value = event.target.value
    setMessage(value);
    //this.state.message = event.target.value
  }

  return(
    <Wrapper>
      <div>
        <Jumbotron header={"메세지 보내기"} text={"학생들에게 메세지를 보내세요."} />
      </div>
      <br/>
      <Row style={{height: '4em'}}>
        <Col style={{height: '4em'}}>
          <Form.Control as="select" defaultValue={currentClass} onChange={changeClass}>
            <option key={0} value={null} >강의를 선택 하세요.</option>
            {clazz.map((item, idx) => {
                return <option key={idx+1} value={item.class_idx}>{item.name}</option>;
            })}
          </Form.Control>
        </Col>
        <Col style={{height: '4em'}}>
          <Form.Control as="select" defaultValue={currentReceiver} onChange={changeStudent}>
            <option key={0} value={0}>전체</option>
            {this.state.student.map((item, idx) => {
                return <option key={idx+1} value={item.student_idx}>{item.name}</option>;
            })}
          </Form.Control>
        </Col>
      </Row>   
      <Form.Control 
        onChange={(event) => changeMessage(event)} 
        placeholder={"메세지를 입력 해 주세요."} 
        type="name"
        as="textarea"
        rows="10"/>
      <br/>
      <Button name="보내기" onClick={sendMessage} /> 
    </Wrapper>    
  );
} 

export default SendMessageContainer;