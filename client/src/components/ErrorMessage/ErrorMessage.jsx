import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import classes from "./ErrorMessage.module.css";

const ErrorMessage = (props) => {
  const [visibilityClass, setVisibilityClass] = useState("");

  useEffect(() => {
    if (props.message) {
      setVisibilityClass(classes.active);
      const timeout = setTimeout(() => {
        props.setError(null);
        setVisibilityClass(classes.passive);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [props]);

  return (
    <div className={`${classes.errorContainer} ${visibilityClass}`}>
      <p>{props.message ? props.message : null}</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    message: state.errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setError: (errorMessage) =>
      dispatch({
        type: actionTypes.setErrorMessage,
        payload: { errorMessage: errorMessage },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
