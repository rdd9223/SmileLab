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
        text={<p>안녕하세요 smileLab입니다. 재미있게 파이썬 코딩을 해봐요</p>}
      />
    </Wrapper>
  );
};

export default MainIntro;
