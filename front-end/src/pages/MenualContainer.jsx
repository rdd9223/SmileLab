import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import Img from "./../components/atoms/Images";

class MenualContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const Wrapper = styled.div`
      width: 50em;
      margin-top: 200px;
      margin-left: auto;
      margin-right: auto;
      Button {
        float: right;
      }
    `;
    return (
      <>
        <Wrapper>
          <Row>
            <Col>
              <Container
                style={{
                  backgroundColor: "rgba( 255, 254, 255, 0.8 )",
                  margin: "10px",
                  borderRadius: "20px",
                  border: "2px solid #000000",
                  textAlign: "center",
                }}
              >
                <h4 style={{ marginTop: "10px" }}>아이디어 나타내기</h4>
                <br />
                <h6>
                  순서도와 의사코드로 내 아이디어를 논리적으로 나타낼 수 있어요
                </h6>
              </Container>
            </Col>
            <Col>
              <div
                style={{
                  marginTop: "50px",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <Img src={"images/arrow2.png"} />
              </div>
            </Col>
            <Col>
              <Container
                style={{
                  backgroundColor: "rgba( 255, 254, 255, 0.8 )",
                  margin: "10px",
                  borderRadius: "20px",
                  border: "2px solid #000000",
                  textAlign: "center",
                }}
              >
                <h4 style={{ marginTop: "10px" }}>코딩하기</h4>
                <h4>&nbsp;</h4>
                <br />
                <h6>
                  내가 작성한 순서도와 의사코드를 보고 python으로 실제 코딩을 할
                  수 있어요
                </h6>
              </Container>
            </Col>
            <Col>
              <div
                style={{
                  marginTop: "50px",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <Img src={"images/arrow2.png"} />
              </div>
            </Col>
            <Col>
              <Container
                style={{
                  backgroundColor: "rgba( 255, 254, 255, 0.8 )",
                  margin: "10px",
                  borderRadius: "20px",
                  border: "2px solid #000000",
                  textAlign: "center",
                }}
              >
                <h4 style={{ marginTop: "10px" }}>아이디어 공유하기</h4>
                <br />
                <h6>
                  내 코드에 대한 동료의 의견을 얻거나 내가 동료에게 피드백을 줄
                  수 있어요
                </h6>
              </Container>
            </Col>
          </Row>
        </Wrapper>

        <div
          style={{
            position: "absolute",
            marginTop: "-320px",
            marginLeft: "30px",
            zIndex: "-1",
            padding: "200px",
          }}
        >
          <Img src={"images/arrow1.png"} />
        </div>
      </>
    );
  }
}

export default MenualContainer;
