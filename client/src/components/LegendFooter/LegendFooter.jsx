import React, { Component } from "react";
import classes from "./LegendFooter.module.css";
import Donecheckbox from "../../assets/images/donecheckbox.png";
import Notdonecheckbox from "../../assets/images/notdonecheckbox.png";
import Inprogress from "../../assets/images/inprogresscheckbox.png";
import Circle from "../../assets/images/circle.png";
import Triangle from "../../assets/images/triangle.png";
import Star from "../../assets/images/star.png";

class LegendFooter extends Component {
  state = {
    currentPath: "",
  };

  getCurrentPath = () => {
    this.setState({ currentPath: window.location.pathname });
  };

  componentDidMount() {
    this.getCurrentPath();
  }

  render() {
    return (
      <div className={classes.footer}>
        <div className={classes.legendItem}>
          <img
            src={
              this.state.currentPath.includes("calendar")
                ? Circle
                : Notdonecheckbox
            }
            alt="Not done checkbox"
          />
          <p className={classes.footerText}>Not Done</p>
        </div>
        <div className={classes.legendItem}>
          <img
            src={
              this.state.currentPath.includes("calendar")
                ? Triangle
                : Inprogress
            }
            alt="In progress"
          />
          <p className={classes.footerText}>In Progress</p>
        </div>
        <div className={classes.legendItem}>
          <img
            src={
              this.state.currentPath.includes("calendar") ? Star : Donecheckbox
            }
            alt="Done Checkbox"
          />
          <p className={classes.footerText}>Done</p>
        </div>
      </div>
    );
  }
}

export default LegendFooter;
