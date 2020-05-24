import React from "react";
import NavbarUser from "../NavbarUser/NavbarUser";
import NavbarLanding from "../NavbarLanding/NavbarLanding";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css";

const layout = (props) => {
  return (
    <Aux>
      {props.isAuthenticated ? <NavbarUser /> : <NavbarLanding />}
      <div className={`${classes.wrapper} ${classes.invisible}`}>
        <ErrorMessage />
      </div>
      <main>{props.children}</main>
    </Aux>
  );
};
export default layout;
