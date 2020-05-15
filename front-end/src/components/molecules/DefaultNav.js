import React from "react";
import { Nav } from "react-bootstrap";
import NavLink from "../atoms/nav/NavLink";

const DefaultNav = () => {
  return (
    <Nav>
      <NavLink name="SMILE Python이란?" route="/about" />
      <NavLink name="활용방법" route="/menual" />
      <NavLink name="문의하기" route="/ask" />
    </Nav>
  );
};

export default DefaultNav;
