import React from "react";
import { Navbar } from "react-bootstrap";
import LogoLink from "../atoms/LogoLink";
import DefaulteNav from "../molecules/navigation/DefaultNav";
import StudentNav from "../molecules/navigation/StudentNav";
import ProfesserNav from "../molecules/navigation/ProfesserNav";

const MainNavbar = ({ userType }) => {
  //const [type, setType] = useState(userType)

  const renderUserTypeNav = (idx) => {
    if (idx === '0') {
      return <DefaulteNav />;
    } else if (idx === '1') {
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
