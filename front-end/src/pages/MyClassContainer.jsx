import React, { useState } from "react";
import MyClassTable from "../components/organisms/MyClassTable";
import styled from "styled-components";
import { Form } from "react-bootstrap";
import Button from "../components/atoms/Button";
import axios from "axios";

const Wrapper = styled.div`
  width: 50em;
  margin: 50px auto;
  height: 600px;
  Button {
    float: right;
  }
`;

class MyClassContainer extends React.Component {
  constructor(props){
    super(props);
    
    this.loadResult = this.loadResult.bind(this)
    this.loadResult();
    this.state = {
      header : [
        "날짜",
        "변수",
        "연산자",
        "데이터",
        "조건문",
        "반복문",
        "함수",
        "",
      ],
      data : null,
    }
  }

  loadResult(){
    axios.get("http://localhost:4000/result", { headers : {
      token : window.sessionStorage.getItem('loginToken'),
    }})
    .then((res)=>{
      this.setState({data : res.data.data});
    });
  }

  render(){
    return (
    <Form>
      <Wrapper>
        {this.state.data != null && 
          <MyClassTable headers={this.state.header} rows={this.state.data} />
        }
        <Button type={"submit"} name={"삭제"} size={"sm"} onClick={() => alert("일괄삭제")} />
      </Wrapper>
    </Form>
  );
  }
  
};

export default MyClassContainer;
