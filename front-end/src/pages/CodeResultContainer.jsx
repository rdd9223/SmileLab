import React from "react";
import Text from "../components/atoms/Text"
import { Row, Col, Container, Jumbotron } from "react-bootstrap";
import Button from "../components/atoms/Button";
import { Link, useHistory  } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import FormCheck from "../components/atoms/FormCheck";

const Wrapper = styled.div`
  width: 60rem;
  margin: 50px auto;
`;

const resetCode = () => {
  localStorage.setItem('currentCode','');
}

class CodeResultContainer extends React.Component {
  constructor(props){
    super(props);
    this.loadResult = this.loadResult.bind(this);
    this.saveResult = this.saveResult.bind(this);
    this.loadResult();

    this.state = {
        data: null,
        result : '잠시만 기다려주세요...'
    }
  }

  async loadResult(){
    await axios.post("http://localhost:4000/compile/result",{ 
      userId: window.sessionStorage.getItem('userId') 
    })
    .then((res) => {
      if(res.data.success){
        this.setState({data: eval("("+res.data.data+")")});
        var str = "";
        
        if(this.state.data.Name.length > 0){
          str += "정의된 변수의 개수는"+this.state.data.Name.length+"개 입니다. \n";
          str += 
            "정의된 변수 중 숫자형은 "+this.state.data.num+
            "개, 문자형은 "+this.state.data.Str+
            "개, 리스트 형은 "+this.state.data.list+
            "개, 튜플형은 "+this.state.data.tuple+"개가 입력되었습니다."+
            " 또한, input 함수를 활용한 변수는 "+this.state.data.input+"개 입니다. \n"

          str += "위 변수 중 활용된 변수는 "+this.state.data.UsedName.length+
            "개, 활용되지 않은 변수는 "+(this.state.data.Name.length-this.state.data.UsedName.length)+"개 입니다.\n"

          str += "활용된 변수 중 다른 변수에 활용된 변수는 "+this.state.data.NameUsedAssign.length+
            "개, 연산에 활용된 변수는 "+this.state.data.NameUsedOp.length+"개 입니다.\n"
        }
        if(this.state.data.BinOp + this.state.data.AugAssign +this.state.data.Compare +this.state.data.Logical > 0){
          str += "연산자 활용 횟수는 총 "+(this.state.data.BinOp + this.state.data.AugAssign +this.state.data.Compare +this.state.data.Logical)+"번 입니다.\n"+
            "이 중 사칙연산은 "+this.state.data.BinOp+
            "번, 단항연산은"+this.state.data.AugAssign+
            "번, 비교연산은 "+this.state.data.Compare+
            "번, 논리연산은 "+this.state.data.Logical+"번 입니다.\n"
          if(this.state.data.SelfOp > 0){
            str += "어떤 변수에 대한 연산의 결과를 자기 자신에게 대입할 때에는 단항연산자를 사용하여 간단히 표현할 수 있습니다." +
              "(예) a=a+3을 a+=3으로 간단히 표현할 수 있습니다. \n"
          }
        }
        if((this.state.data.For+this.state.data.While) > 0) {
          str += "반복문을 활용한 횟수는 총 "+(this.state.data.For+this.state.data.While)+"회 입니다.\n"
          if(this.state.data.For === 0 && this.state.data.While > 0 ){
            str += "for문을 활용하여 새로운 반복문을 만들어 볼 수 있습니다. for문에 range 함수를 결합하면 일정횟수 반복문을 만들 수 있습니다.\n "
          }
          if(this.state.data.For > 0 && this.state.data.While === 0 ){
            str += "while문을 활용하여 새로운 반복문을 만들어 볼 수 있습니다. while문은 조건식과 함께 사용됩니다.\n "
          }
          
          //if(/*while문을 빠져나가지 못하는 경우*/){
          //  str += "break문 또는 continue문을 활용하여 반복문을 종료시키거나 초기조건으로 돌아갈 수 있습니다.\n"
          //}
        }else{
          if(this.state.data.PrintRepeat > 0){
            str += "반복문(while, for)을 활용하여 코드를 효율적으로 나타낼 수 있습니다.\n"
          }
        }
        
        if(( this.state.data.If + this.state.data.ElseIf + this.state.data.Elif ) > 0) {
          str += "조건문 중 if문을 총 "+this.state.data.If+"회,  " +
            "if else 문을 총 "+this.state.data.ElseIf+"회,   "+
            "if elif else 문을 총 "+this.state.data.Elif+"회 사용하였습니다.\n"
          if(this.state.data.UniqIf > 0) {
            str += "다중 조건 판단을 가능하게 하는 if- elif-else 문을 쓰면 코드를 간결하게 나타낼 수 있습니다.\n"
          }
        }
        if(this.state.data.Function > 0) {
          str += "정의된 함수는 "+this.state.data.Function+"개 입니다. \n"
          if(this.state.data.Return === 0 ){
            str += "return 함수가 없는 코드는 결과값이 없습니다. "+
              "Return함수를 활용하여 결과값을 어떻게 돌려줄 것인지 코딩하세요. \n"
          }
          if(this.state.data.FuncNoArgs > 0){
            str += "함수이름() 형태는 입력값이 없고 결과값만 있는 코드 형태입니다. \n"
          }
          if(this.state.data.ParamOverThree > 0){
            str += "매개변수가 3개 이상인 경우 '*변수명'을 활용하여 함수를 정의할 수 있습니다. \n"
          }
        }
        if (this.state.data.Function+this.state.data.UsedInnerFunc.length > 0) {
          str += "정의된 함수와 내장함수에서 활용된 함수는 "+(this.state.data.Function+this.state.data.UsedInnerFunc.length)+
            "개, 활용되지 않은 함수는 "+this.state.data.UnusedFunc+"개 입니다."
        }
        
        this.setState({result : str});
      }
    });
  }

  async saveResult(){
    await axios.post("http://localhost:4000/result/save",{
      variable    : this.state.data.Name.length, 
      operator    : this.state.data.BinOp + this.state.data.AugAssign +this.state.data.Compare +this.state.data.Logical, 
      data        : 0, 
      conditional : this.state.data.If + this.state.data.ElseIf + this.state.data.Elif, 
      repeat      : this.state.data.For + this.state.data.While, 
      func        : this.state.data.Function
     }, {headers: {
      token: window.sessionStorage.getItem('loginToken'),
     }})
    .then((res) => {
      if(res.data.status === 201){
        alert("저장 성공!");
        window.location.href = "/myclass";
      }
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
                  { this.state.data !=null && (this.state.data.BinOp + this.state.data.AugAssign +this.state.data.Compare +this.state.data.Logical) !== 0 &&
                    <Col><FormCheck checked={true} /></Col>
                  }
                  { this.state.data !=null && (this.state.data.BinOp + this.state.data.AugAssign +this.state.data.Compare +this.state.data.Logical) === 0 &&
                    <Col><FormCheck checked={false} /></Col>
                  }
                  </Row>
                  {/* 
                  <Row>
                    <Col><Text text={"데이터"}/></Col>
                    <Col><FormCheck checked={false} /></Col>
                  </Row>
                  */}
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