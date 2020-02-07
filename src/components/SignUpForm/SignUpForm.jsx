import React from "react";
import Aux from "../../hoc/Aux";
import classes from "./SignUpForm.module.css";

const SignUpForm = () => {
  return (
    <Aux>
      <div className={classes.headingContainer}>
        <p className={classes.heading}>Sign Up</p>
      </div>
      <form></form>
    </Aux>
  );
};

export default SignUpForm;
