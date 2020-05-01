import React, { Component } from "react";
import axios from "axios";
import classes from "./SignUpForm.module.css";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitForm = () => {
    axios
      .post("/signup", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        repeatPassword: this.state.repeatPassword,
      })
      .then((response) => console.log(response))
      .catch((error) => {
        if (error.response) {
          this.props.setError(error.response.data);
        }
      });
  };

  render() {
    return (
      <div className={classes.mainContainer}>
        <div className={classes.headingContainer}>
          <p className={classes.heading}>Sign Up</p>
        </div>
        <form className={classes.loginForm}>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="name">Name:</label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div className={classes.subTextContainer}>
            <p className={classes.subText}>
              Note: Calendar will call you with this name. Choose whatever name
              you like.
            </p>
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div className={classes.subTextContainer}>
            <p className={classes.subText}>
              Note: You will need to verify this. Make it real.
            </p>
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="repeat-password">Repeat Password:</label>
            <input
              type="password"
              name="repeatPassword"
              id="repeat-password"
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div className={classes.subTextContainer}>
            <div className={classes.subText}>
              <input
                type="checkbox"
                name="dislike"
                value="justforfun"
                className={classes.checkboxInput}
              />
              <label htmlFor="dislike" className={classes.checkboxLabel}>
                {" "}
                I dislike filling forms. Use telepathy next time.{" "}
              </label>
            </div>
          </div>
          <input type="hidden" name="_csrf" value="csrfToken" />
          <div className={classes.btnWrapper}>
            <button
              className={classes.btn}
              type="button"
              onClick={this.submitForm}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setError: (errorMessage) =>
      dispatch({
        type: actionTypes.setErrorMessage,
        payload: { errorMessage: errorMessage },
      }),
  };
};

export default connect(null, mapDispatchToProps)(SignUpForm);
