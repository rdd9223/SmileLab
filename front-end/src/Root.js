import React from "react";
import CodeContainer from "./pages/CodeContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/templates/MainNavbar";
import mainContainer from "./pages/MainContainer";
import styled from "styled-components";

const MainContainer = styled(mainContainer)`
  float: center;
`;

const Root = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={MainContainer} />
        <Route path="/start" component={CodeContainer} />
      </Switch>
    </Router>
  );
};

export default Root;
