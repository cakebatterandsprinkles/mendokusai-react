import React from "react";
import classes from "./LegendFooter.module.css";
import Donecheckbox from "../../assets/images/donecheckbox.png";
import Notdonecheckbox from "../../assets/images/notdonecheckbox.png";
import Inprogress from "../../assets/images/inprogresscheckbox.png";

const LegendFooter = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.legendItem}>
        <img src={Notdonecheckbox} alt="Not done checkbox" />
        <p className={classes.footerText}>Not Done</p>
      </div>
      <div className={classes.legendItem}>
        <img src={Inprogress} alt="In progress" />
        <p className={classes.footerText}>In Progress</p>
      </div>
      <div className={classes.legendItem}>
        <img src={Donecheckbox} alt="Done Checkbox" />
        <p className={classes.footerText}>Done</p>
      </div>
    </div>
  );
};

export default LegendFooter;
