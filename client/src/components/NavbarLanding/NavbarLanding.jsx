import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cat from "../../assets/images/cat.png";
import Button from "../Button/Button";
import classes from "./NavbarLanding.module.css";

class NavbarLanding extends Component {
  reverseColor = () => {
    const page = document.body;
    const hc = document.querySelectorAll(".headingContainer");
    page.classList.toggle("dark-bg");
    const hcArray = Array.from(hc);
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
          <img src={Cat} alt="cat hanging from the ceiling" className={classes.catimg} />
          <p className={classes.welcomeText}>Welcome.</p>
        </div>
        <div className={classes.flexContainerRowRight}>
          <Button name="Sign Up" link="/signup" />
          <Button name="Login" link="/login" />
          <div className={classes.changeColorBtn} onClick={this.reverseColor}>
            <p>◑</p>
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarLanding;
