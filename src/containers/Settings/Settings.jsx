import React, { Component } from "react";
import classes from "./Settings.module.css";

class Settings extends Component {
  render() {
    return (
      <div className={classes.mainContainer}>
        <div className={classes.headingContainer}>
          <p className={classes.heading}>Settings</p>
        </div>
        <form className={classes.loginForm} action="/user" method="POST">
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="name">Name:</label>
            <input type="name" name="name" id="name"></input>
          </div>
          <div className={classes.subTextContainer}>
            <p className={classes.subText}>I don't like my name either.</p>
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
          <input type="hidden" name="_csrf" value="csrfToken" />
          <div className={classes.btnWrapper}>
            <button className={classes.btn} type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Settings;