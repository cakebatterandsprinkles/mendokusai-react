import React, { Component } from "react";
import classes from "./SignUpForm.module.css";

class SignUpForm extends Component {
  render() {
    return (
      <div className={classes.mainContainer}>
        <div className={classes.headingContainer}>
          <p className={classes.heading}>Sign Up</p>
        </div>
        <form className={classes.loginForm} action="/user" method="POST">
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="name">Name:</label>
            <input type="name" name="name" id="name"></input>
          </div>
          <div className={classes.subTextContainer}>
            <p className={classes.subText}>
              Note: Calendar will call you with this name. Choose whatever name
              you like.
            </p>
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email"></input>
          </div>
          <div className={classes.subTextContainer}>
            <p className={classes.subText}>
              Note: You will need to verify this. Make it real.
            </p>
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password"></input>
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="repeat-password">Repeat Password:</label>
            <input
              type="password"
              name="repeat-password"
              id="repeat-password"
            ></input>
          </div>
          <div className={classes.subTextContainer}>
            <div className={classes.subText}>
              <input
                type="checkbox"
                name="dislike"
                value="justforfun"
                className={classes.checkboxInput}
              />
              <label htmlFor="dislike" className={classes.checkboxLabel}>
                {" "}
                I dislike filling forms. Use telepathy next time.{" "}
              </label>
            </div>
          </div>
          <input type="hidden" name="_csrf" value="csrfToken" />
          <div className={classes.btnWrapper}>
            <button className={classes.btn} type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
