import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import classes from "../UserMainPage/UserMainPage.module.css";

class UserMainPage extends Component {
  render() {
    return (
      <Aux>
        <div className={classes.flexContainer}>
          <div className={classes.half}>
            <p>Greetings, summoner</p>
            <p>Today looks like this:</p>
          </div>
          <div className={classes.half}></div>
        </div>
      </Aux>
    );
  }
}

export default UserMainPage;
