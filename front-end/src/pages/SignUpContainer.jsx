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
import { checkDouble, postUser } from "./../service/user.js";

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
      class_idx: null,
      class_name: '',
      isDouble: true,
      isValidPassword: false,
      modalShow : false,
      isSuccess : false,
    };


    this.updateClass   = this.updateClass.bind(this);
    this.changeId      = this.changeId.bind(this);
    this.isDouble      = this.isDouble.bind(this);
    this.handleSubmit  = this.handleSubmit.bind(this);
  }

  //alert 가 안뜨는 현상 발생
  async isDouble() {
    const res = await checkDouble(this.state.id);
    if (res.data.status === 200){
      this.setState({isDouble : false});
    }else{
      this.setState({isDouble : true});
    }
    alert(res.data.message);
  }

  updateClass(data){
    this.setState({
      class_idx : data.class_idx,
      class_name : data.class_name,
    });
  }

  //비밀번호와 비밀번호 확인이 일치하는지 확인
  checkPassword(event){
    const { name, value, id } = event.target
    this.setState({
      [id] : value 
    }, () => {
    if (id === 'password1' || id === 'password2')
      this.isValidPassword();
    });
  }

  //checkPassword를 통한 검사 뒤 유효한지 한번 더 확인
  isValidPassword(){
    if(this.state.password1 != null && this.state.password1 == this.state.password2) {
      this.setState({isValidPassword: true});
    }
    else {
      this.setState({isValidPassword: false});
    }
  }

  //id가 변경 되었을 시 중복검사를 다시 시행하도록 함
  changeId(event){
    this.setState({
      isDouble : true,
      id: event.target.value
    });
  }

  //회원가입 버튼 처리
  async handleSubmit(event) {
    event.preventDefault();
    if(this.state.isDouble){
      alert("아이디 중복 검사를 해 주세요!");
    }else if(!this.state.isValidPassword){
      alert("비밀번호가 일치하지 않습니다.")
    }else{
      if(this.state.type == 2 && this.state.class_idx == null){
        alert("학습자는 반드시 클래스를 선택하세요!");
      }else{
        const res = await postUser(
          this.state.id,
          this.state.password1,
          this.state.phone_number,
          this.state.name,
          this.state.type,
          this.state.class_idx
        )
        console.log(res);
        if(res.data.status === 201){
          this.setState({isSuccess: true});
          alert(res.data.message);
        }
      }
    }
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
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <FormText name={"* 표시는 필수 입력 항목입니다."} />
              <br />
              <FormLabelButtonSet name={"아이디 *"} type={"id"} buttonName={"중복확인"} 
                onChange={(event) => this.changeId(event)}  
                onClick={this.isDouble} />
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
              <Modal updateClass={this.updateClass} />
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
