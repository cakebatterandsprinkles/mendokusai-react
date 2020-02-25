import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import classes from "./KiteInfo.module.css";

class KiteInfo extends Component {
  render() {
    return (
      <p className={classes.kiteInfoText}>
        Great day to kite! Wind speed: 12 mph{" "}
      </p>
    );
  }
}

export default KiteInfo;
