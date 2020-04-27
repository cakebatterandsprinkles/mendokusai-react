import React from "react";
import classes from "./Button.module.css";
import { NavLink } from "react-router-dom";

const Button = props => {
  return (
    <div className={classes.button}>
      <NavLink
        to={props.link}
        exact
        activeStyle={{
          backgroundColor: "rgb(224, 224, 224)",
          fontWeight: "bold"
        }}
        className={classes.link}
      >
        {props.name}
      </NavLink>
    </div>
  );
};

export default Button;
