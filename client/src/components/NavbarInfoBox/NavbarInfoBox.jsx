import React from "react";
import KiteInfo from "../../containers/KiteInfo/KiteInfo";
import classes from "./NavbarInfoBox.module.css";

const NavbarInfoBox = props => {
  return (
    <div className={classes.flexContainerColumn}>
      <div className={classes.welcomeText}> Welcome, <span className={classes.username}>{props.name}!</span></div>
      <KiteInfo />
    </div>
  );
};

export default NavbarInfoBox;
