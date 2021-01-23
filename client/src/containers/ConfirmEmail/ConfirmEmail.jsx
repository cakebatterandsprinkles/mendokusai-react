import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actionTypes from "../../store/actions/actionTypes";

const ConfirmEmail = (props) => {
  const queryParams = new URLSearchParams(props.location.search);

  const email = queryParams.get("email");
  const token = queryParams.get("token");

  if (!email || !token) {
    props.history.push("/login");
  }

  useEffect(() => {
    fetch("/confirm", {
      method: "POST",
      body: JSON.stringify({ email, token }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 200) {
        response.text().then((text) => props.setError(text));
        setTimeout(() => {
          props.history.push("/signup");
        }, 3000);
      } else {
        props.setError("Email confirmed successfully");
        setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  }, [email, token, props]);

  return <div></div>;
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

export default connect(null, mapDispatchToProps)(withRouter(ConfirmEmail));
