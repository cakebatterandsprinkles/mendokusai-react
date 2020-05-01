import React from "react";
import classes from "./ErrorMessage.module.css";
import { connect } from "react-redux";

const ErrorMessage = (props) => {
  return (
    <div className={classes.errorContainer}>
      <p>{props.message ? props.message : null}</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    message: state.errorMessage,
  };
};

export default connect(mapStateToProps)(ErrorMessage);
