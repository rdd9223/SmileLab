import React from "react";
import CodeContainer from "./pages/CodeContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/templates/MainNavbar";
import MainContainer from "./pages/MainContainer";
import IntroContainer from "./pages/IntroContainer";
import SignUpContainer from "./pages/SignUpContainer";
import MyClassContainer from "./pages/MyClassContainer";
import CommunityContainer from "pages/CommunityContainer";
import AskContainer from "./pages/AskContainer";
import CodeResultContainer from "./pages/CodeResultContainer";
import MessageContainer from "./pages/MessageContainer";
import MyPageContainer from "./pages/MyPageContainer";
import ClassContainer from "./pages/ClassContainer";
import SendMessageContainer from "./pages/SendMessageContainer";
import MenualContainer from "./pages/MenualContainer";
import BoardWriteContainer from "./pages/BoardWriteContainer";
import CreateClassContainer from "./pages/CreateClassContainer";
import CommunityPostContainer from "./pages/CommunityPostContainer";

const Root = () => {
  const [userType, setUserType] = React.useState(0);
  React.useEffect(() => {
    setUserType(window.sessionStorage.getItem("userType"));
  }, []);

  return (
    <Router>
      <Navbar userType={userType} />
      <Switch>
        <Route exact path="/" component={MainContainer} />
        <Route path="/start" component={CodeContainer} />
        <Route path="/about" component={IntroContainer} />
        <Route path="/signup" component={SignUpContainer} />
        <Route path="/myclass" component={MyClassContainer} />
        <Route path="/ask" component={AskContainer} />
        <Route path="/community/:idx" component={CommunityPostContainer} />
        <Route path="/community" component={CommunityContainer} />
        <Route path="/result" component={CodeResultContainer} />
        <Route path="/message" component={MessageContainer} />
        <Route path="/mypage" component={MyPageContainer} />
        <Route path="/class" component={ClassContainer} />
        <Route path="/sendMessage" component={SendMessageContainer} />
        <Route path="/menual" component={MenualContainer} />
        <Route path="/write" component={BoardWriteContainer} />
        <Route path="/createClass" component={CreateClassContainer} />
      </Switch>
    </Router>
  );
};

export default Root;
