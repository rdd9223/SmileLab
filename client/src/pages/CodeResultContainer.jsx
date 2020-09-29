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
  const [valueData, setValueData] = React.useState("");
  const [loopData, setLoopData] = React.useState("");
  const [conditionData, setConditionData] = React.useState("");
  const [opData, setOpData] = React.useState("");
  const [funcData, setFuncData] = React.useState("");

  React.useEffect(() => {
    loadResult();
  }, []);

  const Feedback = (_data) => {
    if (_data.Name.length > 0) {
      var value = "";
      _data.Name.map((item) => {
        console.log(item);
      })
      value += "정의된 변수의 개수는" + _data.Name.length + "개 입니다. \n";
      value +=
        "정의된 변수 중 숫자형은 " +
        _data.num +
        "개, 문자형은 " +
        _data.Str +
        "개, 리스트 형은 " +
        _data.list +
        "개, 튜플형은 " +
        _data.tuple +
        "개가 입력되었습니다." +
        " 또한, input 함수를 활용한 변수는 " +
        _data.input +
        "개 입니다. \n";
      value += 
        "동적 타입을 지닌 변수는 " +
        (_data.Name.length - (_data.num + _data.Str + _data.tuple + _data.list + _data.input)) +
        "개 입니다.\n"

      value +=
        "위 변수 중 활용된 변수는 " +
        _data.UsedName.length +
        "개, 활용되지 않은 변수는 " +
        (_data.Name.length - _data.UsedName.length) +
        "개 입니다.\n";

      value +=
        "활용된 변수 중 다른 변수에 활용된 변수는 " +
        _data.NameUsedAssign.length +
        "개, 연산에 활용된 변수는 " +
        _data.NameUsedOp.length +
        "개 입니다.\n";
      setValueData(value);
    }
    if (_data.BinOp + _data.AugAssign + _data.Compare + _data.Logical > 0) {
      var op = "";
      op +=
        "연산자 활용 횟수는 총 " +
        (_data.BinOp + _data.AugAssign + _data.Compare + _data.Logical) +
        "번 입니다.\n" +
        "이 중 사칙연산은 " +
        _data.BinOp +
        "번, 단항연산은" +
        _data.AugAssign +
        "번, 비교연산은 " +
        _data.Compare +
        "번, 논리연산은 " +
        _data.Logical +
        "번 입니다.\n";
      if (_data.SelfOp > 0) {
        op +=
          "어떤 변수에 대한 연산의 결과를 자기 자신에게 대입할 때에는 단항연산자를 사용하여 간단히 표현할 수 있습니다." +
          "(예) a=a+3을 a+=3으로 간단히 표현할 수 있습니다. \n";
      }
      setOpData(op);
    }
    var loop = "";
    if (_data.For + _data.While > 0) {
      loop += "반복문을 활용한 횟수는 총 " + (_data.For + _data.While) + "회 입니다.\n";
      if (_data.For === 0 && _data.While > 0) {
        loop +=
          "for문을 활용하여 새로운 반복문을 만들어 볼 수 있습니다. for문에 range 함수를 결합하면 일정횟수 반복문을 만들 수 있습니다.\n ";
      }
      if (_data.For > 0 && _data.While === 0) {
        loop +=
          "while문을 활용하여 새로운 반복문을 만들어 볼 수 있습니다. while문은 조건식과 함께 사용됩니다.\n ";
      }

      //if(/*while문을 빠져나가지 못하는 경우*/){
      //  str += "break문 또는 continue문을 활용하여 반복문을 종료시키거나 초기조건으로 돌아갈 수 있습니다.\n"
      //}
    } else {
      if (_data.PrintRepeat > 0) {
        loop += "반복문(while, for)을 활용하여 코드를 효율적으로 나타낼 수 있습니다.\n";
      }
    }
    setLoopData(loop);

    if (_data.If + _data.ElseIf + _data.Elif > 0) {
      var condition = "";
      condition +=
        "조건문 중 if문을 총 " +
        _data.If +
        "회,  " +
        "if else 문을 총 " +
        _data.ElseIf +
        "회,   " +
        "if elif else 문을 총 " +
        _data.Elif +
        "회 사용하였습니다.\n";
      if (_data.UniqIf > 0) {
        condition +=
          "다중 조건 판단을 가능하게 하는 if- elif-else 문을 쓰면 코드를 간결하게 나타낼 수 있습니다.\n";
      }
      setConditionData(condition);
    }
    var func = "";
    if (_data.Function > 0) {
      func += "정의된 함수는 " + _data.Function + "개 입니다. \n";
      // if (_data.Return === 0) {
      //   func +=
      //     "return 함수가 없는 코드는 결과값이 없습니다. " +
      //     "Return함수를 활용하여 결과값을 어떻게 돌려줄 것인지 코딩하세요. \n";
      // }
      if (_data.FuncNoArgs > 0) {
        func += "함수이름() 형태는 입력값이 없고 결과값만 있는 코드 형태입니다. \n";
      }
      if (_data.ParamOverThree > 0) {
        func += "매개변수가 3개 이상인 경우 '*변수명'을 활용하여 함수를 정의할 수 있습니다. \n";
      }
    }
    if (_data.Function + _data.UsedInnerFunc.length > 0) {
      const func =
        "정의된 함수와 내장함수에서 활용된 함수는 " +
        (_data.Function + _data.UsedInnerFunc.length) +
        "개, 활용되지 않은 함수는 " +
        _data.UnusedFunc +
        "개 입니다.";
    }
    setFuncData(func);
  };

  const loadResult = async () => {
    const res = await getCompileResult();
    console.log(res);
    if (res != null && res.data.success) {
      try {
        const _data = JSON.parse(res.data.data);
        setData(_data);
        Feedback(_data);
      } catch (e) {
        alert("오류가 발생하였습니다. 다시 접근하여 주세요!");
        //window.location.href="/";
      }
    }
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

  return (
    <Container>
      <Wrapper>
        <h3>프로젝트를 통해 확인된 CT 영역은?</h3>
        <Wrapper>
          <Row>
            <Col lg={4}>
              <Jumbotron>
                <Row>
                  <Col>
                    <Text text={"데이터 표현"} />
                  </Col>
                  {valueData !== "" ? (
                    <Col>
                      <FormCheck checked={true} />
                    </Col>
                  ) : (
                    <Col>
                      <FormCheck checked={false} />
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col>
                    <Text text={"연산"} />
                  </Col>
                  {opData !== "" ? (
                    <Col>
                      <FormCheck checked={true} />
                    </Col>
                  ) : (
                    <Col>
                      <FormCheck checked={false} />
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col>
                    <Text text={"논리적 사고"} />
                  </Col>
                  {conditionData !== "" ? (
                    <Col>
                      <FormCheck checked={true} />
                    </Col>
                  ) : (
                    <Col>
                      <FormCheck checked={false} />
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col>
                    <Text text={"플로우제어"} />
                  </Col>
                  {loopData !== "" ? (
                    <Col>
                      <FormCheck checked={true} />
                    </Col>
                  ) : (
                    <Col>
                      <FormCheck checked={false} />
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col>
                    <Text text={"추상화"} />
                  </Col>
                  {funcData !== "" ? (
                    <Col>
                      <FormCheck checked={true} />
                    </Col>
                  ) : (
                    <Col>
                      <FormCheck checked={false} />
                    </Col>
                  )}
                </Row>
              </Jumbotron>
            </Col>
            <Col lg={8}>
              <Container>
                {valueData != null && valueData !== "" && (
                  <Jumbotron>
                    <h6 
                      style={{fontWeight:600, textAlign:'center', paddingBottom:24}} 
                    >
                      데이터 표현
                    </h6>
                    {valueData.split("\n").map((item, idx) => {
                      return (
                        <Container key={idx}>
                          <Text text={item} />
                        </Container>
                      );
                    })}
                  </Jumbotron>
                )}

                {opData != null && opData !== "" && (
                  <Jumbotron>
                    <h6 
                      style={{fontWeight:600, textAlign:'center', paddingBottom:24}} 
                    >
                      연산
                    </h6>
                    {opData.split("\n").map((item, idx) => {
                      return (
                        <Container key={idx}>
                          <Text text={item} />
                        </Container>
                      );
                    })}
                  </Jumbotron>
                )}

                {funcData != null && funcData !== "" && (
                  <Jumbotron>
                    <h6 
                      style={{fontWeight:600, textAlign:'center', paddingBottom:24}} 
                    >
                      추상화
                    </h6>
                    {funcData.split("\n").map((item, idx) => {
                      return (
                        <Container key={idx}>
                          <Text text={item} />
                        </Container>
                      );
                    })}
                  </Jumbotron>
                )}

                {loopData != null && loopData !== "" && (
                  <Jumbotron>
                    <h6 
                      style={{fontWeight:600, textAlign:'center', paddingBottom:24}} 
                    >
                      플로우제어
                    </h6>
                    {loopData.split("\n").map((item, idx) => {
                      return (
                        <Container key={idx}>
                          <Text text={item} />
                        </Container>
                      );
                    })}
                  </Jumbotron>
                )}

                {conditionData != null && conditionData != "" && (
                  <Jumbotron>
                    <h6 
                      style={{fontWeight:600, textAlign:'center', paddingBottom:24}} 
                    >
                      논리적 사고
                    </h6>
                    {conditionData.split("\n").map((item, idx) => {
                      return (
                        <Container key={idx}>
                          <Text text={item} />
                        </Container>
                      );
                    })}
                  </Jumbotron>
                )}

                {conditionData === "" &&
                  funcData === "" &&
                  loopData === "" &&
                  valueData === "" &&
                  opData === "" && (
                    <Jumbotron>
                      <Container>
                        <Text text={"피드백이 없습니다."} />
                      </Container>
                    </Jumbotron>
                  )}
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
