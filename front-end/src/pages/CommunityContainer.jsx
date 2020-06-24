import React, { useState } from "react";
import styled from "styled-components";
import CommunityTable from "../components/templates/CommunityTable";
import Jumbotron from "components/atoms/Jumbotron";
import Modal1 from "components/atoms/Modal";
import Button from "components/atoms/Button";
import axios from "axios";

const Wrapper = styled.div`
  width: 50em;
  margin: 50px auto;
  div {
    height: 200px;
  }
`;

class CommunityContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      headers : ['#', '제목', '작성자', '작성일'],
      data : [],
      modalShow: false,
      currentModal: {
        title : '',
        author: '',
        contents: '',
      },
      currentPage : 1 ,
    }
    this.loadBoard = this.loadBoard.bind(this);
    this.setModalHide = this.setModalHide.bind(this);
    this.setModalShow = this.setModalShow.bind(this);
    this.onClickList = this.onClickList.bind(this);
    this.getNextBoard = this.getNextBoard.bind(this);
    this.getPrevBoard = this.getPrevBoard.bind(this);

    this.loadBoard(this.state.currentPage);
  }
  async loadBoard(idx){
    axios("http://localhost:4000/board/list/"+idx,{
      headers:{
        token: window.sessionStorage.getItem('loginToken'),
      }
    })
    .then((res) => {
      if(res.data.status === 200 && res.data.success)
        this.setState({data: res.data.data});
        this.setState({currentModal : {
          title : this.state.data[0].title, 
          contents: this.state.data[0].contents
        }});
    });
  }

  async getPrevBoard(){
      await this.setState({currentPage: this.state.currentPage - 1});
      this.loadBoard(this.state.currentPage);
  }

  async getNextBoard(){
      await this.setState({currentPage: this.state.currentPage + 1});
      this.loadBoard(this.state.currentPage);
  }


  setModalShow(){
    this.setState({modalShow: true});
  }

  setModalHide(){
    this.setState({modalShow : false});
  }

  onClickList(idx){
    this.setState({currentModal : {
      title : this.state.data[idx].title, 
      contents: this.state.data[idx].contents
    }});
    this.setModalShow();
  }

  render(){
    return (
      <Wrapper>
        <div>
          <Jumbotron header={"Class Community"} text={"자유롭게 생각을 나눠보는 공간입니다."} />
        </div>
        <CommunityTable 
          headers={this.state.headers} 
          rows={this.state.data} 
          setModalShow={this.setModalShow} 
          onClick={this.onClickList} />
        <Modal1 
          show={this.state.modalShow} 
          onHide={this.setModalHide} 
          title={this.state.currentModal.title} 
          contents={this.state.currentModal.contents} />
        <Wrapper>
          <Button name={"이전"} size={"md"} onClick={this.getPrevBoard}/>
          <Button name={"다음"} size={"md"} onClick={this.getNextBoard}/>
        </Wrapper>
      </Wrapper>
    );
  }
  
};

export default CommunityContainer;


/*
  const [headers, setHeaders] = useState(["#", "제목", "작성자", "작성일"]);
  const [data, setData] = useState([
    {
      idx: 1,
      date: "2020.06.01",
      title: "강영우 ",
      writer: "강영우",
      contents:
        "아 진짜 졸려 뒤지겠다 내가 왜이러고 있어야하냐 진자 레전드다 전설이고 레전드고 오졌고 지렸고 레릿고",
    },
    {
      idx: 2,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
    {
      idx: 3,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
    {
      idx: 3,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
    {
      idx: 3,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
    {
      idx: 3,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
    {
      idx: 3,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
    {
      idx: 3,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
    {
      idx: 3,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
    {
      idx: 3,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
    {
      idx: 3,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
  ]);
  
  const [modalShow, setModalShow] = useState(false);
  */