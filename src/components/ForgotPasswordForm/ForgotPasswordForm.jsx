import React from "react";
import Aux from "../../hoc/Aux";
import classes from "./ForgotPasswordForm.module.css";

const ForgotPasswordForm = () => {
  return (
    <Aux>
      <div className={classes.headingContainer}>
        <p className={classes.heading}>Forgot Password</p>
      </div>
      <form></form>
    </Aux>
  );
};

export default ForgotPasswordForm;
