import React from "react";
import Jumbotron from "./../components/atoms/Jumbotron";
import { Form, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import FormLabelSet from "./../components/molecules/form/FormLabelSet";
import Button from "./../components/atoms/Button";
import { postClass } from "./../service/class.js";

const Wrapper = styled.div`
  width: 60rem;
  margin: 50px auto;
`;

const CreateClassContainer = () => {
  const [className, setClassName] = React.useState(null);

  const createClass = async () => {
    await postClass(className);
  };

  const handleClassName = (event) => {
    const value = event.target.value;
    setClassName(value);
  };

  return (
    <Wrapper>
      <Jumbotron header={"클래스 생성"} text={"이 페이지에서 클래스를 생성 할 수 있습니다."} />
      <br />
      <Container>
        <Form>
          <Row>
            <FormLabelSet
              name={"생성 할 클래스 이름"}
              onChange={(event) => handleClassName(event)}
            />
            <br />
            <br />
            <Button name={"생성하기"} onClick={createClass} />
          </Row>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default CreateClassContainer;
