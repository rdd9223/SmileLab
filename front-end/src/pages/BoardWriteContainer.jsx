import React from "react";
import { Form, Container } from "react-bootstrap";
import axios from "axios"
import Jumbotron from "./../components/atoms/Jumbotron";
import Button from "./../components/atoms/Button";
import styled from "styled-components";
import FormLabelSet from "./../components/molecules/form/FormLabelSet"

class BoardWriteContainer extends React.Component {
  constructor(props){
    super(props);
    this.state={
      title: null,
      contents : null,
    }
    this.changeTitle = this.changeTitle.bind(this);
    this.changeContents = this.changeContents.bind(this);
  }

  changeTitle(event){
    //console.log(event.target.value);
    this.state.title = event.target.value;
    //console.log(this.state.title);
  }

  changeContents(event){
    this.state.contents = event.target.value;
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post("http://localhost:4000/board", {
      title: this.state.title,
      contents: this.state.contents,
    },{
      headers: {
        token : window.sessionStorage.getItem('loginToken'),
      }
    })
    .then((res) => {
      if(res.data.status === 201){
        alert(res.data.message);
        window.location.href = "/community";
      }
      console.log(res);
      return res;
    })
    .catch((e) => {
      console.log(e);
      return;
    });
    
    //임시로 submit 되는 현상을 막음
    
  }

  render(){
    const Wrapper = styled.div`
      width: 60rem;
      margin: 50px auto;
      height: 600px;
    `;
    return(
      <Wrapper>
        <div> 
          <Jumbotron header={"글 쓰기"} text={"자유롭게 글을 써 주세요."} />
        </div>
        <Wrapper>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Form.Group>
              <FormLabelSet name={"제목"} type={"title"} onChange={(e) => this.changeTitle(e)} placeholder={"제목을 입력 해 주세요."} value={this.state.title}/>
              <br/>
              <Form.Control type={"contents"} as="textarea" rows="10" onChange={(event) => this.changeContents(event)} value={this.state.contents}  placeholder={"내용을 입력 해 주세요."} />
            </Form.Group>
            <Form.Group>
              <Button size={"sm"} name="글쓰기" type="submit" />
            </Form.Group>
          </Form>
        </Wrapper>
      </Wrapper>
    );
  }
}

export default BoardWriteContainer;
