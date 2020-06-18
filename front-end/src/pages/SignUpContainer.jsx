import React from "react";
import styled from "styled-components";
import FormText from "../components/atoms/FormText";
import FormLabelSet from "../components/molecules/form/FormLabelSet";
import FormLabelButtonSet from "../components/molecules/form/FormLabelButtonSet";
import { Form } from "react-bootstrap";
import FormLabel from "../components/atoms/FormLabel";
import FormCheck from "../components/atoms/FormCheck";
import Button from "../components/atoms/Button";
import Modal from "../components/organisms/ClassModal"
import SignUpSuccess from "../components/organisms/SignUpSuccess";
import axios from "axios";

const Wrapper = styled.div`
  width: 40em;
  margin: 50px auto;
`;

class SignUpContainer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      password1: null,
      password2: null,
      phone_number: null,
      name: null,
      type: null,
      class_idx: 5,
      isDouble: true,
      isValidPassword: false,
      modalShow : false,
      isSuccess : false,
    };
    
  }

  isDouble(event) {
    axios.post('http://localhost:4000/auth/signup/idcheck', {
      id: this.state.id
    })
    .then((res) => {
      console.log(res);
      if (res.data.status === 200){
        alert(res.data.message);
        this.setState({isDouble : false});
      }else{
        alert(res.data.message);
        this.setState({isDouble : true});
      }

      return res;
    })
    .catch((e) => {
      console.log(e);
      return;
    });
  }

  
  searchClass(){
    //TODO
    //임시 데이터
    this.state.modalShow = true;
  }


  handleClose() {
    this.setState({modalShow: false});
  }

  checkPassword(event){
    const { name, value, id } = event.target
    console.log(id);

    this.setState({
      [id] : value 
    }, () => {
    if (id === 'password1' || id === 'password2')
      this.isValidPassword();
    });
  }

  isValidPassword(){
    if(this.state.password1 != null && this.state.password1 == this.state.password2) {
      this.setState({isValidPassword: true});
    }
    else {
      this.setState({isValidPassword: false});
    }
  }


  handleSubmit(event) {
    console.log(this.state);
    //id, pw, name, phone_number, type, class_idx
    //id, pw, name, phone_number, type, class_idx 
    if(this.state.isDouble){
      alert("아이디 중복 검사를 해 주세요!");
    }else if(!this.state.isValidPassword){
      alert("비밀번호가 일치하지 않습니다.")
    }else{
      axios.post("http://localhost:4000/auth/signup", {
        id: this.state.id,
        pw: this.state.password1,
        phone_number: this.state.phone_number,
        name: this.state.name,
        type: this.state.type,
        class_idx: this.state.class_idx
      })
      .then((res) => {
        if(res.data.status === 201){
          this.setState({isSuccess: true});
        }
        console.log(res);
        return res;
      })
      .catch((e) => {
        console.log(e);
        return;
      });
    }
    //임시로 submit 되는 현상을 막음
    event.preventDefault();
  }
  render(){

    if(this.state.isSuccess){
      return(
        <Wrapper>
          <SignUpSuccess />
        </Wrapper>
      );
      
    }else{
      return (
        <Wrapper>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Form.Group>
              <FormText name={"* 표시는 필수 입력 항목입니다."} />
              <br />
              <FormLabelButtonSet name={"아이디 *"} type={"id"} buttonName={"중복확인"} 
              onChange={(event) => this.setState({id: event.target.value })}  
              onClick={this.isDouble.bind(this)} />
              <FormText name="이메일 형식으로 된 아이디를 입력해주세요." />
            </Form.Group>
            <Form.Group>
              <FormLabelSet name={"비밀번호 *"} onChange={(event) => this.checkPassword(event)} type={"password"} id={"password1"} />
              <FormText name="6자 이상, 영문/숫자/특수문자 포함" />
            </Form.Group>
            <Form.Group>
              <FormLabelSet name={"비밀번호 확인 *"} onChange={(event) => this.checkPassword(event)} type={"password"} id={"password2"}/>
            </Form.Group>
            <Form.Group>
              <FormLabelSet name={"이름 *"} onChange={(event) => this.setState({name: event.target.value })} type={"name"} />
            </Form.Group>
            <Form.Group>
              <FormLabelSet name={"휴대전화 *"} onChange={(event) => this.setState({phone_number: event.target.value })} type={"phoneNumber"} />
            </Form.Group>
            <Form.Group>
              <Modal />
            </Form.Group>
            <Form.Group>
              <FormLabel name={"가입유형 *"} />
              <FormCheck type="radio" label="교수자" name="userType" id="1" onChange={(event) => this.setState({type: event.target.id })} />
              <FormCheck type="radio" label="학습자" name="userType" id="2" onChange={(event) => this.setState({type: event.target.id })} />
            </Form.Group>
            <Form.Group>
              <Button name="회원가입" type="submit" />
            </Form.Group>
          </Form>
        </Wrapper>
      );
    }
    
  }
};

export default SignUpContainer;
