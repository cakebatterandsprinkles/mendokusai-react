import React, {useEffect} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import LandingMain from "./components/LandingMain/LandingMain";
import UserMainPage from "./containers/UserMainPage/UserMainPage";
import LoginForm from "./containers/LoginForm/LoginForm";
import SignUpForm from "./containers/SignUpForm/SignUpForm";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import Settings from "./containers/Settings/Settings";
import Calendar from "./containers/Calendar/Calendar";
import Lost from "./components/404/404";
import Layout from "./components/Layout/Layout";
import * as actionTypes from "./store/actions/actionTypes"
import "./App.css";


const App = (props) => {


const getLocation = () => {
  fetch("https://geoip.edelkrone.com/json/")
  .then((blob) =>blob.json())
  .then(data => {
    props.setLocation(data);
    getWeather(data.latitude, data.longitude);
  });
    
};
const getWeather = (lat, long) => {
  fetch(`/weather/now/${lat}/${long}`)
  .then((blob) =>blob.json())
  .then(data => {
    props.setWeather(data);
  });

  setTimeout(() => {
    getWeather();
  }, 15 * 60 * 1000);
};

  useEffect(getLocation, []);

  return (<BrowserRouter>
    <Layout isAuthenticated={true}>
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
  </BrowserRouter>);
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocation: (location) =>
      dispatch({
        type: actionTypes.setLocation,
        payload: { location: location },
      }),
      setWeather: (weather) =>
      dispatch({
        type: actionTypes.setWeatherData,
        payload: { weatherData: weather },
      }),
  };
};

export default connect(null, mapDispatchToProps)(App);
