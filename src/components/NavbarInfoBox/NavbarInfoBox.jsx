import React from "react";
import KiteInfo from "../../containers/KiteInfo/KiteInfo";
import classes from "./NavbarInfoBox.module.css";

const NavbarInfoBox = props => {
  return (
    <div className={classes.flexContainerColumn}>
      <p> Welcome, {props.name}.</p>
      <KiteInfo />
    </div>
  );
};

export default NavbarInfoBox;
