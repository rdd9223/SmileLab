import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import Text from "../atoms/Text"
import {Link} from "react-router-dom";

const SignUpSuccess = () => {
    return(
        <Container>
            <Text text={"회원가입을 완료하였습니다."} />
            <Text text={"로그인 해 주세요"} />
            <br/>
            <Link to={"/"}>
                <Text text={"첫 페이지로 돌아가기"} />
            </Link>
        </Container>
    );
}
export default SignUpSuccess