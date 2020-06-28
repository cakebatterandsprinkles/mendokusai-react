import React, { Component } from "react";
import downarrow from "../../assets/images/downarrow.png";
import classes from "./NavbarLanding.module.css";
import SkewedArrow from "../../assets/images/skewedarrow.png";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

class NavbarLanding extends Component {
  reverseColor = () => {
    const page = document.body;
    const hc = document.querySelectorAll(".headingContainer");
    page.classList.toggle("dark-bg");
    const hcArray = Array.from(hc);
    console.log(hc, hcArray);
    hcArray.forEach((hc) => {
      hc.classList.toggle("light-border");
    });
  };
  render() {
    return (
      <div className={classes.flexContainerRow}>
        <div className={classes.flexContainerRow}>
          <p className={classes.logo}>
            <Link to="/" className={classes.link}>
              Mendokusai
            </Link>
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
          <div className={classes.changeColorBtn} onClick={this.reverseColor}>
            <p>☯</p>
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarLanding;
