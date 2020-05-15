import React from "react";
import { Navbar } from "react-bootstrap";
import LogoLink from "../molecules/nav/LogoLink";
import DefaulteNav from "../organisms/DefaultNav";
import StudentNav from "../organisms/StudentNav";
import ProfesserNav from "../organisms/ProfesserNav";

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
