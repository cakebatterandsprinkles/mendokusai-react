import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout";
import UserMainPageLayout from "./layouts/UserMainPageLayout";
import SignUpLayout from "./layouts/SignUpLayout";
import LoginLayout from "./layouts/LoginLayout";
import ForgotPasswordLayout from "./layouts/ForgotPasswordLayout";

const App = () => (
  <Router>
    <Fragment>
      <Switch>
        <Route exact path="/" component={LandingLayout} />
        <Route exact path="/signup" component={SignUpLayout} />
        <Route exact path="/login" component={LoginLayout} />
        <Route exact path="/forgot-password" component={ForgotPasswordLayout} />
        <Route exact path="/user" component={UserMainPageLayout} />
      </Switch>
    </Fragment>
  </Router>
);

export default App;
