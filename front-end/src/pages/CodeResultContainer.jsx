import React from "react";
import Text from "../components/atoms/Text"
import { Row, Col, Container, Jumbotron } from "react-bootstrap";
import Button from "../components/atoms/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import FormCheck from "../components/atoms/FormCheck";

const Wrapper = styled.div`
  width: 60rem;
  margin: 50px auto;
  height: 600px;
`;

const resetCode = () => {
  localStorage.setItem('currentCode','');
}

class CodeResultContainer extends React.Component {
  constructor(props){
    super(props);
    //console.log(window.sessionStorage.getItem('userId'));
    this.loadResult = this.loadResult.bind(this);
    this.loadResult();

    this.state = {
        data: null,
        result : ''
    }
  }

  async loadResult(){
    await axios.post("http://localhost:4000/compile/result",{ 
      userId: window.sessionStorage.getItem('userId') 
    })
    .then((res) => {
        //console.log(res.data.data);
      this.setState({data: eval("("+res.data.data+")")});
      console.log(this.state.data)
      var str = "";
      str += "정의된 변수의 개수는"+this.state.data.Assign+"개 입니다. \n";
      if(this.state.data.Assign > 0){
        str += 
          "정의된 변수 중 숫자형은 "+this.state.data.num+
          "개, 문자형은 "+this.state.data.Str+
          "개, 리스트 형은 "+this.state.data.list+
          "개, 튜플형은 "+this.state.data.tuple+"개가 입력되었습니다."+
          " 또한, input 함수를 활용한 변수는 "+this.state.data.input+"개 입니다. \n"
      }
      if(this.state.data.BinOp > 0){
        str += "연산자 활용 횟수는 총 "+this.state.data.BinOp+"번 입니다.\n"+
          "이 중 사칙연산은 "+this.state.data.BinOp+
          "번, 단항연산은"+this.state.data.AugAssign+
          "번, 비교연산은 "+this.state.data.Compare+
          "번, 논리연산은 "+this.state.data.Logical+"번 입니다.\n"
      }
      if((this.state.data.For+this.state.data.While) > 0) {
        str += "반복문을 활용한 횟수는 총 "+(this.state.data.For+this.state.data.While)+"회 입니다.\n"
        if(this.state.data.For === 0 && this.state.data.While > 0 ){
          str += "for문을 활용하여 새로운 반복문을 만들어 볼 수 있습니다. for문에 range 함수를 결합하면 일정횟수 반복문을 만들 수 있습니다.\n "
        }
        if(this.state.data.For > 0 && this.state.data.While === 0 ){
          str += "while문을 활용하여 새로운 반복문을 만들어 볼 수 있습니다. while문은 조건식과 함께 사용됩니다.\n "
        }
        //if(/*반복문을 사용하지 않고 여러번 호출하는 경우 */){
        //  str += "반복문(while, for)을 활용하여 코드를 효율적으로 나타낼 수 있습니다.\n"
        //}
        //if(/*while문을 빠져나가지 못하는 경우*/){
        //  str += "break문 또는 continue문을 활용하여 반복문을 종료시키거나 초기조건으로 돌아갈 수 있습니다.\n"
        //}
      }
      if((this.state.data.If + this.state.data.ElseIf + this.state.data.Elif) > 0) {
        str += "조건문 중 if문을 총 "+this.state.data.If+"회 사용하였습니다." +
          "조건문 중 if else 문을 총 "+this.state.data.ElseIf+"회 사용하였습니다." +
          "조건문 중 if elif else 문을 총 "+this.state.data.Elif+"회 사용하였습니다.\n"
        if(this.state.data.UniqIf > 0) {
          str += "다중 조건 판단을 가능하게 하는 if- elif-else 문을 쓰면 코드를 간결하게 나타낼 수 있습니다.\n"
        }
      }
      if(this.state.data.Function > 0) {
        str += "정의된 함수는 "+this.state.data.Function+"개 입니다.\n"
        if(this.state.data.Return === 0 ){
          str+= "return 함수가 없는 코드는 결과값이 없습니다. \n "+
            "Return함수를 활용하여 결과값을 어떻게 돌려줄 것인지 코딩하세요"
        }
      }
      str += "정의된 함수와 내장함수에서 활용된 함수는 "+(this.state.data.Expr)+"개, 활용되지 않은 함수는 "+this.state.data.UnusedFunc+"개 입니다."
      this.setState({result : str});
      
    });
  }

