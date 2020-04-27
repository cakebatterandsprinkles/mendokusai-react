import React, { Component } from "react";
import classes from "./ResetPassword.module.css";
import Aux from "../../hoc/Aux";

class ResetPassword extends Component {
  render() {
    return (
      <Aux>
        <div className={classes.mainContainer}>
          <div className={classes.headingContainer}>
            <p className={classes.heading}>Reset Password</p>
          </div>
          <form className={classes.loginForm} action="/login" method="POST">
            <div className={classes.formGroupContainer}>
              <label htmlFor="password">New Password:</label>
              <input type="password" name="password" id="password"></input>
            </div>
            <div className={classes.formGroupContainer}>
              <label htmlFor="password">Repeat Password:</label>
              <input type="password" name="password" id="password"></input>
            </div>
            <input type="hidden" name="_csrf" value="csrfToken" />
            <div className={classes.btnWrapper}>
              <button className={classes.btn} type="submit">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </Aux>
    );
  }
}

export default ResetPassword;
