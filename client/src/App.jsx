import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import LandingMain from "./components/LandingMain/LandingMain";
import UserMainPage from "./containers/UserMainPage/UserMainPage";
import LoginForm from "./containers/LoginForm/LoginForm";
import SignUpForm from "./containers/SignUpForm/SignUpForm";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import Settings from "./containers/Settings/Settings";
import Calendar from "./containers/Calendar/Calendar";
import Error404 from "./components/404/404";
import Layout from "./components/Layout/Layout";
import BucketList from "./containers/BucketList/BucketList";
import * as actionTypes from "./store/actions/actionTypes";
import "./App.css";

const App = (props) => {
  const getLocation = () => {
    fetch("https://geoip.edelkrone.com/json/")
      .then((blob) => blob.json())
      .then((data) => {
        props.setLocation(data);
        getWeather(data.latitude, data.longitude);
      });
  };
  const getWeather = (lat, long) => {
    fetch(`/weather/now/${lat}/${long}`)
      .then((blob) => blob.json())
      .then((data) => {
        props.setWeather(data);
      });

    setTimeout(() => {
      getWeather();
    }, 15 * 60 * 1000);
  };

  const getUser = () => {
    fetch("/user/info", {
      credentials: "include",
    })
      .then((blob) => blob.json())
      .then((response) => {
        props.setUserData(response);
      });
  };

  const initialize = () => {
    getLocation();
    getUser();
  };

  useEffect(initialize, []);

  return (
    <BrowserRouter>
      <Layout isAuthenticated={props.isAuthenticated}>
        <Switch>
          <Route exact path="/" component={LandingMain} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/login" component={LoginForm} />
          <Route path="/user" component={UserMainPage} />
          <Route path="/calendar" component={Calendar} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/bucketlist" component={BucketList} />
          <Route path="/" component={Error404} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (userName) =>
      dispatch({
        type: actionTypes.setUserData,
        payload: { name: userName },
      }),
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.userName !== "",
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
