import React from "react";
import Aux from "../hoc/Aux";
import LandingNavbar from "../components/NavbarLanding/NavbarLanding";
import LandingMain from "../components/LandingMain/LandingMain";

const LandingLayout = () => {
  return (
    <Aux>
      <LandingNavbar />
      <LandingMain />
    </Aux>
  );
};

export default LandingLayout;
