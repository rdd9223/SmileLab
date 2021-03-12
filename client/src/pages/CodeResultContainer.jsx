import React from "react";
import Text from "../components/atoms/Text";
import { Row, Col, Container, Jumbotron } from "react-bootstrap";
import Button from "../components/atoms/Button";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FormCheck from "../components/atoms/FormCheck";
import { getCompileResult, postResult } from "./../service/app.js";

const Wrapper = styled.div`
  width: 60rem;
  margin: 50px auto;
`;

const resetCode = () => {
  localStorage.setItem("currentCode", "");
};

const CodeResultContainer = () => {
  const [data, setData] = React.useState(null);
  const [feedback, setFeedback] = React.useState({
    "data" : "",
    "process" : "",
    "oo" : "",
  })

  React.useEffect(() => {
    const loadResult = async () => {
      const res = await getCompileResult();
      if (res != null && res.data.success) {
        try {
          const _data = JSON.parse(res.data.data);
          console.log(_data)
          setData(_data);
          Feedback(_data);
        } catch (e) {
          alert("오류가 발생하였습니다. 다시 접근하여 주세요!");
          //window.location.href="/";
        }
      }
    };
    loadResult();
  }, []);

  const Feedback = (data) => {
    const precodeFeedback = `
      -순서도를 이용하면 문제해결을 위한 요소를 도형으로 만들어 
      문제해결 절차를 구성해볼 수 있습니다. 순서도를 만든 후 
      파이썬 언어로 표현해보세요. 각 도형의 모양은 파이썬 문법을 
      내포하고 있습니다.
      \spacer
      -메모장을 이용하면 문제를 작은 단위의 문제로 분해하여 
      나만의 언어로 정리해 볼 수 있습니다. 
      쉬운 언어로 알고리즘을 설계한 후 이를 파이썬 언어로 표현해보세요.
      아이디어를 얻고 싶거나 어려움에 부딪혔을 때에는 커뮤니티의 '아이디어 얻기' 
      또는 '질문하기'를 이용해보세요. 또, '동료찾기'를 통해 함께할 동료를 찾아 
      작업한다면 코드를 정교화/심화 할 수 있습니다.\n
    `

    const variableFeedback = `
      정의된 변수는 ${data.Name.length}개이며, 이 중 활용되지 않은 변수가 
      ${data.Name.length - data.UsedName.length}개 있습니다. 
      만약 활용되지 않는 변수가 있다면 삭제하여 코드의 효율성을 높일 수 있습니다.
    `

    const listFeedback = data.list === 0 ? `
      여러 값의 변수가 필요하다면 리스트를 활용해보세요.
    ` : `
      개별 변수와는 달리 리스트는 여러 개의 값을 집합적으로 저장할 수 있습니다. 
      리스트는 문자열과는 달리 변경이 가능하고 '+'로 리스트를 연결할 수도 있습니다.
      리스트를 더 이상 수정할 필요가 없다면, tuple 함수를 써서 튜플로 변경해 보세요. 
      안정성이 향상됩니다.
      (예: interest=['flowers', 'bugs', 'animals'] -> tuple(interest))
    `

    const tupleFeedback = data.tuple === 0 ? `
      변경이 불필요한 여러 값의 변수가 필요하다면 튜플을 활용해보세요.
    ` : `
      튜플은 리스트와 유사하지만 초기화 한 후 편집할 수 없습니다. 
      그러나 리스트보다 비용적 측면, 안정성에서 리스트보다 뛰어납니다.
      튜플 값 변경이 필요하다면 list함수를 사용하여 리스트로 변경할 수 있습니다.
      (예: interest=('flowers', 'bugs', 'animals') -> list(interest))
    `

    const unusedVariableFeedback = `
      사용되지 않은 변수가 있습니다. 삭제하여 코드의 효율성을 높여보세요.
    `

    const operationFeedback = `
      연산자 활용 횟수는 총 ${data.BinOp + data.AugAssign + data.Compare + data.Logical}번 입니다.\n
      이 중 사칙연산은 ${data.BinOp} 번, 단항연산은 ${data.AugAssign} 번,
      비교연산은 ${data.Compare} 번, 논리연산은 ${data.Logical} 번 입니다.\n
      어떤 변수에 대한 연산의 결과를 자기 자신에게 대입할 때에는 
      단항연산자를 사용하여 간단히 표현할 수 있습니다.
      (예) a=a+3을 a+=3으로 간단히 표현할 수 있습니다. \n
    `

    const conditionFeedback = `
      조건문 중 if문을 총 ${data.If}회, if else 문을 총 ${data.ElseIf} 회,
      if elif else 문을 총 ${data.Elif}회 사용하였습니다.\n
      ${data.UniqIf > 0 ? `
          다중 조건 판단을 가능하게 하는 if- elif-else 문을 쓰면 
          코드를 간결하게 나타낼 수 있습니다.\n
        ` : `
        
        `
      }
    `
    
    const loopFeedback = `
      반복문을 활용한 횟수는 총${data.For + data.While}회 입니다.\n
      ${(data.For === 0 && data.While > 0) ? `
          for문을 활용하여 새로운 반복문을 만들어 볼 수 있습니다. 
          for문에 range 함수를 결합하면 일정횟수 반복문을 만들 수 있습니다.\n 
        ` : `
        
        `
      }
      ${(data.For > 0 && data.While === 0) ? `
          while문을 활용하여 새로운 반복문을 만들어 볼 수 있습니다. 
          while문은 조건식과 함께 사용됩니다.\n 
        ` : `
        
        `
      }
      ${(data.PrintRepeat > 0) ? `
          반복문(while, for)을 활용하여 코드를 효율적으로 나타낼 수 있습니다.\n
        ` : `
        
        `
      }
    `

    const functionFeedback = `
      정의된 함수는 ${data.Function}개 입니다. \n
      ${data.FuncNoArgs > 0 ? `
          함수이름() 형태는 입력값이 없고 결과값만 있는 코드 형태입니다. \n
        ` : `
        
        `
      }
      ${data.ParamOverThree > 0 ? `
          매개변수가 3개 이상인 경우 '*변수명'을 활용하여 함수를 정의할 수 있습니다. \n
        ` : `
        
        `
      }
      ${data.Function + data.UsedInnerFunc.length > 0 ? `
          정의된 함수와 내장함수에서 활용된 함수는 ${data.Function + data.UsedInnerFunc.length}개, 
          활용되지 않은 함수는 ${data.UnusedFunc}개 입니다.
        ` : `
        
        `
      }
    `

    const classFeedback = data.Class === 0 ? `
      공통된 속성을 여러 번 코딩했다면, 코드와 코드가 처리할 데이터를 묶어 class로 정의해보세요. (아래 기본형 제시)
      Class 이름:
      def __init__(self, 초기값):
      멤버 초기화
      메서드 정의
      여기서 __init__는 통상 객체를 초기화 하는 특수 메서드이며, 클래스에 소속된 함수르 메서드라고 칭합니다.
    ` : `
      class의 정의를 통해 같은 속성을 가진 객체를 얼마든지 만들 수 있습니다. 
      또한 '상속'을 통해 기존 클래스를 확장하여 멤버(변수, 함수)를 추가하거나 동작을 변경할 수 있습니다.(아래의 예시 제시)
      예)   
        class Parent():
         def __init__(self):
              self.a=5
          def method_a(self):
                print("부모클래스 A")
        class Child(Parent):
          def __init__(self):
              super().__init__()
              self.b=10
        c=Child()
        print(c.a, c.b)
    `

    const importFeedback = data.Import === 0 ? `
      현재 코드와 관련된 기존 코드를 수정하여 활용하는 것은 코드를 일반화에 도움을 줄 수 있습니다.
    ` : `
      기존의 데이터를 또 다른 코드에 활용함으로써 코드를 일반화하는데 도움이 되었습니다.
    `

    setFeedback({
      "data" : (
        precodeFeedback + " \spacer"+
        variableFeedback + " \spacer"+ 
        listFeedback + " \spacer"+ 
        tupleFeedback + " \spacer"+ 
        unusedVariableFeedback
      ),
      "process" : (
        operationFeedback + " \spacer"+
        conditionFeedback + " \spacer"+
        loopFeedback + " \spacer"+
        functionFeedback
      ),
      "oo" : (
        classFeedback + " \spacer"+
        importFeedback
      ),
    })

  };

  const saveResult = async () => {
    const res = await postResult(
      data.Name.length,
      data.BinOp + data.AugAssign + data.Compare + data.Logical,
      0,
      data.If + data.ElseIf + data.Elif,
      data.For + data.While,
      data.Function
    );
    if (res.data.status === 201) {
      alert("저장 성공!");
      window.location.href = "/myclass";
    }
  };

  const CTListItem = ({ text, checked = false }) => {
    return(
      <div style={{display:'flex'}}>  
        <div style={{flexGrow: 1}}>
          <Text text={text} />
        </div>
        <FormCheck checked={checked} />
      </div>
    )
  }

  return (
    <Container>
      <Wrapper>
        <Wrapper>
          <Row>
            <Col lg={4}>
              <Jumbotron 
                style={{
                  padding: 0, 
                  height: 60, 
                  display:'flex', 
                  flexDirection:'column',
                  justifyContent:'center'
                }}
              >
                <h6 
                  style={{
                    textAlign:'center',
                  }}
                >
                  확인된 CT영역
                </h6>
              </Jumbotron>
              <Jumbotron>
                {data != null &&
                  <div>
                    <div style={{marginBottom: 40}}>
                      <h6>
                        <strong>데이터의 추상화</strong>
                      </h6>
                      <CTListItem text="문제분해/자료표현" checked={false} />
                      <CTListItem text="변수의 정의" checked={data.Name.length > 0} />
                      <CTListItem text="데이터 유형(자료구조)" checked={data.list + data.tuple > 0} />
                    </div>
                    <div style={{marginBottom: 40}}>
                      <h6>
                        <strong>절차의 추상화</strong>
                      </h6>
                      <CTListItem text="연산" checked={data.BinOp + data.AugAssign + data.Compare + data.Logical > 0} />
                      <CTListItem text="조건문" checked={data.If + data.ElseIf + data.Elif > 0} />
                      <CTListItem text="반복문" checked={data.For + data.While > 0} />
                      <CTListItem text="함수" checked={data.Function + data.UsedInnerFunc.length > 0} />
                    </div>
                    <div style={{marginBottom: 40}}>
                      <h6>
                        <strong>객체지향</strong>
                      </h6>
                      <CTListItem text="class/method" checked={data.Class > 0} />
                      <CTListItem text="impot 모듈/데이터" checked={data.Import > 0} />
                    </div>
                  </div>
                } 
              </Jumbotron>
            </Col>
            <Col lg={8}>
              <h6 
                style={{
                  textAlign:'center', 
                  alignSelf:'center'
                }}
              >
                제공되는 피드백을 통해 자기평가 및 개선방안 탐색을 해보세요.
              </h6>
              <Container>
                <div style={{display:'flex'}}>
                  <Jumbotron 
                    style={{
                      width: 40, 
                      marginRight: 20, 
                      padding: 10, 
                      display:'flex', 
                      flexDirection:'column', 
                      justifyContent:'center',
                      height: 230,
                    }}
                  >
                    {"데이터의 추상화".split("").map(char => {
                      return(
                        <h6 
                          style={{
                            fontWeight: 600, 
                            textAlign: 'center'
                          }}
                        >
                      <strong>{char}</strong>
                    </h6>
                      )
                    })}
                  </Jumbotron>
                  <Jumbotron style={{height: 230, width:'100%', overflow:'auto', padding: 20}}>
                    {feedback.data.split("\spacer").map((item, idx) => {
                      return (
                        <div style={{marginBottom: 30, fontSize: 13}}>
                          {item.split("\n").length > 0 ? (
                            <div>
                              {item.split("\n").map(text => {
                                return<div style={{marginBottom: 3}}>{text}</div>
                              })}
                            </div>
                          ) : (
                            <div>{item}</div>
                          )}
                        </div>
                      );
                    })}
                  </Jumbotron>
                  </div>
                  <div style={{display:'flex'}}>
                    <Jumbotron 
                      style={{
                        width: 40, 
                        marginRight: 20, 
                        padding: 10, 
                        display:'flex', 
                        flexDirection:'column', 
                        justifyContent:'center',
                        height: 230,
                      }}
                    >
                      {"절차의 추상화".split("").map(char => {
                        return(
                          <h6 
                            style={{
                              fontWeight: 600, 
                              textAlign: 'center'
                            }}
                          >
                        <strong>{char}</strong>
                      </h6>
                        )
                      })}
                    </Jumbotron>
                    <Jumbotron style={{height: 230, width:'100%', overflow:'auto', padding: 20}}>
                      {feedback.process.split("\spacer").map((item, idx) => {
                        return (
                          <div style={{marginBottom: 30, fontSize: 13}}>
                            {item.split("\n").length > 0 ? (
                              <div>
                                {item.split("\n").map(text => {
                                  return<div style={{marginBottom: 3}}>{text}</div>
                                })}
                              </div>
                            ) : (
                              <div>{item}</div>
                            )}
                          </div>
                        );
                      })}
                    </Jumbotron>
                  </div>
                  <div style={{display:'flex'}}>
                    <Jumbotron 
                      style={{
                        width: 40, 
                        marginRight: 20, 
                        padding: 10, 
                        display:'flex', 
                        flexDirection:'column', 
                        justifyContent:'center',
                        height: 230,
                      }}
                    >
                      {"객체지향요소".split("").map(char => {
                        return(
                          <h6 
                            style={{
                              fontWeight: 600, 
                              textAlign: 'center'
                            }}
                          >
                        <strong>{char}</strong>
                      </h6>
                        )
                      })}
                    </Jumbotron>
                    <Jumbotron style={{height: 230, width:'100%', overflow:'auto', padding: 20}}>
                      {feedback.oo.split("\spacer").map((item, idx) => {
                        return (
                          <div style={{marginBottom: 30, fontSize: 13}}>
                            {item.split("\n").length > 0 ? (
                              <div>
                                {item.split("\n").map(text => {
                                  return<div style={{marginBottom: 3}}>{text}</div>
                                })}
                              </div>
                            ) : (
                              <div>{item}</div>
                            )}
                          </div>
                        );
                      })}
                    </Jumbotron>
                  </div>
              </Container>
              <Row>
                <Col lg={2} />
                <Col lg={4}>
                  <Link to="/start">
                    <Button name="코드로 돌아가기" />
                  </Link>
                </Col>
                <Col lg={3}>
                  <Link to="/start">
                    <Button name="새 프로젝트" onClick={resetCode} />
                  </Link>
                </Col>
                <Col lg={3}>
                  <Button name="결과 저장" onClick={saveResult} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Wrapper>
      </Wrapper>
    </Container>
  );
};

export default CodeResultContainer;
