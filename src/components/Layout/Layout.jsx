import React from "react";
import Aux from "../../hoc/Aux";
import NavbarLanding from "../NavbarLanding/NavbarLanding";
import NavbarUser from "../NavbarUser/NavbarUser";
import classes from "./Layout.module.css";

const layout = props => (
  <Aux>
    <NavbarLanding />
    <main>{props.children}</main>
  </Aux>
);

export default layout;
