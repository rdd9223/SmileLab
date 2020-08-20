import React from 'react';
import CommunityTable from "../components/templates/CommunityTable";
import Jumbotron from "components/atoms/Jumbotron";
import Button from "components/atoms/Button";
import { Row, Col, Container, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getBoard, getComment, postComment } from "./../service/board.js";
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 50em;
  margin: 50px auto;
  Button {
    float: right;
  }
`;

const CommunityPostContainer = () => {
  const [title, setTitle] = React.useState(null);
  const [contents, setContents] = React.useState(null);
  const [writer, setWriter] = React.useState(null);
  const [date, setDate] = React.useState(null);
  const [commentTitle, setCommentTitle] = React.useState(null);
  const [commentContents, setCommentContents] = React.useState(null);
  const [commentList, setCommentList] = React.useState([]);
  const [boardIdx, setBoardIdx] = React.useState(null);

  React.useEffect(() => {
    const href = window.location.href;
    const idx = href.substring(href.lastIndexOf('/') + 1);
    setBoardIdx(idx);
    loadBoard(idx);
    loadComment(idx);
  }, []);

  const loadBoard = async(idx) => {
    const res = await getBoard(idx);
    if(res != null && res.data.status === 200){
      setTitle(res.data.data[0].title);
      setContents(res.data.data[0].contents);
      setWriter(res.data.data[0].writer);
      setDate(res.data.data[0].date);
    }
  }

  const loadComment = async(idx) => {
    const res = await getComment(idx);
    if(res != null && res.data.status === 200){
      setCommentList(res.data.data);
    }
  }

  const handleWriteButton = async() => {
    const res = await postComment(boardIdx, commentTitle, commentContents);
    if(res != null && res.data.status === 201){
      window.location.reload();
      //refresh
    }else{
      alert("잠시 후 다시 시도 해 주세요.");
    }
  }

  const handleCommentTitle = (event) => {
    const value = event.target.value;
    setCommentTitle(value);
  }

  const handleCommentContents = (event) => {
    const value = event.target.value;
    setCommentContents(value);
  }

  return(
    <Wrapper style={{paddingBottom: 100}}>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text style={{minHeight: 150}}>
            {contents}
          </Card.Text>
          <small className="text-muted">{date}</small>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">by {writer}</small>
        </Card.Footer>
      </Card>
      <hr/>
      <h6>Comments</h6>
      <Container style={{minHeight:200}}>
        {commentList.length === 0 ? (
          <small className="text-muted">작성 된 댓글이 없습니다.</small>
        ) : (
          <>
          {commentList.map((item, idx) => {
            return(
              <Card key={idx} style={{marginTop: 20, marginBottom: 20}}>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text style={{minHeight: 50}}>
                    {item.contents}
                  </Card.Text>
                  <small className="text-muted">{item.date}</small>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">by {item.writer}</small>
                </Card.Footer>
              </Card>
            )
          })}
          </>
        )}
      </Container>
      <hr/>
      <h6>댓글 달기</h6>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="제목을 입력 해 주세요."
                onChange={(event) => handleCommentTitle(event)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                placeholder="내용을 입력 해 주세요."
                rows="3"
                onChange={(event) => handleCommentContents(event)}
              />
            </Form.Group>
          </Form>
          <Button 
            name="등록" 
            size="small"
            onClick={handleWriteButton}
          />
        </Card.Body>
      </Card>
    </Wrapper>
  );
}

export default CommunityPostContainer;