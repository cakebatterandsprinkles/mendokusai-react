import React from "react";
import downarrow from "../../assets/images/downarrow.png";
import classes from "./NavbarLanding.module.css";
import SkewedArrow from "../../assets/images/skewedarrow.png";
import Button from "../Button/Button";

const NavbarLanding = props => {
  return (
    <div className={classes.flexContainerRow}>
      <div className={classes.flexContainerRow}>
        <p className={classes.logo}>
          <a href="http://localhost:3000/" className={classes.link}>
            Mendokusai
          </a>
        </p>
        <img src={downarrow} alt="down arrow" className={classes.arrow} />
        <p className={classes.welcomeText}>Welcome.</p>
      </div>
      <div className={classes.flexContainerRowRight}>
        <img
          src={SkewedArrow}
          alt="skewed arrow pointing out login and signup buttons"
          className={classes.skewedArrow}
        />
        <Button name="Sign Up" link="/signup" />
        <Button name="Login" link="/login" />
      </div>
    </div>
  );
};

export default NavbarLanding;
