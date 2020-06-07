import React, { useState } from "react";
import MyClassTable from "../components/organisms/MyClassTable";
import styled from "styled-components";
import { Form } from "react-bootstrap";
import Button from "../components/atoms/Button";

const Wrapper = styled.div`
  width: 50em;
  margin: 50px auto;
  height: 600px;
  Button {
    float: right;
  }
`;

const MyClassContainer = () => {
  const [header, setHeader] = useState([
    "날짜",
    "변수",
    "연산자",
    "데이터",
    "조건문",
    "반복문",
    "함수",
  ]);
  const [data, setData] = useState([
    {
      idx: 1,
      date: "2020.06.01",
      variable: 0,
      operator: 0,
      data: 0,
      conditional: 0,
      repeat: 1,
      function: 1,
    },
    {
      idx: 2,
      date: "2020.06.01",
      variable: 1,
      operator: 1,
      data: 1,
      conditional: 1,
      repeat: 1,
      function: 1,
    },
    {
      idx: 3,
      date: "2020.06.01",
      variable: 1,
      operator: 1,
      data: 1,
      conditional: 1,
      repeat: 1,
      function: 1,
    },
  ]);
  return (
    <Form>
      <Wrapper>
        <MyClassTable headers={header} rows={data} />
        <Button type={"submit"} name={"삭제"} size={"sm"} onClick={() => alert("일괄삭제")} />
      </Wrapper>
    </Form>
  );
};

export default MyClassContainer;
