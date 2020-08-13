import React from "react";
import { Form } from "react-bootstrap";
import Jumbotron from "./../components/atoms/Jumbotron";
import Button from "./../components/atoms/Button";
import styled from "styled-components";
import FormLabelSet from "./../components/molecules/form/FormLabelSet"
import { postBoard } from "./../service/board.js";

const Wrapper = styled.div`
  width: 60rem;
  margin: 50px auto;
  height: 600px;
`;

const BoardWriteContainer = () => {
  const [title, setTitle] = React.useState(null);
  const [contents, setContents] = React.useState(null);

  const changeTitle = (event) => {
    setTitle(event.target.value);
  }

  const changeContents = (event) => {
    setContents(event.target.value)
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    const res = await postBoard(
      title,
      contents
    );
    if(res != null && res.data.status === 201){
      alert(res.data.message);
      window.location.href = "/community";
    }
  }

  return(
    <Wrapper>
      <div> 
        <Jumbotron header={"글 쓰기"} text={"자유롭게 글을 써 주세요."} />
      </div>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <FormLabelSet name={"제목"} type={"title"} onChange={(e) => changeTitle(e)} placeholder={"제목을 입력 해 주세요."}/>
            <br/>
            <Form.Control type={"contents"} as="textarea" rows="10" onChange={(event) => changeContents(event)} placeholder={"내용을 입력 해 주세요."} />
          </Form.Group>
          <Form.Group>
            <Button size={"sm"} name="글쓰기" type="submit" />
          </Form.Group>
        </Form>
      </Wrapper>
    </Wrapper>
  );
  
}

export default BoardWriteContainer;
