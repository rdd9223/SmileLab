import React from "react";
import { Navbar } from "react-bootstrap";
import LogoLink from "../atoms/nav/LogoLink";
import DefaulteNav from "../molecules/DefaultNav";
import StudentNav from "../molecules/StudentNav";
import ProfesserNav from "../molecules/ProfesserNav";

const MainNavbar = ({ userType = 2 }) => {
  const renderUserTypeNav = (idx) => {
    if (idx === 0) {
      return <DefaulteNav />;
    } else if (idx === 1) {
      return <ProfesserNav />;
    } else {
      return <StudentNav />;
    }
  };

  return (
    <Navbar bg="primary" variant="dark">
      <LogoLink route="/" name="SMILE LAB" />
      {renderUserTypeNav(userType)}
    </Navbar>
  );
};

export default MainNavbar;
