import React from "react";
import Aux from "../hoc/Aux";
import LandingNavbar from "../components/NavbarLanding/NavbarLanding";
import SignUpForm from "../containers/SignUpForm/SignUpForm";

const SignUpLayout = () => {
  return (
    <Aux>
      <LandingNavbar />
      <SignUpForm />
    </Aux>
  );
};

export default SignUpLayout;
