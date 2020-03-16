import React from 'react';
import {Navbar} from 'react-bootstrap';

const LogoLink = (props) => {
  return (
    <Navbar.Brand href={props.route}>{props.name}</Navbar.Brand>
  )
}

export default LogoLink;