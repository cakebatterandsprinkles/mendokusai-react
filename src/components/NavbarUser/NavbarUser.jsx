import React from "react";
import Aux from "../../hoc/Aux";
import downarrow from "../../assets/images/downarrow.png";
import classes from "./NavbarUser.module.css";
import NavbarInfoBox from "../NavbarInfoBox/NavbarInfoBox";
import SettingsIcon from "../../assets/images/settingsicon.png";

const NavbarUser = props => {
  return (
    <Aux>
      <div className={classes.flexContainerRow}>
        <div className={classes.flexContainerRow}>
          <p className={classes.logo}> Mendokusai </p>
          <img src={downarrow} alt="down arrow" className={classes.arrow} />
          <NavbarInfoBox name="Ari Sensei" />
        </div>
        <div>
          <img
            src={SettingsIcon}
            alt="settings icon"
            className={classes.settingsIcon}
          />
        </div>
      </div>
    </Aux>
  );
};

export default NavbarUser;
