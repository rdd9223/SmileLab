import React from "react";
import Jumbotron from "../../atoms/Jumbotron";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 auto;
  height: 100%;
`;

const MainIntro = () => {
  return (
    <Wrapper>
      <Jumbotron
        header={"SmileLab"}
        text={<div>
          <h6>SMILE Python은 초보자를 위해 설계된 컴퓨팅 사고력에 기반한 학습 지원 시스템입니다.</h6>
          <h6>위의 활용방법을 보고 학습을 시작해보세요!</h6>
        </div>}
      />
    </Wrapper>
  );
};

export default MainIntro;
