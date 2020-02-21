import React, { Component } from "react";
import classes from "./SignUpForm.module.css";
import { Link } from "react-router-dom";

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
            <label for="name">Name:</label>
            <input type="name" name="name" id="name"></input>
          </div>
          <div className={classes.subText}>
            <p>
              Note: Calendar will call you with this name. Choose whatever name
              you like.
            </p>
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label for="email">Email:</label>
            <input type="email" name="email" id="email"></input>
          </div>
          <div className={classes.subText}>
            <p>Note: You will need to verify this. Make it real.</p>
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label for="password">Password:</label>
            <input type="password" name="password" id="password"></input>
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label for="repeat-password">Repeat Password:</label>
            <input
              type="repeat-password"
              name="repeat-password"
              id="repeat-password"
            ></input>
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label for="country">Country:</label>
            <input type="country" name="country" id="country"></input>
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label for="city">City:</label>
            <input type="city" name="city" id="city"></input>
          </div>
          <div>
            <input type="checkbox" name="vehicle1" value="Bike" />
            <label for="vehicle1">
              {" "}
              I dislike filling forms. Use telepathy next time.{" "}
            </label>
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
