import React, { Component } from "react";
import LegendFooter from "../../components/LegendFooter/LegendFooter";
import Today from "../../components/Today/Today";
import classes from "./UserMainPage.module.css";

class UserMainPage extends Component {

  render() {
    return (
      <div className={classes.mainContainer}>
        <div className={classes.flexRowContainer}>
          <div className={classes.wrapper}>
            <Today />
          </div>
        </div>
        <LegendFooter />
      </div>
    );
  }
}

export default UserMainPage;
