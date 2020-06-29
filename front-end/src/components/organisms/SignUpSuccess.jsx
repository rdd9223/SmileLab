import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import Text from "../atoms/Text"
import {Link} from "react-router-dom";
import styled from "styled-components";

const SignUpSuccess = () => {
    const Wrapper = styled.div`
      width: 50em;
      margin-top: 200px;
      margin-left: auto;
      margin-right: auto;
      Button {
        float: right;
      }
    `;
    return(
        <Wrapper>
            <Text text={"회원가입을 완료하였습니다."} />
            <Text text={"로그인 해 주세요"} />
            <br/>
            <Link to={"/"}>
                <Text text={"첫 페이지로 돌아가기"} />
            </Link>
        </Wrapper>
    );
}
export default SignUpSuccess