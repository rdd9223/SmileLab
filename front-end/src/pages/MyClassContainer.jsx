import React from "react";
import ResponsiveTable from "../components/organisms/ResponsiveTable";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 90%;
  margin: 50px auto;
  height: 600px;
`;

const MyClassContainer = () => {
  const headers = ["날짜", "변수", "연산자", "데이터", "조건문", "반복문", "함수"];
  const rows = [
    {
      date: "2020.06.01",
      variable: 0,
      "operator:": 0,
      data: 0,
      conditional: 0,
      repeat: 1,
      function: 1,
    },
    {
      date: "2020.06.01",
      variable: 1,
      "operator:": 1,
      data: 1,
      conditional: 1,
      repeat: 1,
      function: 1,
    },
    {
      date: "2020.06.01",
      variable: 1,
      "operator:": 1,
      data: 1,
      conditional: 1,
      repeat: 1,
      function: 1,
    },
  ];
  return (
    <Wrapper>
      <ResponsiveTable headers={headers} rows={rows} />
    </Wrapper>
  );
};

export default MyClassContainer;
