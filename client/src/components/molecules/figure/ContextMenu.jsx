import React from "react";
import styled from "styled-components";

const ContextMenu = ({ position, onOptionSelected }) => {
  const handleOptionSelected = () => () => {
    onOptionSelected();
  };

  return (
    <Wrapper position={position} onClick={handleOptionSelected()}>
      삭제하기
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  background-color: white;
  border: 1px solid black;
  padding: 0;
  margin: 0;
  list-style-type: none;
  :hover {
    background-color: gray;
  }
`;

export default ContextMenu;
