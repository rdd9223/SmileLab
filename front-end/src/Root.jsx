import React from "react";
import CodeContainer from "./pages/CodeContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/templates/MainNavbar";
import MainContainer from "./pages/MainContainer";
import IntroContainer from "./pages/IntroContainer";
import SignUpContainer from "./pages/SignUpContainer";
import MyClassContainer from "./pages/MyClassContainer";
import CommunityContainer from "pages/CommunityContainer";

const Root = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={MainContainer} />
        <Route path="/start" component={CodeContainer} />
        <Route path="/about" component={IntroContainer} />
        <Route path="/signup" component={SignUpContainer} />
        <Route path="/myclass" component={MyClassContainer} />
        <Route path="/community" component={CommunityContainer} />
      </Switch>
    </Router>
  );
};

export default Root;
