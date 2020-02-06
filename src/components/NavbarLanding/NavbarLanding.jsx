import React from "react";
import downarrow from "../../assets/images/downarrow.png";
import classes from "./NavbarLanding.module.css";
import SkewedArrow from "../../assets/images/skewedarrow.png";
import Button from "../Button/Button";

const NavbarLanding = props => {
  return (
    <div className={classes.flexContainerRow}>
      <div className={classes.flexContainerRow}>
        <p className={classes.logo}> Mendokusai </p>
        <img src={downarrow} alt="down arrow" className={classes.arrow} />
        <p className={classes.welcomeText}>Welcome.</p>
      </div>
      <div className={classes.flexContainerRowRight}>
        <img
          src={SkewedArrow}
          alt="skewed arrow pointing out login and signup buttons"
          className={classes.skewedArrow}
        />
        <Button name="SignUp" />
        <Button name="Login" />
      </div>
    </div>
  );
};

export default NavbarLanding;
