import React from "react";
import classes from "./Button.module.css";

const Button = props => {
  return <div className={classes.button}>{props.name}</div>;
};

export default Button;
