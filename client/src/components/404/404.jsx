import React from "react";
import Sign from "../../assets/images/lost.jpg";
import classes from "./Lost.module.css";

const Lost = (props) => {
  return (
    <div className={classes.mainContainer}>
      <img src={Sign} alt="empty sign" className={classes.img} />
      <div className={classes.textContainer}>
        <p className={classes.emphasis}>Were you looking for an empty sign?</p>
        <p className={classes.text}>If your answer is yes, here it is!</p>
        <p className={classes.text}>
          (If not, you might want to try a new path. This one doesn't
          exist.)
        </p>
      </div>
    </div>
  );
};

export default Lost;
