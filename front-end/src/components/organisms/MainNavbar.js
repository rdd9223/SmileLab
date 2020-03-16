import React from 'react';
import {Navbar} from 'react-bootstrap';
import LogoLink from '../atoms/nav/LogoLink';
import DefaulteNav from '../molecules/DefaultNav';
import StudentNav from '../molecules/StudentNav';
import ProfesserNav from '../molecules/ProfesserNav';

const MainNavbar = () => {
  return (
    <Navbar bg='primary' variant="dark">
      <LogoLink route='#home' name='SMILE LAB'/>
      <StudentNav/>
    </Navbar>
  )
}

export default MainNavbar;