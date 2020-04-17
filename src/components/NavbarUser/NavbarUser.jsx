import React, { Component } from "react";
import downarrow from "../../assets/images/downarrow.png";
import classes from "./NavbarUser.module.css";
import NavbarInfoBox from "../NavbarInfoBox/NavbarInfoBox";
import SettingsIcon from "../../assets/images/settingsicon.png";
import { Link } from "react-router-dom";

class NavbarUser extends Component {
  reverseColor = () => {
    alert("reversed color!");
  };

  render() {
    return (
      <div className={classes.flexContainerRow}>
        <div className={classes.flexContainerRow}>
          <Link className={classes.logo} to="/user">
            {" "}
            Mendokusai{" "}
          </Link>
          <img src={downarrow} alt="down arrow" className={classes.arrow} />
          <NavbarInfoBox name={"Ari Sensei"} />
          <div className={classes.changeColorBtn} onClick={this.reverseColor}>
            <p>☯</p>
          </div>
          <div className={classes.calendarBtn}>
            <p>Calendar»</p>
          </div>
        </div>
        <div className={classes.dropdown}>
          <img
            src={SettingsIcon}
            alt="settings icon"
            className={`${classes.settingsIcon} ${classes.dropbtn}`}
          />
          <div className={classes.dropdownContent}>
            <div className={classes.linkContainer}>
              <Link
                to="/settings"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Settings
              </Link>
            </div>
            <div className={classes.linkContainerBottom}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarUser;
