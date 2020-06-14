import React, { useState } from "react";
import styled from "styled-components";
import CommunityTable from "../components/templates/CommunityTable";
import Jumbotron from "components/atoms/Jumbotron";
import Modal from "components/atoms/Modal";

const Wrapper = styled.div`
  width: 50em;
  margin: 50px auto;
  div {
    height: 200px;
  }
`;

const CommunityContainer = () => {
  const [headers, setHeaders] = useState(["#", "제목", "작성자", "작성일"]);
  const [data, setData] = useState([
    {
      idx: 1,
      date: "2020.06.01",
      title: "강영우 ",
      writer: "강영우",
      contents:
        "아 진짜 졸려 뒤지겠다 내가 왜이러고 있어야하냐 진자 레전드다 전설이고 레전드고 오졌고 지렸고 레릿고",
    },
    {
      idx: 2,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
    {
      idx: 3,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
    {
      idx: 3,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
    {
      idx: 3,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
    {
      idx: 3,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
    {
      idx: 3,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
    {
      idx: 3,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
    {
      idx: 3,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
    {
      idx: 3,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
    {
      idx: 3,
      date: "2020.06.01",
      title: "강영우 최고",
      writer: "강영우",
    },
  ]);
  const [modalShow, setModalShow] = useState(false);

  return (
    <Wrapper>
      <div>
        <Jumbotron header={"Class Community"} text={"자유롭게 생각을 나눠보는 공간입니다."} />
      </div>
      <CommunityTable headers={headers} rows={data} setModalShow={setModalShow} />
      <Modal show={modalShow} onHide={() => setModalShow(false)} />
    </Wrapper>
  );
};

export default CommunityContainer;
