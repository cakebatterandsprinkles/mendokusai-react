import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Aux from "../../hoc/Aux";
import * as actionTypes from "../../store/actions/actionTypes";
import classes from "./ResetPassword.module.css";

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const showPasswordRef1 = React.useRef();
  const showPasswordRef2 = React.useRef();
  const magnifyingGlass = React.useRef();
  const queryParams = new URLSearchParams(props.location.search);

  const email = queryParams.get("email");
  const token = queryParams.get("token");

  if (!email || !token) {
    props.history.push("/login");
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("/reset-password", {
      method: "POST",
      body: JSON.stringify({ email, token, password, repeatPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 200) {
        response.text().then((text) => props.setError(text));
      } else {
        props.setError("Password changed successfully");
        setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };

  const handleMagnifyingGlass = () => {
    if (showPasswordRef1.current.type === "password") {
      showPasswordRef1.current.type = "text";
      showPasswordRef2.current.type = "text";
      magnifyingGlass.current.classList.toggle(
        `${classes.magnifyingGlassActive}`
      );
    } else if (showPasswordRef1.current.type === "text") {
      showPasswordRef1.current.type = "password";
      showPasswordRef2.current.type = "password";
      magnifyingGlass.current.classList.toggle(
        `${classes.magnifyingGlassActive}`
      );
    }
  };

  return (
    <Aux>
      <div className={classes.mainContainer}>
        <div className={classes.headingContainer}>
          <p className={classes.heading}>Reset Password</p>
        </div>
        <form className={classes.loginForm} onSubmit={handleSubmit}>
          <div className={classes.formGroupContainer}>
            <label htmlFor="password">New Password:</label>
            <div
              className={classes.magnifyingGlass}
              onClick={handleMagnifyingGlass}
              ref={magnifyingGlass}
            >
              <span role="img" aria-label="magnifying-glass">
                🔍
              </span>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              ref={showPasswordRef1}
            />
          </div>
          <div className={classes.formGroupContainer}>
            <label htmlFor="repeatPassword">Repeat Password:</label>
            <input
              type="password"
              name="repeatPassword"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(event) => setRepeatPassword(event.target.value)}
              ref={showPasswordRef2}
            />
          </div>
          <div className={classes.btnWrapper}>
            <button className={classes.btn} type="submit">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </Aux>
  );
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

export default connect(null, mapDispatchToProps)(withRouter(ResetPassword));
