import React from "react";
import Aux from "../hoc/Aux";
import LandingNavbar from "../components/NavbarLanding/NavbarLanding";
import ForgotPasswordForm from "../components/ForgotPasswordForm/ForgotPasswordForm";

const ForgotPasswordLayout = () => {
  return (
    <Aux>
      <LandingNavbar />
      <ForgotPasswordForm />
    </Aux>
  );
};

export default ForgotPasswordLayout;
