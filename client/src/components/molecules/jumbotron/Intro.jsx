import React from "react";
import Jumbotron from "../../atoms/Jumbotron";

const Intro = () => {
  return (
    <div>
      <Jumbotron
        text={
          <p>
            블록 프로그래밍 언어 학습을 마친 여러분이 처음으로 접하는 텍스트 프로그래밍 언어!
            Python!
            <br /> <br />
            SMILE Python은 여러분의 python 학습을 돕기 위해 만들어진 웹 페이지입니다.
            <br /> <br />
            여기에는 여러분의 아이디어를 표현할 수 있어요.
            <br />
            여러분의 python으로 프로그래밍을 실행해보고 오류에 대한 힌트를 얻어 수정해보세요!
            <br />
            여러분의 컴퓨팅 사고력을 향상시킬 수 있는 피드백을 받을 수 있습니다!
            <br /> <br />
            그리고 여러분의 코드를 친구에게 공유해보기도 하고, 친구들의 코드에 조언을 해주세요.
            <br /> <br />
            자, 그럼 회원가입을 통해 지금 Python 프로그래밍을 시작해보세요!
          </p>
        }
      />
    </div>
  );
};

export default Intro;