  async saveResult(){
    await axios.post("http://localhost:4000/result/save",{ })
    .then((res) => {
      console.log(res);
    });
  }

  render(){
    return (
      <Container>
        <Wrapper>
          <h3>프로젝트를 통해 확인된 CT 영역은?</h3>
          <Wrapper>
            <Row>
              <Col lg={4}>
                <Jumbotron>
                  <Row>
                    <Col><Text text={"변수"}/></Col>
                    { this.state.data !=null && this.state.data.Name.length !== 0 &&
                      <Col><FormCheck checked={true} /></Col>
                    }
                    { this.state.data !=null && this.state.data.Name.length === 0 &&
                      <Col><FormCheck checked={false} /></Col>
                    }
                  </Row>
                  <Row>
                  <Col><Text text={"연산자"}/></Col>
                  { this.state.data !=null && this.state.data.Expr !== 0 &&
                    <Col><FormCheck checked={true} /></Col>
                  }
                  { this.state.data !=null && this.state.data.Expr === 0 &&
                    <Col><FormCheck checked={false} /></Col>
                  }
                  </Row>
                  <Row>
                    <Col><Text text={"데이터"}/></Col>
                    <Col><FormCheck checked={false} /></Col>
                  </Row>
                  <Row>
                    <Col><Text text={"조건문"}/></Col>
                    { (this.state.data !=null && (this.state.data.If + this.state.data.ElseIf + this.state.data.Elif) !== 0) &&
                      <Col><FormCheck checked={true} /></Col>
                    }
                    { (this.state.data !=null && (this.state.data.If + this.state.data.ElseIf + this.state.data.Elif) === 0) &&
                      <Col><FormCheck checked={false} /></Col>
                    }
                  </Row>
                  <Row>
                    <Col><Text text={"반복"}/></Col>
                    { this.state.data !=null && (this.state.data.For !==0 || this.state.data.While !== 0) &&
                      <Col><FormCheck checked={true} /></Col>
                    }
                    { this.state.data !=null && (this.state.data.For ===0 && this.state.data.While === 0) &&
                      <Col><FormCheck checked={false} /></Col>
                    }
                  </Row>
                  <Row>
                    <Col><Text text={"함수"}/></Col>
                    { this.state.data !=null && this.state.data.Function !== 0 &&
                      <Col><FormCheck checked={true}  /></Col>
                    }
                    { this.state.data !=null && this.state.data.Function === 0 &&
                      <Col><FormCheck checked={false}  /></Col>
                    }
                  </Row>
                </Jumbotron>
              </Col>
              <Col lg={8}>
                <Container>
                  <Jumbotron>
                    {this.state.result.split("\n").map((item, idx) => {
                      return (
                        <Container>
                          <Text text={item} />
                          <br/>
                        </Container>
                      )
                    })}
                  </Jumbotron>
                </Container>
                <Row>
                  <Col lg={2}/>
                  <Col lg={4}>
                    <Link to="/start">
                      <Button name="코드로 돌아가기" />
                    </Link>
                  </Col>
                  <Col lg={3}>
                    <Link to="/start">
                      <Button name="새 프로젝트" onClick={resetCode}/>
                    </Link> 
                  </Col>
                  <Col lg={3}>
                    <Button name="결과 저장" onClick={this.saveResult}/>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Wrapper>
        </Wrapper>
      </Container> 
    )
  }
}

export default CodeResultContainer