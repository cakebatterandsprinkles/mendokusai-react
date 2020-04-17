import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout";
import UserMainPageLayout from "./layouts/UserMainPageLayout";
import SignUpLayout from "./layouts/SignUpLayout";
import LoginLayout from "./layouts/LoginLayout";
import ResetPasswordLayout from "./layouts/ResetPasswordLayout";
import SettingsLayout from "./layouts/SettingsLayout";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingLayout} />
      <Route exact path="/signup" component={SignUpLayout} />
      <Route exact path="/login" component={LoginLayout} />
      <Route exact path="/user" component={UserMainPageLayout} />
      <Route exact path="/reset-password" component={ResetPasswordLayout} />
      <Route exact path="/settings" component={SettingsLayout} />
    </Switch>
  </BrowserRouter>
);

export default App;
