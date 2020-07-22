import React from "react";
import { Image } from "react-bootstrap";
import styled from "styled-components";

const Img = styled(Image)`
  height: auto;
  width: 100%;
`;

const Images = ({ src }) => {
  return <Img src={src} rounded fluid />;
};

export default Images;
