import React from "react";
import styled from "styled-components";

const StyledTh = styled.th`
  width: ${(props) => {
    if (props.id === 0) {
      return "65em";
    } else {
      return "35em";
    } 
  }};
`;

const ClassSelectCol = ({ headers }) => {
  return (
    <tr>
      {headers.map((item, i) => {
        return (
          <StyledTh id={i} key={i}>
            {item}
          </StyledTh>
        );
      })}
    </tr>
  );
};

export default ClassSelectCol;
