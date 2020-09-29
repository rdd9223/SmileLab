import React from 'react';
import CommunityTable from "../components/templates/CommunityTable";
import Jumbotron from "components/atoms/Jumbotron";
import Button from "components/atoms/Button";
import { Row, Col, Container, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from 'styled-components';

import { getUser } from '../service/user';
import { getBoard, getComment, postComment, putBoard, putComment, deleteBoard, deleteComment } from "../service/board";

const Wrapper = styled.div`
  width: 50em;
  margin: 50px auto;
  Button {
    float: right;
  }
`;

const CommentContainer = ({ currentUser, item }) => {
  const [edit, setEdit] = React.useState(false);

  const handleDeleteComment = async(idx) => {
    const res = await deleteComment(idx);
    if(res != null && res.data.status === 200){
      alert(res.data.message);
      window.location.reload();
    }
  }
  const handleEditComment = ( _edit ) => {
    setEdit(_edit);
  }

  if(edit){
    return <EditForm title={item.title} contents={item.contents} commentIdx={item.comment_idx} handleEditComment={handleEditComment} />
  }else{
    return(
      <Card style={{marginTop: 20, marginBottom: 20}}>
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text style={{minHeight: 50}}>
            {item.contents}
          </Card.Text>
          <small className="text-muted">{item.date} </small>
          {currentUser != null && item.writer_idx === currentUser ? (
              <div className="text-muted" style={{fontSize:12}}>
                <div style={{display:'inline-block'}} onClick={() => handleEditComment(true)}>수정</div> 
                  &nbsp;|&nbsp;
                <div style={{display:'inline-block'}} onClick={() => handleDeleteComment(item.comment_idx)}>삭제</div>
              </div>
            ) : (
              <>
              </>
            )
          }
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">by {item.writer}</small>
        </Card.Footer>
      </Card>
    )
  }
  
}

const EditForm = ({ title, contents, commentIdx, handleEditComment }) => {
  const [commentTitle, setCommentTitle] = React.useState(title);
  const [commentContents, setCommentContents] = React.useState(contents);

  const handleCommentTitle = (event) => {
    const value = event.target.value;
    setCommentTitle(value);
  }

  const handleCommentContents = (event) => {
    const value = event.target.value;
    setCommentContents(value);
  }

  const handleWriteButton = async() => {
    const res = await putComment(commentIdx, commentTitle, commentContents);
    if(res != null && res.data.status === 200){
      window.location.reload();
      //refresh
    }else{
      alert("잠시 후 다시 시도 해 주세요.");
    }
  }

  return(
    <Card>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              value={commentTitle}
              placeholder="제목을 입력 해 주세요."
              onChange={(event) => handleCommentTitle(event)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              value={commentContents}
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
        <Button 
          name="취소" 
          size="small"
          onClick={() => handleEditComment(false)}
        />
        
      </Card.Body>
    </Card>
  )
}

const CommunityPostContainer = () => {
  const [title, setTitle] = React.useState(null);
  const [contents, setContents] = React.useState(null);
  const [writer, setWriter] = React.useState(null);
  const [writerIdx, setWriterIdx] = React.useState(null);
  const [date, setDate] = React.useState(null);
  const [commentTitle, setCommentTitle] = React.useState(null);
  const [commentContents, setCommentContents] = React.useState(null);
  const [commentList, setCommentList] = React.useState([]);
  const [boardIdx, setBoardIdx] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [edit, setEdit] = React.useState(false);

  React.useEffect(() => {
    const href = window.location.href;
    const idx = href.substring(href.lastIndexOf('/') + 1);
    setBoardIdx(idx);
    loadBoard(idx);
    loadComment(idx);
    loadUser();
  }, []);

  const loadUser = async() => {
    const res = await getUser();
    if(res != null && res.data.status === 200){
      setCurrentUser(res.data.data.user_idx);
    }
  }

  const loadBoard = async(idx) => {
    const res = await getBoard(idx);
    if(res != null && res.data.status === 200){
      setTitle(res.data.data[0].title);
      setContents(res.data.data[0].contents);
      setWriter(res.data.data[0].writer);
      setDate(res.data.data[0].date);
      setWriterIdx(res.data.data[0].writer_idx);
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

  const handleDeleteBoard = async(idx) => {
    const res = await deleteBoard(idx);
    if(res != null && res.data.status === 200){
      alert(res.data.message);
      window.location.href = "/community";
    }
  }

  const handleTitle = (event) => {
    const value = event.target.value;
    setTitle(value);
  }

  const handleContents = (event) => {
    const value = event.target.value;
    setContents(value);
  }

  const handleEditBoard = async( _edit ) => {
    setEdit(_edit);
  }

  const handleUpdateButton = async() => {
    const res = await putBoard(boardIdx, title, contents);
    if(res != null && res.data.status === 200){
      alert(res.data.message);
      window.location.reload();
      //refresh
    }else{
      alert("잠시 후 다시 시도 해 주세요.");
    }
  }

  if(edit){
    return(
      <Card>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                value={title}
                placeholder="제목을 입력 해 주세요."
                onChange={(event) => handleTitle(event)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                value={contents}
                placeholder="내용을 입력 해 주세요."
                rows="3"
                onChange={(event) => handleContents(event)}
              />
            </Form.Group>
          </Form>
          <Button 
            name="취소" 
            size="small"
            onClick={() => handleEditBoard(false)}
          />
          <Button 
            name="등록" 
            size="small"
            onClick={handleUpdateButton}
          />
        </Card.Body>
      </Card>
    )
  }else{
    return(
      <Wrapper style={{paddingBottom: 100}}>
        <Card>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text style={{minHeight: 150}}>
              {contents}
            </Card.Text>
            <small className="text-muted">{date}</small>
            {currentUser != null && writerIdx === currentUser ? (
                <div className="text-muted" style={{fontSize:12}}>
                  <div style={{display:'inline-block'}} onClick={() => handleEditBoard(true)}>수정</div> 
                    &nbsp;|&nbsp;
                  <div style={{display:'inline-block'}} onClick={() => handleDeleteBoard(boardIdx)}>삭제</div>
                </div>
              ) : (
                <>
                </>
              )
            }
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
                <CommentContainer 
                  currentUser={currentUser}
                  item={item}
                />
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
}

export default CommunityPostContainer;