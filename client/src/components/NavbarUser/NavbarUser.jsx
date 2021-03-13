import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import mendokusai from "../../assets/images/cat.png";
import SettingsIcon from "../../assets/images/settingsicon.png";
import * as actionTypes from "../../store/actions/actionTypes";
import NavbarInfoBox from "../NavbarInfoBox/NavbarInfoBox";
import classes from "./NavbarUser.module.css";

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
      <div className={classes.mainFlexContainer}>
        <div className={classes.flexContainerRow}>
          <div className={classes.logoContainer}>
            <Link className={classes.logo} to="/user">
              mendokusai
            </Link>
            <img
              src={mendokusai}
              alt="cat hanging upside down"
              className={classes.catimg}
            />
          </div>
          <NavbarInfoBox name={this.props.username} />
        </div>
        <div className={`${classes.flexContainerRowBottom} ${classes.divider}`}>
          <NavLink
            className={classes.navbarLink}
            to="/user"
            activeStyle={{
              color: "var(--offwhite)",
              background: "var(--darkgray)",
            }}
          >
            <p>Today</p>
          </NavLink>
          <NavLink
            className={classes.navbarLink}
            to="/calendar"
            activeStyle={{
              color: "var(--offwhite)",
              background: "var(--darkgray)",
            }}
          >
            <p>Calendar</p>
          </NavLink>
          <NavLink
            className={classes.navbarLink}
            to="/bucketlist"
            activeStyle={{
              color: "var(--offwhite)",
              background: "var(--darkgray)",
            }}
          >
            <p>Bucketlist</p>
          </NavLink>
          <div className={classes.dropdown}>
            <img
              src={SettingsIcon}
              alt="settings icon"
              className={`${classes.settingsIcon} ${classes.dropbtn}`}
            />
            <div className={classes.dropdownContent}>
              <Link
                to="/settings"
                style={{
                  textDecoration: "none",
                  color: "var(--black)",
                }}
              >
                <div className={classes.linkContainer}>Settings</div>
              </Link>
              <div
                className={classes.linkContainer}
                onClick={this.reverseColor}
              >
                <p>Change Mode</p>
              </div>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "var(--black)",
                }}
                onClick={this.logout}
              >
                <div className={classes.linkContainerBottom}>Logout</div>
              </Link>
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
