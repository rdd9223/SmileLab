import React from "react";
import Jumbotron from "../components/atoms/Jumbotron";
import MessageTable from "../components/templates/MessageTable";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components"
import axios from "axios";
import MessageBox from "../components/organisms/MessageBox";

class MessageContainer extends React.Component {
    constructor(props) {
        super(props);
        axios.get("http://localhost:4000/message/1",{headers:{
            token: window.sessionStorage.getItem('loginToken'),
        }})
        .then((res) => {
            this.setState({data: this.state.data.concat(res.data.data)});
        }).
        catch((res) => {
            //Catch Err
        });

        this.state = {
            headers: [
                "#", "보낸사람", "날짜 및 시간", ""
            ],
            data: [],
            setModalShow: false,
            currentMessage: null,
        }

        this.onClickMessage = this.onClickMessage.bind(this);
    }

    // 각 메세지 별 "보기" 버튼 클릭 시 이벤트
    onClickMessage(idx) {
        for(var i = 0; i < this.state.data.length; i++){
            if(this.state.data[i].message_idx == idx){
                this.setState({currentMessage: this.state.data[i]});
            }
        }
    }

    render(){
        const Wrapper = styled.div`
            width: 50em;
            margin: 50px auto;
            div {
                height: 200px;
            }
        `;

        const Container1 = styled.div`
            margin: 30px auto;
        `;

        return(
            <Wrapper>
                <Jumbotron header={"Messages"} text={"메세지함 입니다. 멘트는 모르겠습니다."}/>
                <Container>
                    <Row>
                        <Col>
                            <Container1>
                                <MessageTable headers={this.state.headers} rows={this.state.data} onClick={this.onClickMessage}/>
                            </Container1>
                        </Col>
                        <Col>
                            <Container1>
                                <MessageBox message={this.state.currentMessage} />
                            </Container1>
                        </Col>
                    </Row>
                </Container>
            </Wrapper>
        );
    }
}

export default MessageContainer;