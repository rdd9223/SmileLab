import React from "react";
import styled from "styled-components";

const StyledTh = styled.th`
  width: ${(props) => {
    if (props.id === 0) {
      return "1em";
    } else if (props.id === 1) {
      return "10em";
    } else if (props.id === 2){
      return "15em";
    }
    else {
      return "10em";
    }
  }};
`;

const MessageCol = ({ headers }) => {
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

export default MessageCol;
