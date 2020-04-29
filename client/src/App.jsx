import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingMain from "./components/LandingMain/LandingMain";
import UserMainPage from "./containers/UserMainPage/UserMainPage";
import LoginForm from "./containers/LoginForm/LoginForm";
import SignUpForm from "./containers/SignUpForm/SignUpForm";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import Settings from "./containers/Settings/Settings";
import Calendar from "./containers/Calendar/Calendar";
import Lost from "./components/404/404";
import Layout from "./components/Layout/Layout";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <Layout isAuthenticated={false}>
      <Switch>
        <Route exact path="/" component={LandingMain} />
        <Route exact path="/signup" component={SignUpForm} />
        <Route exact path="/login" component={LoginForm} />
        <Route path="/user" component={UserMainPage} />
        <Route path="/calendar" component={Calendar} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/settings" component={Settings} />
        <Route path="/" component={Lost} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
