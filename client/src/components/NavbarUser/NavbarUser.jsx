import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import classes from "./NavbarUser.module.css";
import NavbarInfoBox from "../NavbarInfoBox/NavbarInfoBox";
import downarrow from "../../assets/images/downarrow.png";
import SettingsIcon from "../../assets/images/settingsicon.png";
import mendokusai from "../../assets/images/girl2.png";

class NavbarUser extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  reverseColor = () => {
    const page = document.body;
    const hc = document.querySelectorAll(".headingContainer");
    page.classList.toggle("dark-bg");
    const hcArray = Array.from(hc);
    hcArray.forEach((hc) => {
      hc.classList.toggle("light-border");
    });
  };

  logout = () => {
    fetch("/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => this.props.removeAuthentication());
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
          <NavbarInfoBox name={this.props.username} />
          <img
            src={mendokusai}
            alt="bored girl illustration"
            className={classes.girlimg}
          />
        </div>
        <div className={classes.flexContainerRow}>
          <Link className={classes.navbarLink} to="/user">
            <p>Today</p>
          </Link>

          <Link className={classes.navbarLink} to="/calendar">
            <p>Calendar</p>
          </Link>
          <Link className={classes.navbarLink} to="/bucketlist">
            <p>Bucketlist</p>
          </Link>

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
              <div
                className={classes.linkContainer}
                onClick={this.reverseColor}
              >
                <p>Change Mode</p>
              </div>
              <div className={classes.linkContainerBottom}>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  onClick={this.logout}
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.userName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeAuthentication: () =>
      dispatch({
        type: actionTypes.setUserData,
        payload: { name: "" },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarUser);
