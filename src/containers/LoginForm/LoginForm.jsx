import React, { Component } from "react";
import classes from "./LoginForm.module.css";
import { Link } from "react-router-dom";

class LoginForm extends Component {
  render() {
    return (
      <div className={classes.mainContainer}>
        <div className={classes.headingContainer}>
          <p className={classes.heading}>Login</p>
        </div>
        <form className={classes.loginForm} action="/user" method="POST">
          <div className={`${classes.formGroupContainer} ${classes.margin}`}>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email"></input>
          </div>
          <div className={classes.formGroupContainer}>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password"></input>
          </div>
          <div className={classes.resetPasswordLink}>
            <Link to="/forgot-password" className={classes.link}>
              Remembering passwords is bothersome.
            </Link>
          </div>
          <input type="hidden" name="_csrf" value="csrfToken" />
          <div className={classes.btnWrapper}>
            <button className={classes.btn} type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
