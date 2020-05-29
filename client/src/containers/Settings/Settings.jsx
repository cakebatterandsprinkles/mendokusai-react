import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import classes from "./Settings.module.css";
import * as actionTypes from "../../store/actions/actionTypes";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
      userConfirmationMessage: "Can't save new settings at the moment.",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  setUserName = () => {
    this.setState({ name: this.props.username });
  };

  componentDidMount() {
    this.setUserName();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.username !== prevProps.username) {
      this.setUserName();
    }
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = () => {
    this.setState({
      userConfirmationMessage: "Setting changes were successful.",
    });
  };

  submitForm = () => {
    axios
      .post("/settings", {
        name: this.state.name,
        currentPassword: this.state.currentPassword,
        newPassword: this.state.newPassword,
        repeatNewPassword: this.state.repeatNewPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          this.handleFormSubmit();
          this.props.setNewUsername(this.state.name);
        }
      })
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
          <p className={classes.heading}>Settings</p>
        </div>
        <form>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="name">Name:</label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={this.handleInputChange}
              value={this.state.name}
            ></input>
          </div>
          <div className={classes.subTextContainer}>
            <p className={classes.subText}>
              If you only like to change your name, just fill the name area and
              hit save. If you want to change your password too, you should fill
              the password areas.{" "}
            </p>
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div
            className={`${classes.formGroupContainer} ${classes.marginBottom}`}
          >
            <label htmlFor="repeatNewPassword">Repeat New Password:</label>
            <input
              type="password"
              name="repeatNewPassword"
              id="repeatNewPassword"
              onChange={this.handleInputChange}
            ></input>
          </div>
          <div className={classes.btnWrapper}>
            <button
              className={classes.btn}
              type="submit"
              onClick={this.submitForm}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.userName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewUsername: (name) =>
      dispatch({
        type: actionTypes.setNewUserSettings,
        payload: { name: name },
      }),
    setError: (errorMessage) =>
      dispatch({
        type: actionTypes.setErrorMessage,
        payload: { errorMessage: errorMessage },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
