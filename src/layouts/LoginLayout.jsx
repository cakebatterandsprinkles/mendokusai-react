import React from "react";
import Aux from "../hoc/Aux";
import LandingNavbar from "../components/NavbarLanding/NavbarLanding";
import LoginForm from "../components/LoginForm/LoginForm";

const LoginLayout = () => {
  return (
    <Aux>
      <LandingNavbar />
      <LoginForm />
    </Aux>
  );
};

export default LoginLayout;
