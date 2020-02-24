import React from "react";
import Aux from "../hoc/Aux";
import LandingNavbar from "../components/NavbarLanding/NavbarLanding";
import ResetPassword from "../containers/ResetPassword/ResetPassword";

const ResetPasswordLayout = () => {
  return (
    <Aux>
      <LandingNavbar />
      <ResetPassword />
    </Aux>
  );
};

export default ResetPasswordLayout;
