import React from "react";
import { Nav } from "react-bootstrap";
import NavLink from "../molecules/nav/NavLink";

const ProfesserNav = () => {
  return (
    <Nav>
      <NavLink name="SMILE Python이란?" route="/about" />
      <NavLink name="활용방법" route="/menual" />
      <NavLink name="시작하기" route="/start" />
      <NavLink name="문의하기" route="/ask" />
      <NavLink name="클래스" route="/class" />
      <NavLink name="커뮤니티" route="/community" />
    </Nav>
  );
};

export default ProfesserNav;
