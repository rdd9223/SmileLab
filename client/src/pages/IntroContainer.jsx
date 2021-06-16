import React from "react";
import styled from "styled-components";
import Intro from "../components/molecules/jumbotron/Intro";

const img_background = require("../images/img_background_intro.png");

const BackgroundWrapper = styled.div`
  background-image: url(${img_background});
  background-size: cover;
`;

const Wrapper = styled.div`
  width: 60rem;
  padding: 50px auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const IntroContainer = () => {
  return (
    <BackgroundWrapper>
      <Wrapper>
        <Intro />
      </Wrapper>
    </BackgroundWrapper>
  );
};

export default IntroContainer;
