import React, { Component } from "react";
import classes from "./KiteInfo.module.css";
import { connect } from "react-redux";

class KiteInfo extends Component {
  windMessage(speed) {
    if (speed <= 19 && speed >= 8) {
      return "Great day to kite! ";
    } else if (speed > 19) {
      return "Too breezy! ";
    } else {
      return "Nice day for a picnic! ";
    }
  }

  render() {
    if (!this.props.weatherData.wind) {
      return <p>...</p>;
    }

    return (
      <p className={classes.kiteInfoText}>
        {this.windMessage(this.props.weatherData.wind.speed)}
        Wind speed: {this.props.weatherData.wind.speed} mph
      </p>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weatherData: state.weatherData,
  };
};

export default connect(mapStateToProps)(KiteInfo);
