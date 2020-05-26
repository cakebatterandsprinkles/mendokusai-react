import React from "react";
import classes from "./Button.module.css";
import { NavLink } from "react-router-dom";

const Button = (props) => {
  return (
    <div className={classes.button}>
      <NavLink
        to={props.link}
        exact
        activeStyle={{
          fontWeight: "bold",
        }}
        className={classes.link}
      >
        {props.name}
      </NavLink>
    </div>
  );
};

export default Button;
