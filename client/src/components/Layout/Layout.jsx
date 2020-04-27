import React from "react";
import NavbarUser from "../NavbarUser/NavbarUser";
import NavbarLanding from "../NavbarLanding/NavbarLanding";
import Aux from "../../hoc/Aux";

const layout = (props) => {
  return (
    <Aux>
      {props.isAuthenticated ? <NavbarUser /> : <NavbarLanding />}
      <main>{props.children}</main>
    </Aux>
  );
};
export default layout;
