import React from "react";
import classes from "./Lost.module.css";
import Sign from "../../assets/images/lost.jpg";

const Lost = (props) => {
  return (
    <div className={classes.mainContainer}>
      <img src={Sign} alt="empty sign" className={classes.img} />
      <div className={classes.textContainer}>
        <p className={classes.emphasis}>Were you looking for an empty sign?</p>
        <p>If your answer is yes, here it is!</p>
        <p className={classes.footnote}>
          (If not, you might want to try a new path. This one simply does not
          exist.)
        </p>
      </div>
    </div>
  );
};

export default Lost;
