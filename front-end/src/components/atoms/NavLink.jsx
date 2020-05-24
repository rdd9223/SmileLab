import React from "react";
import { Nav } from "react-bootstrap";

const NavLink = (props) => {
  return <Nav.Link href={props.route}>{props.name}</Nav.Link>;
};

export default NavLink;
