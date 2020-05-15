import React from "react";
import CodeContainer from "./pages/CodeContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/organisms/MainNavbar";

const Root = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/start" component={CodeContainer} />
      </Switch>
    </Router>
  );
};

export default Root;
