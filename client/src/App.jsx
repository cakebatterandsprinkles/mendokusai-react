import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingMain from "./components/LandingMain/LandingMain";
import UserMainPage from "./containers/UserMainPage/UserMainPage";
import LoginForm from "./containers/LoginForm/LoginForm";
import SignUpForm from "./containers/SignUpForm/SignUpForm";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import Settings from "./containers/Settings/Settings";
import Calendar from "./containers/Calendar/Calendar";
<<<<<<< HEAD
import Lost from "./components/404/404";
=======
>>>>>>> 8110529d292188f45f4ed54b8db7a41213321c5e
import Layout from "./components/Layout/Layout";
import "./App.css";

const App = () => (
  <BrowserRouter>
<<<<<<< HEAD
    <Layout isAuthenticated={false}>
      <Switch>
=======
    <Switch>
      <Layout isAuthenticated={true}>
>>>>>>> 8110529d292188f45f4ed54b8db7a41213321c5e
        <Route exact path="/" component={LandingMain} />
        <Route exact path="/signup" component={SignUpForm} />
        <Route exact path="/login" component={LoginForm} />
        <Route path="/user" component={UserMainPage} />
        <Route path="/calendar" component={Calendar} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/settings" component={Settings} />
<<<<<<< HEAD
        <Route path="/" component={Lost} />
      </Switch>
    </Layout>
=======
      </Layout>
    </Switch>
>>>>>>> 8110529d292188f45f4ed54b8db7a41213321c5e
  </BrowserRouter>
);

export default App;
