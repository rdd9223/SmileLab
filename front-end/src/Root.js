import React from "react";
import CodeContainer from "./pages/CodeContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/templates/MainNavbar";
import MainContainer from "./pages/MainContainer";
import IntroContainer from "./pages/IntroContainer";

const Root = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={MainContainer} />
        <Route path="/start" component={CodeContainer} />
        <Route path="/about" component={IntroContainer} />
      </Switch>
    </Router>
  );
};

export default Root;
