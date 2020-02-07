import React from "react";
import classes from "./Button.module.css";
import { Link } from "react-router-dom";

const Button = props => {
  return (
    <div className={classes.button}>
      <Link to={props.link} className={classes.link}>
        {props.name}
      </Link>
    </div>
  );
};

export default Button;
