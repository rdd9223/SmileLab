import React from "react";
import { Container, Row, Col } from "react-bootstrap";
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
import Jumbotron from "../components/atoms/Jumbotron";
import Text from "../components/atoms/Text";
import axios from "axios";

const Wrapper = styled.div`
  width: 60rem;
  margin: 50px auto;
  height: 600px;
`;


class MyPageContainer extends React.Component {
    constructor(props){
        super(props);

        axios.get("http://localhost:4000/auth/user",{
            headers:{
                token: window.sessionStorage.getItem('loginToken'),
            }
        })
        .then((res) => {
            console.log(res);
            this.setState({
                id: res.data.data.id, 
                name: res.data.data.name, 
                phone_number: res.data.data.phone_number
            });
        });

      
        this.state = {
            id: null,
            password1: null,
            password2: null,
            phone_number: null,
            name: null,
            class_idx: 5,
            isValidPassword: false,
            modalShow : false,
            isSuccess : false,
        };
    }
    //pw, name, phone_number, class_idx
    handleSubmit(){
        axios.put("http://localhost:4000/auth/user",{
            pw: this.state.password1,
            name: this.state.name,
            phone_number: this.state.phone_number,
            class_idx: this.state.class_idx
        },
        {
            headers:{
                token: window.sessionStorage.getItem('loginToken'),
            }
        })
        .then((res) => {
            if(res.data.status === 200)
                alert("변경 성공!")
        });
    }

    render(){
        return(
            <Wrapper>
                <Container>
                    <Jumbotron header={"회원 정보 수정"} text={"123123"}/>
                </Container>
                
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Group>
                        <Text text={"* 표시는 필수 입력 항목입니다."} />
                        <br />
                        <Text text={"아이디: "+this.state.id}/>
                    </Form.Group>
                    <Row> 
                        <Col>
                            <Form.Group>
                                <FormLabelSet name={"비밀번호"} type={"password"} id={"password1"} onChange={(event) => this.setState({password1: event.target.value })}/>
                                <FormText name="6자 이상, 영문/숫자/특수문자 포함" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <FormLabelSet name={"비밀번호 확인"} type={"password"} id={"password2"} onChange={(event) => this.setState({password2: event.target.value })}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FormLabelSet name={"이름 *"} type={"name"} value={this.state.name} onChange={(event) => this.setState({name: event.target.value })} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <FormLabelSet name={"휴대전화 *"} type={"phoneNumber"} value={this.state.phone_number} onChange={(event) => this.setState({phone_number: event.target.value })} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Modal />
                    </Form.Group>
                    <Form.Group>
                        <Button name="변경하기" type="submit" />
                    </Form.Group>
                </Form>
            </Wrapper>
        )
    }
}

export default MyPageContainer;