import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <NavLink
      to={props.link}
      exact
      activeStyle={{
        color: "var(--offwhite)",
        backgroundColor: "var(--darkgray)",
      }}
      className={classes.button}
    >
      {props.name}
    </NavLink>
  );
};

export default Button;
