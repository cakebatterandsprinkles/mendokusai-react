import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Error404 from "./components/404/404";
import LandingMain from "./components/LandingMain/LandingMain";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import BucketList from "./containers/BucketList/BucketList";
import Calendar from "./containers/Calendar/Calendar";
import ConfirmEmail from "./containers/ConfirmEmail/ConfirmEmail";
import LoginForm from "./containers/LoginForm/LoginForm";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import Settings from "./containers/Settings/Settings";
import SignUpForm from "./containers/SignUpForm/SignUpForm";
import UserMainPage from "./containers/UserMainPage/UserMainPage";
import * as actionTypes from "./store/actions/actionTypes";

const App = (props) => {
  const getLocation = () => {
    fetch("https://freegeoip.app/json/")
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
      })
      .catch(() => {
        props.setUserData(null);
      });
  };

  const initialize = () => {
    getLocation();
    getUser();
  };

  useEffect(initialize, []);

  if (props.isAuthenticated === undefined) {
    return <div></div>;
  }

  return (
    <BrowserRouter>
      <Layout isAuthenticated={props.isAuthenticated}>
        <Switch>
          <Route
            exact
            path="/"
            component={props.isAuthenticated ? UserMainPage : LandingMain}
          />
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/login" component={LoginForm} />
          <PrivateRoute path="/user" component={UserMainPage} />
          <PrivateRoute path="/calendar" component={Calendar} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <PrivateRoute exact path="/settings" component={Settings} />
          <PrivateRoute exact path="/bucketlist" component={BucketList} />
          <Route path="/confirm-email" component={ConfirmEmail} />
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
    isAuthenticated: state.userName,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
